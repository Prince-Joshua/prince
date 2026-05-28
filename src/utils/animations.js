import { keyframes } from "@emotion/react";

export const gridShift = keyframes`
  from { background-position: 0 0, 0 0; }
  to   { background-position: 60px 60px, 60px 60px; }
`;

export const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50%       { transform: scale(1.12); opacity: 0.6; }
`;

export const blink = keyframes`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.3; }
`;

export const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(26px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const scanline = keyframes`
  0%   { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
`;

export const anim = (delay) => `${fadeUp.toString()} 0.7s ${delay}s ease both`;
