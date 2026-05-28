import Callout from "@/components/custom/Callout";
import CodeBlock from "@/components/custom/CodeBlock";
import SecLabel from "@/components/custom/SecLabel";
import WinBox from "@/components/custom/WinBox";
import { tokens } from "@/utils/tokens";
import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import React from "react";

const paymentDiagram = `Client          Express API         Paystack          MongoDB
  │                  │                  │                 │
  │── POST /checkout ──>                │                 │
  │                  │── Create Order ──────────────────>│
  │                  │   status: pending                  │
  │                  │<─────────────────────────────────── │
  │<── paystack URL ─│                  │                 │
  │                  │                  │                 │
  │── redirect ──────────────────────>  │                 │
  │                  │          (user pays)               │
  │<─────────────────────────────────── │                 │
  │                  │                  │                 │
  │── GET /verify/:ref ──>              │                 │
  │                  │── verify ref ──> │                 │
  │                  │<── confirmed ─── │                 │
  │                  │── Update Order ──────────────────>│
  │<── success ──────│   status: paid                    │
  │                  │                  │                 │
  │           (async, independent of client)              │
  │                  │<── webhook ───── │                 │
  │                  │── verify HMAC    │                 │
  │                  │── idempotent ────────────────────>│
  │                  │   update (no-op if already paid)   │`;

const voiceFlowDiagram = `User (Voice)       Vapi / ElevenLabs     OpenAI               Express API          MongoDB
  │                       │                    │                    │                    │
  │── "Status of my  ──>  │                    │                    │                    │
  │    last order"        │── transcript ────> │                    │                    │
  │                       │                    │── classify intent  │                    │
  │                       │                    │   slot: order_id   │                    │
  │                       │                    │── function call ─> │                    │
  │                       │                    │                    │── GET /orders/:id >│
  │                       │                    │                    │<── order doc ───── │
  │                       │                    │<── { status, date} │                    │
  │                       │<── spoken reply ── │                    │                    │
  │<── "Your order is ──  │                    │                    │                    │
  │     out for delivery" │                    │                    │                    │
  │                       │                    │                    │                    │
  │── "I have a problem"  │                    │                    │                    │
  │    with my order" ──> │── transcript ────> │                    │                    │
  │                       │                    │── intake flow ───> │                    │
  │                       │                    │   collect fields   │                    │
  │                       │                    │── function call ─> │                    │
  │                       │                    │                    │── POST /support ──>│
  │                       │                    │                    │<── ticket created  │
  │                       │<── spoken reply ── │                    │                    │
  │<── "Ticket #1042  ──  │                    │                    │                    │
  │     has been opened"  │                    │                    │                    │`;

const intentMapCode = `// Voice intent → API action mapping
// Zero new backend routes — the voice layer translates, not duplicates.

const intentMap = {
  order_status: {
    method:   "GET",
    endpoint: "/api/orders/:id",
    slots:    ["orderId"],                      // extracted by OpenAI function-calling
    speak:    (data) =>
      \`Your order is \${data.status}. It was placed on \${data.createdAt}.\`,
  },

  product_search: {
    method:   "GET",
    endpoint: "/api/products?search=:query",
    slots:    ["query"],
    speak:    (data) =>
      data.stock > 0
        ? \`Yes, \${data.name} is in stock at ₦\${data.price}. Want me to add it to your cart?\`
        : \`\${data.name} is currently out of stock.\`,
  },

  open_ticket: {
    method:   "POST",
    endpoint: "/api/support/tickets",
    slots:    ["orderId", "issueDescription"],  // collected through conversation turns
    speak:    (data) =>
      \`Your support ticket #\${data.ticketId} has been created. I'll follow up via email.\`,
  },
};

// Each intent resolves against the authenticated REST surface.
// Standard response envelope { success, data, error } is
// parsed identically across all three actions.`;

