import { tokens, HEX } from "@/utils/tokens";
import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

const COL_W = 108;
const COL_GAP = 12;
const COLS = 5;
const TOTAL_W = COLS * COL_W + (COLS - 1) * COL_GAP;

const colX = (i) => i * (COL_W + COL_GAP) + COL_W / 2;
const CX = [colX(0), colX(1), colX(2), colX(3), colX(4)];

const ARROW_DEF = (
  <defs>
    <marker
      id="vf-arrow"
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

const Arrow = ({ x1, y, x2, color, dashed, label, labelDy = -6 }) => {
  const dir = x2 > x1 ? 1 : -1;
  return (
    <>
      {label && (
        <text
          x={(x1 + x2) / 2}
          y={y + labelDy}
          textAnchor="middle"
          fontSize="10"
          fill={color}
          fontFamily="monospace"
        >
          {label}
        </text>
      )}
      <line
        x1={x1 + dir * 5}
        y1={y}
        x2={x2 - dir * 5}
        y2={y}
        stroke={color}
        strokeWidth={dashed ? 0.75 : 1}
        strokeDasharray={dashed ? "4 3" : undefined}
        markerEnd="url(#vf-arrow)"
      />
    </>
  );
};

const Dot = ({ cx, cy, color }) => (
  <circle cx={cx} cy={cy} r={3} fill={color} />
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

const InlineBox = ({ col, y, lines, borderColor, bgColor }) => {
  const x = col * (COL_W + COL_GAP);
  const h = lines.length === 1 ? 26 : 36;
  return (
    <>
      <rect
        x={x + 4} y={y}
        width={COL_W - 8} height={h}
        rx={4}
        fill={bgColor}
        stroke={borderColor}
        strokeWidth={0.5}
      />
      {lines.map((ln, i) => (
        <text
          key={i}
          x={x + COL_W / 2}
          y={y + (lines.length === 1 ? 16 : i === 0 ? 13 : 26)}
          textAnchor="middle"
          fontSize="10"
          fill={HEX.muted2}
          fontFamily="monospace"
        >
          {ln}
        </text>
      ))}
    </>
  );
};

const VoiceFlowDiagram = () => {
  const H = 580;

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
          { label: "User",              color: HEX.muted2,  border: HEX.border },
          { label: "Vapi / ElevenLabs", color: "#5dcaa5",   border: "rgba(29,158,117,0.4)" },
          { label: "OpenAI",            color: HEX.accent4, border: "rgba(180,127,255,0.4)" },
          { label: "Express API",       color: HEX.accent3, border: "rgba(255,107,71,0.4)" },
          { label: "MongoDB",           color: HEX.accent2, border: "rgba(71,200,255,0.4)" },
        ].map(({ label, color, border }) => (
          <Box
            key={label}
            w={`${COL_W}px`}
            flexShrink={0}
            textAlign="center"
            py="5px"
            border="1px solid"
            borderColor={border}
            borderRadius="4px"
          >
            <Text fontSize="9px" letterSpacing="0.1em" color={color} textTransform="uppercase" noOfLines={1}>
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
        {ARROW_DEF}

        {CX.map((cx, i) => (
          <line
            key={i}
            x1={cx} y1={0}
            x2={cx} y2={H - 60}
            stroke={HEX.border}
            strokeWidth={0.5}
            strokeDasharray="3 4"
          />
        ))}

        {/* Scenario 1 — Order status */}
        <Band y={4} label="Scenario 1 — Order status lookup" color={HEX.accent2} bg="rgba(71,200,255,0.07)" />

        <Dot cx={CX[0]} cy={36} color={HEX.accent2} />
        <Arrow x1={CX[0]} y={36} x2={CX[1]} color={HEX.accent2} label={`"Status of my last order"`} />

        <Dot cx={CX[1]} cy={58} color={HEX.accent4} />
        <Arrow x1={CX[1]} y={58} x2={CX[2]} color={HEX.accent4} label="transcript" />

        <InlineBox col={2} y={70} lines={["classify intent", "slot: order_id"]} borderColor="rgba(180,127,255,0.25)" bgColor="rgba(180,127,255,0.06)" />

        <Dot cx={CX[2]} cy={122} color={HEX.accent3} />
        <Arrow x1={CX[2]} y={122} x2={CX[3]} color={HEX.accent3} label="function call" />

        <Dot cx={CX[3]} cy={144} color={HEX.accent2} />
        <Arrow x1={CX[3]} y={144} x2={CX[4]} color={HEX.accent2} label="GET /orders/:id" />

        <Dot cx={CX[4]} cy={164} color={HEX.muted} />
        <Arrow x1={CX[4]} y={164} x2={CX[3]} color={HEX.muted} dashed label="order doc" />

        <Dot cx={CX[3]} cy={184} color={HEX.muted} />
        <Arrow x1={CX[3]} y={184} x2={CX[2]} color={HEX.muted} dashed label="{ status, date }" />

        <Dot cx={CX[2]} cy={204} color={HEX.muted} />
        <Arrow x1={CX[2]} y={204} x2={CX[1]} color={HEX.muted} dashed label="spoken reply" />

        <Dot cx={CX[1]} cy={224} color={HEX.muted} />
        <Arrow x1={CX[1]} y={224} x2={CX[0]} color={HEX.muted} dashed label={`"Order out for delivery"`} />

        {/* Scenario 2 — Support ticket */}
        <Band y={246} label="Scenario 2 — Support ticket creation" color={HEX.accent} bg="rgba(232,255,71,0.07)" />

        <Dot cx={CX[0]} cy={278} color={HEX.accent} />
        <Arrow x1={CX[0]} y={278} x2={CX[1]} color={HEX.accent} label={`"I have a problem"`} />

        <Dot cx={CX[1]} cy={300} color={HEX.accent4} />
        <Arrow x1={CX[1]} y={300} x2={CX[2]} color={HEX.accent4} label="transcript" />

        <InlineBox col={2} y={312} lines={["intake flow", "collect fields"]} borderColor="rgba(232,255,71,0.2)" bgColor="rgba(232,255,71,0.05)" />

        <Dot cx={CX[2]} cy={364} color={HEX.accent3} />
        <Arrow x1={CX[2]} y={364} x2={CX[3]} color={HEX.accent3} label="function call" />

        <Dot cx={CX[3]} cy={386} color={HEX.accent2} />
        <Arrow x1={CX[3]} y={386} x2={CX[4]} color={HEX.accent2} label="POST /support/tickets" />

        <Dot cx={CX[4]} cy={406} color={HEX.muted} />
        <Arrow x1={CX[4]} y={406} x2={CX[3]} color={HEX.muted} dashed label="ticket created" />

        <Dot cx={CX[3]} cy={426} color={HEX.muted} />
        <Arrow x1={CX[3]} y={426} x2={CX[2]} color={HEX.muted} dashed />

        <Dot cx={CX[2]} cy={446} color={HEX.muted} />
        <Arrow x1={CX[2]} y={446} x2={CX[1]} color={HEX.muted} dashed label="spoken reply" />

        <Dot cx={CX[1]} cy={466} color={HEX.muted} />
        <Arrow x1={CX[1]} y={466} x2={CX[0]} color={HEX.muted} dashed label={`"Ticket #1042 opened"`} />

        {/* Legend */}
        <line x1={0} y1={500} x2={TOTAL_W} y2={500} stroke={HEX.border} strokeWidth={0.5} />
        <line x1={6}   y1={522} x2={38}  y2={522} stroke={HEX.accent2} strokeWidth={1}    markerEnd="url(#vf-arrow)" />
        <text x={44}   y={526} fontSize="10" fill={HEX.muted} fontFamily="monospace">voice / request</text>
        <line x1={160} y1={522} x2={192} y2={522} stroke={HEX.accent3} strokeWidth={1}    markerEnd="url(#vf-arrow)" />
        <text x={198}  y={526} fontSize="10" fill={HEX.muted} fontFamily="monospace">function call</text>
        <line x1={310} y1={522} x2={342} y2={522} stroke={HEX.accent2} strokeWidth={1}    markerEnd="url(#vf-arrow)" />
        <text x={348}  y={526} fontSize="10" fill={HEX.muted} fontFamily="monospace">DB query</text>
        <line x1={440} y1={522} x2={472} y2={522} stroke={HEX.muted}   strokeWidth={0.75} strokeDasharray="4 3" markerEnd="url(#vf-arrow)" />
        <text x={478}  y={526} fontSize="10" fill={HEX.muted} fontFamily="monospace">response</text>
      </svg>
    </Box>
  );
};

export default VoiceFlowDiagram;
