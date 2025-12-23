/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

// tintColor constants
const tintColorLight = '#0a7ea4'; // Calm Teal-Blue
const tintColorDark = '#3395FF';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff', // Apple HIG Standard Light Background
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,

    // NEW VIBRANT COLORS
    step5: '#0099FF', // Vivid Blue
    step4: '#00C853', // Vivid Green
    step3: '#FF9100', // Vivid Orange
    step2: '#D500F9', // Vivid Purple
    step1: '#FF3D00', // Vivid Red
    
    stepText: '#11181C', // High contrast for readability

    glassBorder: 'rgba(0, 0, 0, 0.1)',
    tabHighlight: 'rgba(0, 0, 0, 0.08)',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,

    // GROUNDING COLORS (Dark Mode - Deep/Muted)
    // Goal: "Elevated" dark colors. Not neon, but rich.
    
    // Step 5 (Sight): Deep Slate Blue
    step5: '#102A43',
    
    // Step 4 (Touch): Deep Forest/Moss
    step4: '#133322', 
    
    // Step 3 (Sound): Deep Plum/Indigo
    step3: '#2D1B4E', 
    
    // Step 2 (Smell): Muted Mauve/Rosewood
    step2: '#4A1C30', 
    
    // Step 1 (Taste): Burnt Sienna/Clay
    step1: '#5D2E18',
    
    stepText: '#ECEDEE', // Light text on dark backgrounds

    glassBorder: 'rgba(255, 255, 255, 0.15)',
    tabHighlight: 'rgba(255, 255, 255, 0.15)',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
