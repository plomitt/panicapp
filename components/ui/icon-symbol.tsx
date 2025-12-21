import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight } from 'expo-symbols';
import { OpaqueColorValue, StyleProp, TextStyle } from 'react-native';

// Add your mappings here.
// Key = iOS SF Symbol Name
// Value = Android/Web Material Icon Name
const MAPPING = {
  // Default mappings
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  
  // Grounding App mappings
  'leaf.fill': 'spa',
  'eye.fill': 'visibility',
  'hand.point.up.fill': 'fingerprint',
  'ear.fill': 'hearing',
  'nose.fill': 'filter-vintage',
  'mouth.fill': 'restaurant',
  'checkmark.circle.fill': 'check-circle',
} as const;

export type IconSymbolName = keyof typeof MAPPING;

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return (
    <MaterialIcons 
      color={color} 
      size={size} 
      name={MAPPING[name]} 
      style={style} 
    />
  );
}