const dives = [
  {
    num: "A.",
    sub: "Security & Financial Integrity",
    title: "The Atomic Payment Pipeline",
    body: (
      <>
        <Text fontSize="14px" color={tokens.muted2} lineHeight="1.85" mb="16px">
          The most catastrophic failure mode in e-commerce is a{" "}
          <Text as="strong" color={tokens.text} fontWeight="500">
            ghost order
          </Text>{" "}
          — a payment that succeeds on the provider's side but silently fails to
          register in the database because the user's browser crashed or the
          network dropped at the wrong millisecond.
        </Text>
        <Text fontSize="14px" color={tokens.muted2} lineHeight="1.85" mb="16px">
          Rather than trusting a single "success" redirect, I engineered a{" "}
          <Text as="strong" color={tokens.text} fontWeight="500">
            Triple-Verification Flow
          </Text>
          :<br />
          <br />
          <Text as="strong" color={tokens.text} fontWeight="500">
            Step 1 — Backend Initialization:
          </Text>{" "}
          The order is created server-side before the user reaches Paystack,
          establishing intent with a <code>pending</code> status.
          <br />
          <br />
          <Text as="strong" color={tokens.text} fontWeight="500">
            Step 2 — Manual Verification on Return:
          </Text>{" "}
          A GET request verifies the transaction reference directly against
          Paystack's API before any status change occurs.
          <br />
          <br />
          <Text as="strong" color={tokens.text} fontWeight="500">
            Step 3 — HMAC-Signed Webhook:
          </Text>{" "}
          A Paystack webhook verified via HMAC-SHA512 asynchronously finalizes
          the order even if steps 1 and 2 never complete from the client side.
          Handlers are{" "}
          <Text as="strong" color={tokens.text} fontWeight="500">
            idempotent
          </Text>{" "}
          — repeated deliveries cannot duplicate orders.
        </Text>
        <CodeBlock>{paymentDiagram}</CodeBlock>
        <WinBox>
          Architected to prevent ghost orders even under adverse network
          conditions, crashed browsers, or failed client redirects. The database
          converges to the correct state regardless of client-side failures —
          with idempotent webhook handling ensuring no double-processing on
          retry.
        </WinBox>
      </>
    ),
  },
  {
    num: "B.",
    sub: "Database Optimization",
    title: "Write-Level Rating Aggregation",
    body: (
      <>
        <Text fontSize="14px" color={tokens.muted2} lineHeight="1.85" mb="16px">
          The naive implementation calculates <code>avgRating</code> and{" "}
          <code>numReviews</code> on every GET request — the computation runs
          thousands of times per day, on every page load, producing no new
          information.{" "}
          <Text as="strong" color={tokens.text} fontWeight="500">
            This is a classic O(n) read-time tax.
          </Text>
        </Text>
        <Text fontSize="14px" color={tokens.muted2} lineHeight="1.85" mb="16px">
          I moved aggregation to the{" "}
          <Text as="strong" color={tokens.text} fontWeight="500">
            write level
          </Text>{" "}
          using a Mongoose <code>post('save')</code> middleware hook on the
          Comment model. The hook triggers a MongoDB Aggregation Pipeline that
          calculates the new average atomically and updates the Product document
          in a single write.
        </Text>
        <Callout>
          <Text as="strong" color={tokens.accent2} fontWeight="500">
            Design principle applied:
          </Text>{" "}
          Pre-compute at write time; serve at read time. This is the same
          principle behind Cassandra's materialized views, Redis sorted sets for
          leaderboards, and CQRS read-model projection.
        </Callout>
        <WinBox>
          Product queries no longer pay a computational cost proportional to
          review volume. Response times for product detail endpoints remain
          constant regardless of review count.
        </WinBox>
      </>
    ),
  },
  {
    num: "C.",
    sub: "UX & Scalability",
    title: "Cursor-Based Pagination for Community Chat",
    body: (
      <>
        <Text fontSize="14px" color={tokens.muted2} lineHeight="1.85" mb="16px">
          Standard offset pagination (<code>skip(n).limit(k)</code>) has a
          well-known failure mode:{" "}
          <Text as="strong" color={tokens.text} fontWeight="500">
            MongoDB must scan and discard the first N documents on every
            request.
          </Text>{" "}
          At 100,000 chat messages, page 500 requires scanning 50,000 documents
          just to be discarded — degrading linearly as the dataset grows.
        </Text>
        <Text fontSize="14px" color={tokens.muted2} lineHeight="1.85" mb="16px">
          I implemented{" "}
          <Text as="strong" color={tokens.text} fontWeight="500">
            cursor-based pagination
          </Text>{" "}
          using composite <code>createdAt</code> timestamp +{" "}
          <code>ObjectId</code> cursors. Each request queries only documents
          newer or older than the cursor, leveraging MongoDB's natural index on{" "}
          <code>_id</code>. Every page costs the same regardless of depth.
        </Text>
        <WinBox>
          Eliminated O(n) performance degradation. Chat queries execute in
          constant time whether there are 1,000 or 10,000,000 messages in the
          collection.
        </WinBox>
      </>
    ),
  },
  {
    num: "D.",
    sub: "Architecture",
    title: "Centralized Validation as a First-Class System",
    body: (
      <>
        <Text fontSize="14px" color={tokens.muted2} lineHeight="1.85" mb="16px">
          Validation scattered across controllers is one of the most common
          causes of security regressions in growing codebases — a new route is
          added, the validation pattern is skipped, and an injected payload
          reaches the database.
        </Text>
        <Text fontSize="14px" color={tokens.muted2} lineHeight="1.85" mb="16px">
          All validation was extracted into{" "}
          <Text as="strong" color={tokens.text} fontWeight="500">
            reusable Zod schemas
          </Text>{" "}
          covering users, products, orders, carts, coupons, chat, support
          tickets, and categories — enforced through a single middleware that
          parses, sanitizes, strips unlisted fields, and rejects invalid
          requests before they reach any controller.
        </Text>
        <Callout>
          <Text as="strong" color={tokens.accent2} fontWeight="500">
            Security implication:
          </Text>{" "}
          Field injection attacks (e.g., sending <code>isAdmin: true</code> in a
          request body) are effectively eliminated — not guarded by a
          conditional check, but by schema stripping at the entry point.
          Security guarantees hold regardless of developer discipline on new
          routes.
        </Callout>
        <WinBox>
          100% elimination of undefined runtime errors in controllers. Security
          guarantees are enforced by architecture, not developer discipline.
        </WinBox>
      </>
    ),
  },
  {
    num: "E.",
    sub: "Concurrency & Data Integrity",
    title: "Atomic Operations Throughout",
    body: (
      <>
        <Text fontSize="14px" color={tokens.muted2} lineHeight="1.85" mb="16px">
          Race conditions in e-commerce are silent and expensive. Two users
          adding the last item simultaneously, or a coupon redeemed twice in
          parallel — these are not edge cases. They are certainties at scale.
        </Text>
        <Text fontSize="14px" color={tokens.muted2} lineHeight="1.85" mb="16px">
          Every mutation uses MongoDB's atomic operators:{" "}
          <Text as="strong" color={tokens.text} fontWeight="500">
            <code>$inc</code>
          </Text>{" "}
          for cart totals and stock counts,{" "}
          <Text as="strong" color={tokens.text} fontWeight="500">
            <code>$addToSet</code>
          </Text>{" "}
          for coupon redemptions and likes (preventing duplicates at the
          database level),{" "}
          <Text as="strong" color={tokens.text} fontWeight="500">
            <code>$pull</code>
          </Text>{" "}
          for clean removals, and{" "}
          <Text as="strong" color={tokens.text} fontWeight="500">
            session-based transactions
          </Text>{" "}
          for multi-document operations where consistency is non-negotiable.
        </Text>
        <WinBox>
          Duplicate coupon redemptions, double-likes, and cart quantity
          corruption are mitigated through MongoDB's atomic guarantees and
          transactional boundaries — not application-level locks, which are
          inherently unreliable under concurrent load.
        </WinBox>
      </>
    ),
  },
  {
    num: "F.",
    sub: "User Communication Layer",
    title:
      "Dual-Channel Notification System: In-App + Transactional Email via Resend",
    body: (
      <>
        <Text fontSize="14px" color={tokens.muted2} lineHeight="1.85" mb="16px">
          A common failure mode in e-commerce platforms is treating user
          communication as an afterthought — a fire-and-forget email call
          stuffed into a controller, with no delivery guarantee, no persistence,
          and no in-app awareness.
        </Text>
        <Text fontSize="14px" color={tokens.muted2} lineHeight="1.85" mb="16px">
          <Text as="strong" color={tokens.text} fontWeight="500">
            In-App Notifications
          </Text>{" "}
          are persisted to MongoDB as a first-class document type with fields
          for recipient, type, message, <code>read</code> status, and{" "}
          <code>createdAt</code>. A dedicated{" "}
          <code>GET /api/notifications</code> endpoint returns the user's unread
          count and notification list, enabling a real-time badge in the UI.
        </Text>
        <Text fontSize="14px" color={tokens.muted2} lineHeight="1.85" mb="16px">
          <Text as="strong" color={tokens.text} fontWeight="500">
            Transactional Email
          </Text>{" "}
          is delivered via Resend — chosen over SMTP-based alternatives for its
          superior deliverability infrastructure, first-class API ergonomics,
          and webhook support for bounce and open events.
        </Text>
        <Callout>
          <Text as="strong" color={tokens.accent2} fontWeight="500">
            Architectural decision:
          </Text>{" "}
          Notification creation and email dispatch are called from a shared{" "}
          <code>notifyUser()</code> service function, ensuring both channels
          fire consistently from a single source of truth — not duplicated
          across controllers.
        </Callout>
        <WinBox>
          Users receive confirmation through two independent channels. Even if
          the in-app notification is missed, the transactional email provides a
          durable delivery guarantee. Both channels are driven by a single
          service layer — zero duplication risk.
        </WinBox>
      </>
    ),
  },
  {
    num: "G.",
    sub: "Planned · AI Integration",
    title: "Voice AI Customer Support Layer",
    body: (
      <>
        <Text fontSize="14px" color={tokens.muted2} lineHeight="1.85" mb="16px">
          A recurring failure mode in e-commerce support is forcing users to
          navigate menus, fill forms, or wait for a human agent to answer
          questions that already have deterministic answers in the database —
          order status, stock availability, coupon validity. The data exists.
          The latency is artificial.
        </Text>
        <Text fontSize="14px" color={tokens.muted2} lineHeight="1.85" mb="16px">
          The planned voice AI layer eliminates that latency by placing a
          natural-language interface directly over the existing REST API
          surface. No new backend routes are required — the AI acts as a
          stateless translation layer between spoken intent and authenticated
          endpoints that already exist.
        </Text>

        <Text fontSize="14px" color={tokens.muted2} lineHeight="1.85" mb="8px">
          <Text as="strong" color={tokens.text} fontWeight="500">
            Scope — Three Core Capabilities:
          </Text>
        </Text>

        <Text fontSize="14px" color={tokens.muted2} lineHeight="1.85" mb="8px">
          <Text as="strong" color={tokens.text} fontWeight="500">
            1 — Order Status Lookup:
          </Text>{" "}
          "What's the status of my last order?" resolves to an authenticated{" "}
          <code>GET /api/orders/:id</code> call. The AI reads the{" "}
          <code>status</code>, <code>paymentStatus</code>, and{" "}
          <code>createdAt</code> fields from the response envelope and speaks a
          natural summary — no screen required.
        </Text>

        <Text fontSize="14px" color={tokens.muted2} lineHeight="1.85" mb="8px">
          <Text as="strong" color={tokens.text} fontWeight="500">
            2 — Product Search & Stock Queries:
          </Text>{" "}
          "Do you have Shea Butter Blend in stock?" maps to{" "}
          <code>GET /api/products?search=shea+butter</code>. The AI reads the{" "}
          <code>stock</code> and <code>price</code> fields and responds
          conversationally, with the option to add to cart via a follow-up voice
          command.
        </Text>

        <Text fontSize="14px" color={tokens.muted2} lineHeight="1.85" mb="20px">
          <Text as="strong" color={tokens.text} fontWeight="500">
            3 — Support Ticket Creation:
          </Text>{" "}
          "I have a problem with my order" triggers a structured intake flow.
          The AI collects the order reference and issue description through
          conversation turns, then fires <code>POST /api/support/tickets</code>{" "}
          with the gathered fields — creating a real ticket without the user
          touching a form.
        </Text>

        <CodeBlock>{voiceFlowDiagram}</CodeBlock>

        <CodeBlock>{intentMapCode}</CodeBlock>

        <Callout>
          <Text as="strong" color={tokens.accent2} fontWeight="500">
            Architectural principle:
          </Text>{" "}
          The consistent response envelope (<code>success</code>,{" "}
          <code>data</code>, <code>error</code>) designed upfront makes this
          integration structurally straightforward — the voice layer has a
          single predictable contract to parse across all three action types.
          The investment in API standardization pays a direct dividend here.
        </Callout>

        <Text
          fontSize="14px"
          color={tokens.muted2}
          lineHeight="1.85"
          mb="8px"
          mt="20px"
        >
          <Text as="strong" color={tokens.text} fontWeight="500">
            Implementation Stack (Planned):
          </Text>{" "}
          Vapi or ElevenLabs for voice interface, OpenAI function-calling for
          intent classification and slot extraction, and the existing Express
          API as the action backend. Authenticated user context and active
          session data are passed as structured metadata on each conversation
          turn — maintaining state without modifying the stateless API layer.
        </Text>

        <WinBox>
          Three high-frequency support queries — order status, stock
          availability, and ticket creation — are fully resolvable without a
          human agent and without any new backend routes. The voice AI is a
          translation layer, not an infrastructure addition. The existing
          modular architecture absorbs it with zero structural changes.
        </WinBox>
      </>
    ),
  },
];

