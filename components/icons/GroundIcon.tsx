import React from 'react';
import { ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface GroundIconProps {
  size?: number;
  color?: string;
  style?: ViewStyle;
}

export function GroundIcon({ size = 60, color = '#000', style }: GroundIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
      {/* 
        The electrical ground symbol:
        1. Vertical line from top
        2. Top horizontal line (widest)
        3. Middle horizontal line (medium)
        4. Bottom horizontal line (shortest)
      */}
      
      {/* The Vertical Stem */}
      <Path
        d="M12 2V12"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      
      {/* Top Bar (Widest) */}
      <Path
        d="M4 12H20"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      
      {/* Middle Bar (Medium) */}
      <Path
        d="M7 16H17"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      
      {/* Bottom Bar (Shortest) */}
      <Path
        d="M10 20H14"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
}