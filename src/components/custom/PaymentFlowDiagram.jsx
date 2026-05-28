import { tokens, HEX } from "@/utils/tokens";
import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

const COL_W = 130;
const COL_GAP = 16;
const COLS = 4;
const TOTAL_W = COLS * COL_W + (COLS - 1) * COL_GAP;

const colX = (i) => i * (COL_W + COL_GAP) + COL_W / 2;
const CX = [colX(0), colX(1), colX(2), colX(3)];

const ARROW = (
  <defs>
    <marker
      id="pf-arrow"
      viewBox="0 0 10 10"
      refX="8"
      refY="5"
      markerWidth="6"
      markerHeight="6"
      orient="auto-start-reverse"
    >
      <path
        d="M2 1L8 5L2 9"
        fill="none"
        stroke="context-stroke"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </marker>
  </defs>
);

const Arrow = ({ x1, y, x2, color, dashed, label, labelDy = -6 }) => (
  <>
    {label && (
      <text
        x={(x1 + x2) / 2}
        y={y + labelDy}
        textAnchor="middle"
        fontSize="11"
        fill={color}
        fontFamily="monospace"
      >
        {label}
      </text>
    )}
    <line
      x1={x1 + (x2 > x1 ? 5 : -5)}
      y1={y}
      x2={x2 + (x2 > x1 ? -5 : 5)}
      y2={y}
      stroke={color}
      strokeWidth={dashed ? 0.75 : 1}
      strokeDasharray={dashed ? "4 3" : undefined}
      markerEnd="url(#pf-arrow)"
    />
  </>
);

const Dot = ({ cx, cy, color }) => (
  <circle cx={cx} cy={cy} r={3.5} fill={color} />
);

const Band = ({ y, label, color, bg }) => (
  <>
    <rect x={0} y={y} width={TOTAL_W} height={16} rx={3} fill={bg} />
    <text
      x={TOTAL_W / 2}
      y={y + 11}
      textAnchor="middle"
      fontSize="10"
      fill={color}
      fontFamily="monospace"
      letterSpacing="0.05em"
    >
      {label}
    </text>
  </>
);

const StepBox = ({ col: _col, y, lines, borderColor, bgColor }) => {
  const x = _col * (COL_W + COL_GAP);
  const h = lines.length === 1 ? 28 : 38;
  return (
    <>
      <rect
        x={x + 4}
        y={y}
        width={COL_W - 8}
        height={h}
        rx={4}
        fill={bgColor}
        stroke={borderColor}
        strokeWidth={0.5}
      />
      {lines.map((ln, i) => (
        <text
          key={i}
          x={x + COL_W / 2}
          y={y + (lines.length === 1 ? 17 : i === 0 ? 14 : 28)}
          textAnchor="middle"
          fontSize="10.5"
          fill={HEX.muted2}
          fontFamily="monospace"
        >
          {ln}
        </text>
      ))}
    </>
  );
};