const DeepDives = () => {
  return (
    <Box
      as="section"
      id="dives"
      borderBottom="1px solid"
      borderColor={tokens.border}
      py="90px"
    >
      <SecLabel>04 — Engineering Deep Dives</SecLabel>
      <VStack gap="2px" align="stretch">
        {dives.map((d) => (
          <Box
            key={d.num}
            bg={tokens.surface}
            borderLeft="2px solid transparent"
            transition="border-color 0.3s"
            _hover={{ borderLeftColor: tokens.accent }}
          >
            <Flex
              px={{ base: "24px", md: "36px" }}
              py="32px"
              gap="24px"
              align="flex-start"
            >
              <Text
                fontFamily="heading"
                fontSize="11px"
                letterSpacing="0.2em"
                color={tokens.muted}
                pt="4px"
                minW="32px"
              >
                {d.num}
              </Text>
              <Box flex="1">
                <Text
                  fontSize="11px"
                  letterSpacing="0.15em"
                  textTransform="uppercase"
                  color={tokens.accent}
                  mb="6px"
                >
                  {d.sub}
                </Text>
                <Text
                  fontFamily="heading"
                  fontWeight="700"
                  fontSize="20px"
                  mb="20px"
                >
                  {d.title}
                </Text>
                {d.body}
              </Box>
            </Flex>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default DeepDives;
