import React from 'react';
import { motion } from 'framer-motion';
import { WheelSegment as WheelSegmentType } from '@/store/wheelStore';

interface WheelSegmentProps {
  segment: WheelSegmentType;
  index: number;
  totalSegments: number;
  isWinner: boolean;
}

export const WheelSegment: React.FC<WheelSegmentProps> = ({
  segment,
  index,
  totalSegments,
  isWinner
}) => {
  const segmentAngle = 360 / totalSegments;
  const rotation = index * segmentAngle;
  
  // Calculate text position - place text in the middle of each segment
  const textRadius = 120; // Distance from center
  const textAngle = (rotation + segmentAngle / 2) * (Math.PI / 180);
  const textX = Math.sin(textAngle) * textRadius;
  const textY = -Math.cos(textAngle) * textRadius;

  return (
    <g>
      {/* Segment path */}
      <motion.path
        d={createSegmentPath(160, segmentAngle)}
        fill={`hsl(var(--segment-${index + 1}))`}
        stroke="rgba(255, 255, 255, 0.2)"
        strokeWidth="2"
        transform={`rotate(${rotation} 160 160)`}
        className="transition-all duration-300"
        animate={isWinner ? {
          filter: ['brightness(1)', 'brightness(1.3)', 'brightness(1)']
        } : {}}
        transition={{ duration: 0.5, repeat: isWinner ? 3 : 0 }}
      />
      
      {/* Segment text */}
      <motion.text
        x={160 + textX}
        y={160 + textY}
        textAnchor="middle"
        dominantBaseline="middle"
        className="text-sm font-semibold fill-white drop-shadow-lg pointer-events-none select-none"
        transform={`rotate(${rotation + segmentAngle / 2} ${160 + textX} ${160 + textY})`}
        animate={isWinner ? {
          scale: [1, 1.2, 1],
        } : {}}
        transition={{ duration: 0.5, repeat: isWinner ? 3 : 0 }}
      >
        {segment.cuisine}
      </motion.text>
    </g>
  );
};

// Helper function to create SVG path for wheel segment
function createSegmentPath(radius: number, angle: number): string {
  const startAngle = 0;
  const endAngle = angle * (Math.PI / 180);
  
  const x1 = 160 + radius * Math.sin(startAngle);
  const y1 = 160 - radius * Math.cos(startAngle);
  const x2 = 160 + radius * Math.sin(endAngle);
  const y2 = 160 - radius * Math.cos(endAngle);
  
  const largeArcFlag = angle > 180 ? 1 : 0;
  
  return [
    'M', 160, 160, // Move to center
    'L', x1, y1,   // Line to start point
    'A', radius, radius, 0, largeArcFlag, 1, x2, y2, // Arc to end point
    'Z' // Close path
  ].join(' ');
}

// Wrap the component in an SVG for proper rendering
export const WheelSegmentSVG: React.FC<WheelSegmentProps> = (props) => (
  <svg className="absolute inset-0 w-full h-full">
    <WheelSegment {...props} />
  </svg>
);