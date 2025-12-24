import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight } from 'expo-symbols';
import { OpaqueColorValue, Platform, StyleProp, TextStyle } from 'react-native';
import Animated, {
  useAnimatedProps,
  withTiming
} from 'react-native-reanimated';

// 1. Create an Animated version of the Icon component
const AnimatedMaterialIcons = Animated.createAnimatedComponent(MaterialIcons);

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

  'gear': 'settings',
  'iphone': 'smartphone',
  'sun.max.fill': 'wb-sunny',
  'moon.fill': 'nightlight-round',
  'globe': 'language',
  'checkmark': 'check',
} as const;

export type IconSymbolName = keyof typeof MAPPING;

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

  if (Platform.OS === 'web') {
    return (
      <MaterialIcons
        name={MAPPING[name]}
        size={size}
        color={color as string}
        style={style}
      />
    );
  }

  // 2. Animate the color prop
  // We cast to string because OpaqueColorValue is rare in this context (usually hex strings)
  const animatedProps = useAnimatedProps(() => {
    return {
      color: withTiming(color as string, { duration: 300 }),
    };
  });

  return (
    <AnimatedMaterialIcons
      name={MAPPING[name]}
      size={size}
      style={style}
      // Pass the animated prop instead of the static one
      animatedProps={animatedProps}
    />
  );
}