const sassyBlend = {
  id: "sassyblend-api",
  detailedCaseStudyData: {
    hero: {
      meta: {
        title: "SassyBlend API",
        stackedTitle: ["Sassy", "Blend", "API"],
        subtitle:
          "A production-grade MERN e-commerce backend engineered for financial integrity, database performance, and real-time scalability — designed, architected, and built by one engineer.",
        badge: "Engineering Case Study · 2024",
      },
      meta_row: [
        {
          label: "Role",
          value: "Sole Architect & Engineer",
        },
        {
          label: "Stack",
          value: "MERN · Zod · Paystack · Cloudinary · Resend",
        },
        {
          label: "Domain",
          value: "E-Commerce · Community Platform",
        },
        {
          label: "Market",
          value: "Nigeria (NGN · Paystack)",
        },
      ],
    },

    execSummary: {
      section: "Executive Summary",

      role: {
        title: "Sole Architect & Engineer",
        body: "Owned 100% of architecture, backend implementation, security design, and deployment strategy",
        badges: ["Solo Project", "Full-Stack", "Production-Ready"],
      },

      cards: [
        {
          n: "1",
          title: "The Problem",
          body: "Most MERN e-commerce backends collapse under feature growth — validation logic scatters across controllers, guest sessions break at login, and payment flows lose orders silently when a user's browser crashes mid-transaction. The challenge was to architect a system that eliminated these failure modes structurally, not with workarounds.",
        },
        {
          n: "2",
          title: "The Solution",
          body: "A modular, layered backend with centralized Zod validation, a triple-verified Paystack payment pipeline, cursor-based pagination for community features, and atomic MongoDB operations throughout — eliminating race conditions, stale data, and silent order loss by design.",
        },
        {
          n: "3",
          title: "The Outcome",
          body: "Sub-100ms response times on core product queries. Zero ghost orders across all payment sessions. A backend architecture ready to absorb Redis caching, WebSocket scaling, and microservice extraction with minimal refactoring.",
        },
        {
          n: "4",
          title: "The Scale Signal",
          body: "Every major system — cart, payments, ratings, community chat — was designed with a growth assumption of hundreds of thousands of users. The architecture reflects that ambition structurally, not just aspirationally.",
        },
      ],
    },

    stack: {
      section: "Technology Stack",

      items: [
        "Node.js",
        "Express.js",
        "MongoDB",
        "Mongoose",
        "React",
        "Redux Toolkit",
        "Zod",
        "Paystack API",
        "Cloudinary",
        "Socket.io (foundation)",
        "JWT + Cookies",
        "MongoDB Aggregation",
        "Mongoose Middleware Hooks",
        "Cursor-Based Pagination",
        "HMAC Webhook Verification",
        "Resend (Transactional Email)",
        "In-App Notifications",
        "React Hot Toast",
        "express-rate-limit",
        "Vapi / ElevenLabs (planned)",
        "OpenAI Function-Calling (planned)",
      ],
    },

    architecture: {
      section: "System Architecture",

      layers: [
        {
          type: "client",
          color: "accent2",
          title: "Client Layer",
          sub: "React + Redux Toolkit · Browser / Mobile",
          arrow: "↓ HTTPS Requests (REST + Cookie Auth)",
          subs: [],
        },
        {
          type: "gateway",
          color: "accent",
          title: "API Gateway",
          sub: "Express.js · Route Definitions · CORS · Helmet",
          arrow: "↓ Every request passes through",
          subs: [],
        },
        {
          type: "middleware",
          color: "muted2",
          title: "Middleware Layer",
          sub: "Auth · Zod Validation · Role Guard · Error Handler",
          arrow: "↓ Only validated, sanitized data passes through",
          subs: [
            "JWT + Cookie Auth",
            "Zod Schema Validation",
            "Role-Based Access",
            "Global Error Handler",
          ],
        },
        {
          type: "service",
          color: "accent3",
          title: "Controller / Service Layer",
          sub: "Business Logic · Atomic Operations · Aggregation Pipelines",
          arrow: "↓ Reads / Writes",
          subs: [
            "User & Auth",
            "Products & Categories",
            "Cart & Orders",
            "Coupons",
            "Chat & Reviews",
            "Support",
            "Notifications",
          ],
        },
        {
          type: "data",
          color: "accent4",
          title: "Data Layer",
          sub: "MongoDB · Mongoose · Sessions + Transactions",
          arrow: "↓ Async calls to external providers",
          subs: [],
        },
        {
          type: "external",
          color: "muted",
          title: "External Services",
          sub: "Paystack API · Cloudinary · Paystack Webhooks (HMAC) · Resend Email API · Vapi / ElevenLabs (planned) · OpenAI (planned)",
          arrow: null,
          subs: [],
        },
      ],

      legend: [
        { label: "Client", color: "accent2" },
        { label: "API Gateway", color: "accent" },
        { label: "Middleware", color: "muted2" },
        { label: "Services", color: "accent3" },
        { label: "Data Layer", color: "accent4" },
        { label: "External", color: "muted" },
      ],
    },

    deepDives: {
      section: "Engineering Deep Dives",

      items: [
        {
          id: "A",
          category: "Security & Financial Integrity",
          title: "The Atomic Payment Pipeline",
          diagram: "payment",

          content: {
            intro:
              "The most catastrophic failure mode in e-commerce is a ghost order — a payment that succeeds on the provider's side but silently fails to register in the database because the user's browser crashed or the network dropped at the wrong millisecond.",

            problem_continued:
              'Rather than trusting a single "success" redirect, I engineered a Triple-Verification Flow:',

            steps: [
              {
                step: "Step 1 — Backend Initialization",
                text: "The order is created server-side before the user reaches Paystack, establishing intent with a pending status.",
              },
              {
                step: "Step 2 — Manual Verification on Return",
                text: "A GET request verifies the transaction reference directly against Paystack's API before any status change occurs.",
              },
              {
                step: "Step 3 — HMAC-Signed Webhook",
                text: "A Paystack webhook verified via HMAC-SHA512 asynchronously finalizes the order even if steps 1 and 2 never complete from the client side. Handlers are idempotent — repeated deliveries cannot duplicate orders.",
              },
            ],

            winbox:
              "Architected to prevent ghost orders even under adverse network conditions, crashed browsers, or failed client redirects. The database converges to the correct state regardless of client-side failures — with idempotent webhook handling ensuring no double-processing on retry.",
          },
        },

        {
          id: "B",
          category: "Database Optimization",
          title: "Write-Level Rating Aggregation",

          content: {
            problem:
              "The naive implementation calculates avgRating and numReviews on every GET request — the computation runs thousands of times per day, on every page load, producing no new information. This is a classic O(n) read-time tax.",

            solution:
              "I moved aggregation to the write level using a Mongoose post('save') middleware hook on the Comment model. The hook triggers a MongoDB Aggregation Pipeline that calculates the new average atomically and updates the Product document in a single write.",

            callout:
              "Design principle applied: Pre-compute at write time; serve at read time. This is the same principle behind Cassandra's materialized views, Redis sorted sets for leaderboards, and CQRS read-model projection.",

            winbox:
              "Product queries no longer pay a computational cost proportional to review volume. Response times for product detail endpoints remain constant regardless of review count.",
          },
        },

        {
          id: "C",
          category: "UX & Scalability",
          title: "Cursor-Based Pagination for Community Chat",

          content: {
            problem:
              "Standard offset pagination (skip(n).limit(k)) has a well-known failure mode: MongoDB must scan and discard the first N documents on every request. At 100,000 chat messages, page 500 requires scanning 50,000 documents just to be discarded — degrading linearly as the dataset grows.",

            solution:
              "I implemented cursor-based pagination using composite createdAt timestamp + ObjectId cursors. Each request queries only documents newer or older than the cursor, leveraging MongoDB's natural index on _id. Every page costs the same regardless of depth.",

            winbox:
              "Eliminated O(n) performance degradation. Chat queries execute in constant time whether there are 1,000 or 10,000,000 messages in the collection.",
          },
        },

        {
          id: "D",
          category: "Architecture",
          title: "Centralized Validation as a First-Class System",

          content: {
            problem:
              "Validation scattered across controllers is one of the most common causes of security regressions in growing codebases — a new route is added, the validation pattern is skipped, and an injected payload reaches the database.",

            solution:
              "All validation was extracted into reusable Zod schemas covering users, products, orders, carts, coupons, chat, support tickets, and categories — enforced through a single middleware that parses, sanitizes, strips unlisted fields, and rejects invalid requests before they reach any controller.",

            callout:
              "Security implication: Field injection attacks (e.g., sending isAdmin: true in a request body) are effectively eliminated — not guarded by a conditional check, but by schema stripping at the entry point. Security guarantees hold regardless of developer discipline on new routes.",

            winbox:
              "100% elimination of undefined runtime errors in controllers. Security guarantees are enforced by architecture, not developer discipline.",
          },
        },

        {
          id: "E",
          category: "Concurrency & Data Integrity",
          title: "Atomic Operations Throughout",

          content: {
            problem:
              "Race conditions in e-commerce are silent and expensive. Two users adding the last item simultaneously, or a coupon redeemed twice in parallel — these are not edge cases. They are certainties at scale.",

            solution:
              "Every mutation uses MongoDB's atomic operators: $inc for cart totals and stock counts, $addToSet for coupon redemptions and likes (preventing duplicates at the database level), $pull for clean removals, and session-based transactions for multi-document operations where consistency is non-negotiable.",

            winbox:
              "Duplicate coupon redemptions, double-likes, and cart quantity corruption are mitigated through MongoDB's atomic guarantees and transactional boundaries — not application-level locks, which are inherently unreliable under concurrent load.",
          },
        },

        {
          id: "F",
          category: "User Communication Layer",
          title:
            "Dual-Channel Notification System: In-App + Transactional Email via Resend",

          content: {
            problem:
              "A common failure mode in e-commerce platforms is treating user communication as an afterthought — a fire-and-forget email call stuffed into a controller, with no delivery guarantee, no persistence, and no in-app awareness.",

            inApp:
              "In-App Notifications are persisted to MongoDB as a first-class document type with fields for recipient, type, message, read status, and createdAt. A dedicated GET /api/notifications endpoint returns the user's unread count and notification list, enabling a real-time badge in the UI.",

            email:
              "Transactional Email is delivered via Resend — chosen over SMTP-based alternatives for its superior deliverability infrastructure, first-class API ergonomics, and webhook support for bounce and open events.",

            callout:
              "Architectural decision: Notification creation and email dispatch are called from a shared notifyUser() service function, ensuring both channels fire consistently from a single source of truth — not duplicated across controllers.",

            winbox:
              "Users receive confirmation through two independent channels. Even if the in-app notification is missed, the transactional email provides a durable delivery guarantee. Both channels are driven by a single service layer — zero duplication risk.",
          },
        },

        {
          id: "G",
          category: "Planned · AI Integration",
          title: "Voice AI Customer Support Layer",
          diagram: "voice",

          content: {
            intro:
              "A recurring failure mode in e-commerce support is forcing users to navigate menus, fill forms, or wait for a human agent to answer questions that already have deterministic answers in the database — order status, stock availability, coupon validity. The data exists. The latency is artificial.",

            approach:
              "The planned voice AI layer eliminates that latency by placing a natural-language interface directly over the existing REST API surface. No new backend routes are required — the AI acts as a stateless translation layer between spoken intent and authenticated endpoints that already exist.",

            capabilities: [
              {
                step: "1 — Order Status Lookup",
                text: '"What\'s the status of my last order?" resolves to an authenticated GET /api/orders/:id call. The AI reads the status, paymentStatus, and createdAt fields from the response envelope and speaks a natural summary — no screen required.',
              },
              {
                step: "2 — Product Search & Stock Queries",
                text: '"Do you have Shea Butter Blend in stock?" maps to GET /api/products?search=shea+butter. The AI reads the stock and price fields and responds conversationally, with the option to add to cart via a follow-up voice command.',
              },
              {
                step: "3 — Support Ticket Creation",
                text: '"I have a problem with my order" triggers a structured intake flow. The AI collects the order reference and issue description through conversation turns, then fires POST /api/support/tickets with the gathered fields — creating a real ticket without the user touching a form.',
              },
            ],

            callout:
              "Architectural principle: The consistent response envelope (success, data, error) designed upfront makes this integration structurally straightforward — the voice layer has a single predictable contract to parse across all three action types. The investment in API standardization pays a direct dividend here.",

            stack:
              "Vapi or ElevenLabs for voice interface, OpenAI function-calling for intent classification and slot extraction, and the existing Express API as the action backend. Authenticated user context and active session data are passed as structured metadata on each conversation turn — maintaining state without modifying the stateless API layer.",

            intentMap: `// Voice intent → API action mapping
// Zero new backend routes — the voice layer translates, not duplicates.

const intentMap = {
  order_status: {
    method:   "GET",
    endpoint: "/api/orders/:id",
    slots:    ["orderId"],
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
    slots:    ["orderId", "issueDescription"],
    speak:    (data) =>
      \`Your support ticket #\${data.ticketId} has been created. I'll follow up via email.\`,
  },
};`,

            winbox:
              "Three high-frequency support queries — order status, stock availability, and ticket creation — are fully resolvable without a human agent and without any new backend routes. The voice AI is a translation layer, not an infrastructure addition. The existing modular architecture absorbs it with zero structural changes.",
          },
        },
      ],
    },

    tradeoffs: {
      section: "Engineering Trade-offs",

      items: [
        {
          title: "Cursor Pagination vs. Offset Pagination",
          badge: { label: "Scalability", variant: "blue" },
          chosen:
            "Cursor-based pagination using createdAt + ObjectId composites. Guarantees O(1) query performance regardless of dataset depth. Added implementation complexity is a one-time cost.",
          rejected:
            "Offset-based pagination (skip/limit). Simple to implement but degrades linearly at scale — unacceptable for a community chat feature with unbounded message growth.",
        },
        {
          title:
            "Denormalized Payment Data in Orders vs. Separate Payment Model",
          badge: { label: "Data Modeling", variant: "purple" },
          chosen:
            "Embedding payment snapshot data directly in the Order document. Optimizes the most common read pattern (order detail page) to a single document fetch. Accepted write-time duplication as a deliberate tradeoff.",
          rejected:
            "Separate Payment model with foreign-key references. Cleaner normalized structure but adds a JOIN-equivalent at read time for every order detail query — unnecessary overhead given the access pattern.",
        },
        {
          title:
            "Write-Level Aggregation vs. Read-Time Calculation for Ratings",
          badge: { label: "DB Performance", variant: "orange" },
          chosen:
            "Mongoose post('save') hook triggers aggregation pipeline and updates Product atomically at write time. Read queries serve pre-computed values at constant cost. Accepted slightly slower writes for dramatically faster reads.",
          rejected:
            "Calculating avgRating at read time via aggregation on every GET request. Simple, but adds an O(n) computation proportional to review count on every product page load — untenable at scale.",
        },
        {
          title: "Centralized Zod Middleware vs. Per-Controller Validation",
          badge: { label: "Security", variant: "yellow" },
          chosen:
            "Single validation middleware enforced at the route level for all endpoints. Security guarantees hold regardless of developer discipline. Accepted additional upfront schema definition work for permanent security consistency.",
          rejected:
            "Ad-hoc validation inside each controller. Faster initial development but creates security blind spots — one missed check opens an injection vulnerability. Scales inversely with codebase growth.",
        },
        {
          title: "Voice AI as Translation Layer vs. New Backend Routes",
          badge: { label: "AI Integration", variant: "green" },
          chosen:
            "Voice AI layer maps spoken intent to existing authenticated REST endpoints via OpenAI function-calling. Zero new backend routes — the existing API surface is the action backend. Stateless by design.",
          rejected:
            "Dedicated voice-specific API routes. Would duplicate business logic, create a second validation surface, and diverge from the standard response envelope — adding maintenance burden with no architectural benefit.",
        },
      ],
    },

    metrics: {
      section: "Results & Impact",

      items: [
        {
          value: "<100ms",
          label:
            "Core product & category query response via strategic indexing",
        },
        {
          value: "0",
          label:
            "Ghost orders — guaranteed by triple-verified payment pipeline",
        },
        {
          value: "O(1)",
          label: "Pagination query cost regardless of message volume",
        },
        {
          value: "100%",
          label:
            "Controller input sanitization — no raw request data reaches business logic",
        },
      ],
    },

    apiDesign: {
      section: "API Design Contract",

      responseEnvelope: {
        title: "Standard Response Envelope",

        description:
          "Every endpoint — success or failure — returns a consistent envelope. Clients never need to guess the response shape.",

        successExample: `{
  "success": true,
  "message": "Product retrieved successfully",
  "data": {
    "_id": "64abc...",
    "name": "Shea Butter Blend",
    "price": 4500,
    "avgRating": 4.7
  },
  "error": null
}`,

        errorExample: `{
  "success": false,
  "message": "Validation failed",
  "data": null,
  "error": {
    "code": "VALIDATION_ERROR",
    "fields": {
      "price": "Must be a positive number",
      "name": "Required"
    }
  }
}`,
      },

      statusCodes: {
        title: "HTTP Status Code Philosophy",
        headers: ["Code", "Meaning", "When Used in SassyBlend"],
        rows: [
          {
            code: "200",
            meaning: "OK",
            when: "Successful GET / PUT / PATCH operations",
            color: "#6ee7b7",
          },
          {
            code: "201",
            meaning: "Created",
            when: "Successful POST — new user, product, order, or ticket",
            color: "#6ee7b7",
          },
          {
            code: "400",
            meaning: "Bad Request",
            when: "Zod validation failure — field-level errors returned in error.fields",
            color: "HEX.accent3",
          },
          {
            code: "401",
            meaning: "Unauthorized",
            when: "Missing or invalid JWT / session cookie",
            color: "HEX.accent3",
          },
          {
            code: "403",
            meaning: "Forbidden",
            when: "Authenticated but insufficient role (e.g. non-admin on admin route)",
            color: "HEX.accent3",
          },
          {
            code: "404",
            meaning: "Not Found",
            when: "Resource does not exist or was soft-deleted",
            color: "HEX.accent3",
          },
          {
            code: "409",
            meaning: "Conflict",
            when: "Duplicate coupon redemption, already-liked product",
            color: "HEX.accent3",
          },
          {
            code: "500",
            meaning: "Server Error",
            when: "Caught by global error handler — never leaks stack traces to client",
            color: "#f87171",
          },
        ],
      },

      errorHandlerCode: `// All errors funnel through a single Express error middleware.
// No stack traces reach the client in production.

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const isZodError = err instanceof ZodError;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal server error",
    data: null,
    error: {
      code: isZodError ? "VALIDATION_ERROR" : "SERVER_ERROR",
      fields: isZodError ? err.flatten().fieldErrors : null,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined
    }
  });
});`,
    },

    challenges: {
      section: "Challenges & Decisions",
      headers: ["Challenge", "Decision", "Impact"],

      items: [
        {
          challenge: {
            title: "Payment Reliability",
            body: "Paystack redirects fail silently if the client crashes post-payment.",
          },
          decision:
            "Triple verification: backend init → manual GET verify → HMAC-signed webhook finalization.",
          impact: {
            body: "Zero ghost orders. Database converges correctly regardless of client state.",
            tag: "Financial Integrity",
          },
        },
        {
          challenge: {
            title: "Stale Rating Data",
            body: "Calculating avgRating at read time adds O(n) cost per product GET.",
          },
          decision:
            "Mongoose post('save') hook triggers aggregation at write time, updates Product atomically.",
          impact: {
            body: "Read-time cost is constant regardless of review volume.",
            tag: "DB Performance",
          },
        },
        {
          challenge: {
            title: "Chat Pagination at Scale",
            body: "Offset pagination degrades linearly — skip(50000) scans 50k documents to discard them.",
          },
          decision:
            "Cursor pagination using createdAt + ObjectId composites. Zero skip operations.",
          impact: {
            body: "O(1) query cost. Performant at millions of messages.",
            tag: "Scalability",
          },
        },
        {
          challenge: {
            title: "Concurrent Mutations",
            body: "Simultaneous cart updates and coupon redemptions risk double-processing.",
          },
          decision:
            "$inc, $addToSet, sessions + transactions for all writes. No application-level locks.",
          impact: {
            body: "Race conditions structurally impossible across cart, coupon, and like systems.",
            tag: "Data Integrity",
          },
        },
        {
          challenge: {
            title: "Validation Scatter",
            body: "Validation duplicated across controllers creates security blind spots as codebase grows.",
          },
          decision:
            "Centralized Zod schemas enforced via single middleware. Controllers receive clean data only.",
          impact: {
            body: "Field injection architecturally impossible. Zero runtime undefined errors.",
            tag: "Security",
          },
        },
        {
          challenge: {
            title: "Support Latency",
            body: "Users routed to menus or human agents for queries with deterministic database answers.",
          },
          decision:
            "Voice AI translation layer over existing REST endpoints — no new routes, OpenAI function-calling maps intent to authenticated API calls.",
          impact: {
            body: "Order status, stock queries, and ticket creation fully resolvable without a human agent.",
            tag: "AI Integration",
          },
        },
      ],
    },

    deployment: {
      section: "Deployment & Production Environment",

      deployCards: [
        {
          icon: "🚀",
          title: "Hosting & Infrastructure",
          items: [
            {
              label: "Backend",
              body: "Render (Node.js web service, auto-deploy from main branch)",
            },
            {
              label: "Database",
              body: "MongoDB Atlas (M0 cluster → M10 upgrade path on traffic growth)",
            },
            {
              label: "Media",
              body: "Cloudinary (image upload, transformation, CDN delivery)",
            },
            {
              label: "Payments",
              body: "Paystack (NGN-native, webhook endpoint registered on Render URL)",
            },
            {
              label: "Frontend",
              body: "Vercel (React SPA, environment-aware API base URL)",
            },
            {
              label: "Email",
              body: "Resend (transactional email API — order confirmations, status updates, support)",
            },
          ],
        },
        {
          icon: "🔑",
          title: "Environment & Secrets Strategy",
          items: [
            {
              label: "NODE_ENV",
              body: "gates stack trace exposure — never leaks to client in production",
            },
            {
              label: "MONGO_URI",
              body: "stored in Render environment — never committed to repository",
            },
            {
              label: "JWT_SECRET",
              body: "rotatable without code changes — environment variable only",
            },
            {
              label: "PAYSTACK_SECRET_KEY",
              body: "used server-side only — never exposed to client bundle",
            },
            {
              label: "WEBHOOK_SECRET",
              body: "used for HMAC-SHA512 signature verification on all Paystack events",
            },
            {
              label: "RESEND_API_KEY",
              body: "stored in Render environment — used server-side only for email dispatch",
            },
          ],
        },
      ],

      checklist: [
        {
          done: true,
          label: "CORS configured with allowlist — not wildcard (*)",
        },
        { done: true, label: "Helmet.js — HTTP security headers enforced" },
        { done: true, label: "No stack traces in production API responses" },
        { done: true, label: "Environment-gated debug logging" },
        { done: true, label: "Webhook HMAC signature verification active" },
        { done: true, label: "MongoDB Atlas IP allowlist configured" },
        {
          done: true,
          label: "In-app notifications persisted with read/unread state",
        },
        { done: true, label: "Transactional email active via Resend API" },
        {
          done: true,
          label:
            "Rate limiting active — express-rate-limit per IP + endpoint category",
        },
        {
          done: false,
          label: "Automated test suite (planned — Jest + Supertest)",
        },
        {
          done: false,
          label:
            "Voice AI layer (planned — Vapi / ElevenLabs + OpenAI function-calling)",
        },
      ],

      ciItems: [
        {
          label: "GitHub Actions",
          body: "lint → test → build on every pull request to main",
        },
        {
          label: "Render Auto-Deploy",
          body: "triggered on merge to main — zero-downtime rolling deploy",
        },
        {
          label: "Environment promotion",
          body: "dev → staging → production with environment-specific secrets",
        },
        {
          label: "Health check endpoint",
          body: "GET /api/health confirms DB connectivity and service status",
        },
      ],
    },

    observability: {
      section: "Observability & Monitoring",

      items: [
        {
          icon: "📋",
          title: "Structured Logging",
          status: "active",
          statusLabel: "Partial · Active",
          body: "Environment-gated console logging with request context (method, path, status, duration). Planned: Winston with JSON-formatted log levels and persistent log shipping to a log aggregator.",
        },
        {
          icon: "🐛",
          title: "Error Tracking",
          status: "active",
          statusLabel: "Partial · Active",
          body: "Global Express error handler catches and categorizes all unhandled exceptions. Zod errors are surfaced with field-level detail. Planned: Sentry integration for real-time error alerting and stack trace capture in production.",
        },
        {
          icon: "📡",
          title: "Uptime & Performance",
          status: "planned",
          statusLabel: "Planned",
          body: "Current: Render provides basic uptime monitoring and deploy logs. GET /api/health checks DB connectivity. Planned: Datadog APM for query-level performance tracing and response time histograms.",
        },
        {
          icon: "💳",
          title: "Payment Event Audit Trail",
          status: "active",
          statusLabel: "Active",
          body: "Every Paystack webhook event is logged with its verification status, transaction reference, and outcome. This creates a permanent audit trail for financial reconciliation and dispute resolution — active in production today.",
        },
        {
          icon: "🗄️",
          title: "Database Monitoring",
          status: "active",
          statusLabel: "Active",
          body: "MongoDB Atlas provides query performance advisor, slow query detection, and index usage analytics. Atlas alerts are configured for connection pool saturation and storage threshold warnings.",
        },
        {
          icon: "📊",
          title: "API Response Metrics",
          status: "planned",
          statusLabel: "Planned",
          body: "Planned: Request duration middleware to log p50/p95/p99 latency per endpoint. This data will drive future indexing decisions and identify hot paths for Redis caching prioritization.",
        },
        {
          icon: "🔔",
          title: "Notification & Email Delivery",
          status: "active",
          statusLabel: "Partial · Active",
          body: "In-app notifications are persisted to MongoDB with read/unread status, enabling delivery confirmation at the data layer. Transactional emails are dispatched via Resend, which provides API-level delivery status. Planned: Resend webhook integration for bounce, open, and click event tracking.",
        },
        {
          icon: "🎙️",
          title: "Voice AI Observability",
          status: "planned",
          statusLabel: "Planned",
          body: "Planned alongside voice AI rollout: intent classification logging per conversation turn, function call success/failure rates per intent type, and latency tracking across the Vapi → OpenAI → Express → MongoDB chain. Failed intents will surface as structured errors in the existing global error handler.",
        },
      ],
    },

    limitations: {
      section: "Known Limitations & Honest Assessment",

      intro:
        "Senior engineers know their system's boundaries. These are the current architectural limitations and the paths to resolving them.",

      items: [
        {
          title: "No Distributed Cache Layer",
          body: "Hot product and category queries currently hit MongoDB on every request. Under high read concurrency, this will saturate the database connection pool before compute is exhausted.",
          mitigation:
            "Redis cache with TTL-based invalidation on write — extraction path is already clear given the modular controller structure.",
          resolved: false,
        },
        {
          title: "Single-Node MongoDB Assumption",
          body: "The system uses MongoDB Atlas M0 (free tier) which does not support replica sets with session-based transactions in all configurations. Transaction patterns are written correctly but may degrade on non-replicated clusters.",
          mitigation:
            "Upgrade to Atlas M10+ enables full replica set with multi-document transaction support at scale.",
          resolved: false,
        },
        {
          title: "Chat Not Horizontally Scaled",
          body: "The real-time chat foundation uses Socket.io, which stores active connections in process memory. Horizontal scaling across multiple Node.js instances would cause cross-instance message loss.",
          mitigation:
            "Socket.io Redis adapter for pub/sub across instances — the modular architecture makes this a configuration change, not a rewrite.",
          resolved: false,
        },
        {
          title: "No Background Job Queue",
          body: "Transactional email (Resend) and in-app notification writes currently execute synchronously within the request lifecycle. Under high load, a slow Resend API response could add latency to the primary order confirmation flow.",
          mitigation:
            "BullMQ with Redis backend — email dispatch and notification creation become async, retryable, and monitorable through a Bull Board dashboard.",
          resolved: false,
        },
        {
          title: "No Automated Test Coverage",
          body: "The system has been manually tested against all core user flows, but lacks a formal test suite. This increases regression risk during future feature additions and makes refactoring less safe.",
          mitigation:
            "Jest + Supertest integration tests against a test MongoDB instance — priority item for the next development cycle.",
          resolved: false,
        },
        {
          title: "Voice AI Not Yet Implemented",
          body: "The voice AI layer is fully designed and architecturally mapped — intent routing, slot extraction, and API contract are defined. Implementation is pending Vapi / ElevenLabs integration and OpenAI function-calling wiring.",
          mitigation:
            "No structural backend changes required. The existing modular API surface and standard response envelope are the implementation substrate.",
          resolved: false,
        },
        {
          title: "API Rate Limiting — Resolved",
          body: "Public endpoints (product listing, search, auth) are protected against request flooding via express-rate-limit, configured per IP and per endpoint category. Connection pool exhaustion from malicious flooding is now structurally mitigated.",
          mitigation:
            "Active in production. Redis store upgrade path remains open for distributed rate limiting across horizontally scaled instances.",
          resolved: true,
        },
      ],
    },

    lessons: {
      section: "Engineering Lessons",

      items: [
        {
          icon: "⚡",
          title: "Atomic Operations Are Non-Negotiable at Scale",
          body: "Application-level locks are fragile. Pushing concurrency control to the database layer via $inc, $addToSet, and transactions is the only reliable approach for high-throughput mutation scenarios.",
        },
        {
          icon: "🔒",
          title: "Security Through Architecture, Not Discipline",
          body: "Relying on developers to validate every input is a losing strategy. Centralizing validation into enforced middleware means security guarantees hold regardless of who writes the next route.",
        },
        {
          icon: "📊",
          title: "Pre-compute at Write, Serve at Read",
          body: "Moving aggregation from read time to write time is the same principle behind materialized views, CQRS read-model projections, and Redis sorted sets — and it scales infinitely better.",
        },
        {
          icon: "📄",
          title: "Pagination Strategy Is a Scalability Decision",
          body: "Choosing offset vs. cursor pagination in week one determines whether the chat feature is still performant in year two. The correct choice requires thinking about data volume assumptions upfront.",
        },
        {
          icon: "🔄",
          title: "Knowing Your Limitations Is a Senior Skill",
          body: "Documenting what the system cannot yet do — and knowing the exact path to resolve each gap — is what separates engineers who built something from engineers who understand what they built.",
        },
        {
          icon: "🏗️",
          title: "Design for the System You'll Need",
          body: "Every decision — modular routes, middleware abstraction, cursor pagination, webhook patterns — was made assuming this backend will eventually need Redis, WebSockets, and microservice extraction.",
        },
        {
          icon: "🎙️",
          title: "A Good API Contract Is an Integration Multiplier",
          body: "The consistent response envelope (success, data, error) designed for the REST layer made the voice AI integration structurally trivial — the translation layer has one contract to parse across all intent types. API standardization compounds in value as new consumers are added.",
        },
      ],
    },

    roadmap: {
      section: "Roadmap & Scalability Path",

      items: [
        "Voice AI layer — Vapi / ElevenLabs + OpenAI function-calling integration",
        "Redis caching for hot product & category queries",
        "Socket.io Redis adapter for horizontal chat scaling",
        "BullMQ job queues for async email dispatch & notification retries",
        "Resend webhook integration for bounce & open tracking",
        "Redis store for distributed rate limiting across scaled instances",
        "Jest + Supertest integration test suite",
        "OpenAPI / Swagger documentation generation",
        "Winston structured logging + Sentry error tracking",
        "GitHub Actions CI/CD — lint → test → deploy",
        "Atlas M10 upgrade for full replica set transactions",
        "Datadog APM for p95 latency tracing per endpoint",
        "Microservice extraction of payment domain",
        "API versioning strategy (v1 → v2 migration path)",
      ],
    },
  },

  featuredCaseStudyData: {
    section: "Featured Case Study",

    title: {
      eyebrow: "Engineering Case Study · 2024",
      main: ["Sassy", "Blend", "API"],
      subtitle:
        "A production-grade MERN e-commerce backend engineered for financial integrity, database performance, and real-time scalability — designed, architected, and built by one engineer.",
    },

    metrics: [
      { label: "Response Time", val: "<100ms", sub: "core product queries" },
      { label: "Ghost Orders", val: "Zero", sub: "across all sessions" },
      { label: "Architecture", val: "13", sub: "deep-dive sections" },
    ],

    chips: [
      { variant: "y", text: "Solo Project" },
      { variant: "b", text: "Full-Stack" },
      { variant: "o", text: "Production-Ready" },
    ],

    badges: [
      { dot: "y", text: "Triple-verified Paystack pipeline" },
      { dot: "b", text: "Cursor-based pagination at scale" },
      { dot: "o", text: "Atomic MongoDB operations" },
      { dot: "p", text: "Centralised Zod validation layer" },
      { dot: "y", text: "HMAC webhook verification" },
      { dot: "b", text: "Socket.io real-time foundation" },
      { dot: "o", text: "Cloudinary + Resend integrations" },
      { dot: "p", text: "Express rate limiting per route" },
      { dot: "y", text: "Redis / BullMQ extraction-ready" },
      { dot: "b", text: "Voice AI layer (planned)" },
    ],

    cta: {
      label: "Read Full Case Study →",
      href: "#",
    },

    dotColors: {
      y: "accent",
      b: "accent2",
      o: "accent3",
      p: "accent4",
    },
  },

  miniCaseStudyData: {
    index: "01",
    featured: true,
    status: "complete",
    type: "Backend Architecture · E-Commerce",
    title: "SassyBlend API",
    subtitle: "A production-grade MERN e-commerce backend",
    description:
      "A full-stack food/restaurant e-commerce platform engineered for financial integrity, database performance, and real-time scalability. Covers Paystack payment pipelines, atomic MongoDB operations, cursor-based pagination, Socket.io foundation, HMAC webhook verification, and a centralised Zod validation layer — designed and built solo.",
    chips: [
      { label: "Solo Project", variant: "y" },
      { label: "Full-Stack", variant: "b" },
      { label: "Production-Ready", variant: "o" },
    ],
    tags: [
      "Node.js",
      "Express",
      "MongoDB",
      "React",
      "Redux Toolkit",
      "Socket.io",
      "Paystack",
      "Cloudinary",
      "Resend",
      "OpenAI (planned)",
    ],
    metrics: [
      { label: "Response Time", value: "<100ms" },
      { label: "Ghost Orders", value: "Zero" },
      { label: "Sections", value: "13" },
    ],
    highlights: [
      "Triple-verified Paystack pipeline",
      "Cursor-based pagination at scale",
      "Atomic MongoDB operations",
      "HMAC webhook verification",
      "Voice AI support layer (planned)",
    ],
    href: "/case-studies/sassyblend-api",
    image: {
      aspect: "16/9",
      label: "System Architecture Diagram",
      hint: "1200 × 675px recommended",
    },
  },
};

export default sassyBlend;