const PaymentFlowDiagram = () => {
  const H = 540;

  return (
    <Box
      bg={tokens.surface}
      border="1px solid"
      borderColor={tokens.border}
      borderRadius="6px"
      p={{ base: "16px", md: "20px" }}
      overflowX="auto"
      my="20px"
    >
      <Flex gap={`${COL_GAP}px`} mb="12px" minW={`${TOTAL_W}px`}>
        {[
          { label: "Client",      color: HEX.muted2,  border: HEX.border },
          { label: "Express API", color: "#5dcaa5",   border: "rgba(29,158,117,0.4)" },
          { label: "Paystack",    color: HEX.accent4, border: "rgba(180,127,255,0.4)" },
          { label: "MongoDB",     color: HEX.accent2, border: "rgba(71,200,255,0.4)" },
        ].map(({ label, color, border }) => (
          <Box
            key={label}
            w={`${COL_W}px`}
            flexShrink={0}
            textAlign="center"
            py="6px"
            border="1px solid"
            borderColor={border}
            borderRadius="4px"
            bg="transparent"
          >
            <Text fontSize="10px" letterSpacing="0.12em" color={color} textTransform="uppercase">
              {label}
            </Text>
          </Box>
        ))}
      </Flex>

      <svg
        width={TOTAL_W}
        height={H}
        viewBox={`0 0 ${TOTAL_W} ${H}`}
        style={{ display: "block", overflow: "visible" }}
      >
        {ARROW}

        {CX.map((cx, i) => (
          <line
            key={i}
            x1={cx} y1={0}
            x2={cx} y2={H}
            stroke={HEX.border}
            strokeWidth={0.5}
            strokeDasharray="3 4"
          />
        ))}

        {/* Step 1 — Init */}
        <Dot cx={CX[0]} cy={28} color="#5dcaa5" />
        <Arrow x1={CX[0]} y={28} x2={CX[1]} color="#5dcaa5" label="POST /checkout" />

        <Dot cx={CX[1]} cy={56} color="#5dcaa5" />
        <Arrow x1={CX[1]} y={56} x2={CX[3]} color="#5dcaa5" label="Create order · status: pending" />

        <Dot cx={CX[3]} cy={78} color={HEX.muted} />
        <Arrow x1={CX[3]} y={78} x2={CX[1]} color={HEX.muted} dashed />

        <Dot cx={CX[1]} cy={100} color={HEX.muted} />
        <Arrow x1={CX[1]} y={100} x2={CX[0]} color={HEX.muted} dashed label="paystack URL" />

        <text x={TOTAL_W / 2} y={124} textAnchor="middle" fontSize="10" fill={HEX.muted} fontFamily="monospace">
          — user redirected to Paystack —
        </text>

        <Dot cx={CX[0]} cy={142} color={HEX.accent4} />
        <Arrow x1={CX[0]} y={142} x2={CX[2]} color={HEX.accent4} label="redirect (user pays)" />

        <Dot cx={CX[2]} cy={164} color={HEX.muted} />
        <Arrow x1={CX[2]} y={164} x2={CX[0]} color={HEX.muted} dashed />

        {/* Step 2 */}
        <Band y={182} label="Step 2 — Manual verification on return" color={HEX.accent2} bg="rgba(71,200,255,0.06)" />

        <Dot cx={CX[0]} cy={216} color={HEX.accent2} />
        <Arrow x1={CX[0]} y={216} x2={CX[1]} color={HEX.accent2} label="GET /verify/:ref" />

        <Dot cx={CX[1]} cy={238} color={HEX.accent2} />
        <Arrow x1={CX[1]} y={238} x2={CX[2]} color={HEX.accent2} label="verify ref" />

        <Dot cx={CX[2]} cy={260} color={HEX.muted} />
        <Arrow x1={CX[2]} y={260} x2={CX[1]} color={HEX.muted} dashed label="confirmed" />

        <Dot cx={CX[1]} cy={282} color={HEX.accent2} />
        <Arrow x1={CX[1]} y={282} x2={CX[3]} color={HEX.accent2} label="Update order · status: paid" />

        <Dot cx={CX[1]} cy={304} color={HEX.muted} />
        <Arrow x1={CX[1]} y={304} x2={CX[0]} color={HEX.muted} dashed label="success" />

        {/* Step 3 */}
        <Band y={324} label="Step 3 — HMAC-signed webhook · async, independent of client" color={HEX.accent} bg="rgba(232,255,71,0.06)" />

        <Dot cx={CX[2]} cy={358} color={HEX.accent} />
        <Arrow x1={CX[2]} y={358} x2={CX[1]} color={HEX.accent} label="webhook" />

        <StepBox col={1} y={370} lines={["verify HMAC-SHA512"]} borderColor="rgba(232,255,71,0.2)" bgColor="rgba(232,255,71,0.04)" />

        <Dot cx={CX[1]} cy={416} color={HEX.accent} />
        <Arrow x1={CX[1]} y={416} x2={CX[3]} color={HEX.accent} label="idempotent update" />
        <text x={(CX[1] + CX[3]) / 2} y={434} textAnchor="middle" fontSize="10" fill={HEX.muted} fontFamily="monospace">
          no-op if already paid
        </text>

        {/* Legend */}
        <line x1={0} y1={468} x2={TOTAL_W} y2={468} stroke={HEX.border} strokeWidth={0.5} />
        <line x1={8}   y1={488} x2={44}  y2={488} stroke="#5dcaa5"   strokeWidth={1}    markerEnd="url(#pf-arrow)" />
        <text x={50}   y={492} fontSize="10" fill={HEX.muted} fontFamily="monospace">request</text>
        <line x1={130} y1={488} x2={166} y2={488} stroke={HEX.muted} strokeWidth={0.75} strokeDasharray="4 3" markerEnd="url(#pf-arrow)" />
        <text x={172}  y={492} fontSize="10" fill={HEX.muted} fontFamily="monospace">response</text>
        <circle cx={268} cy={488} r={3.5} fill={HEX.accent} />
        <text x={276}  y={492} fontSize="10" fill={HEX.accent} fontFamily="monospace">webhook path</text>
        <circle cx={388} cy={488} r={3.5} fill={HEX.accent2} />
        <text x={396}  y={492} fontSize="10" fill={HEX.accent2} fontFamily="monospace">verify path</text>
      </svg>
    </Box>
  );
};

export default PaymentFlowDiagram;
