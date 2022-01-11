import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const COLORS = {
    primary: '#42C6A5', // Green
    primary2: '#FBB344', // Orange
    primary3: '#33354E', // Dark Blue
    secondary: '#FC2626', // Red
    gray10: '#E5E5E5',
    gray20: '#CCCCCC',
    gray30: '#A1A1A1',
    gray40: '#999999',
    gray50: '#7F7F7F',
    gray60: '#666666',
    gray70: '#4C4C4C',
    gray80: '#333333',
    gray85: '#242526',
    gray90: '#191919',

    additionalColor4: '#C3C3C3',
    additionalColor9: '#F3F3F3',
    additionalColor11: '#F0FFFB',
    additionalColor13: '#EBF3EF',

    white: '#FFFFFF',
    black: '#000000',

    transparent: 'transparent',
    transparentWhite1: 'rgba(255, 255, 255, 0.1)',
    transparentBlack1: 'rgba(0, 0, 0, 0.1)',
    transparentBlack7: 'rgba(0, 0, 0, 0.7)',

    DEFAULT_BLACK: '#0E122B',
    DEFAULT_GREEN: '#0A8791',
    DEFAULT_YELLOW: '#FBA83C',
    DEFAULT_GREY: '#C2C2CB',
    DEFAULT_WHITE: '#FFFFFF',
    DEFAULT_RED: '#F53920',
    SECONDARY_RED: '#FF6F59',
    SECONDARY_WHITE: '#F8F8F8',
    SECONDARY_GREEN: '#24C869',
    SECONDARY_BLACK: '#191d35',
    LIGHT_GREEN: '#CEE8E7',
    LIGHT_GREY: '#F8F7F7',
    LIGHT_GREY2: '#EAEAEA',
    LIGHT_YELLOW: '#FCE6CD',
    LIGHT_RED: '#FFC8BF',
    FACEBOOK_BLUE: '#4A61A8',
    GOOGLE_BLUE: '#53A0F4',
    INACTIVE_GREY: '#A3A3A3',
    DARK_ONE: '#121212',
    DARK_TWO: '#181818',
    DARK_THREE: '#404040',
    DARK_FOUR: '#282828',
    DARK_FIVE: '#B3B3B3',
};
export const SIZES = {
    // global sizes
    base: 8,
    font: 14,
    radius: 12,
    padding: 24,

    // font sizes
    largeTitle: 40,
    h1: 30,
    h2: 22,
    h3: 16,
    h4: 14,
    h5: 12,
    body1: 30,
    body2: 22,
    body3: 16,
    body4: 14,
    body5: 12,

    // app dimensions
    width,
    height,
};
export const FONTS = {
    largeTitle: { fontSize: SIZES.largeTitle },
    h1: { fontSize: SIZES.h1, lineHeight: 36, fontWeight: 'bold' },
    h2: { fontSize: SIZES.h2, lineHeight: 30, fontWeight: 'bold' },
    h3: { fontSize: SIZES.h3, lineHeight: 22, fontWeight: 'bold' },
    h4: { fontSize: SIZES.h4, lineHeight: 22, fontWeight: 'bold' },
    h5: { fontSize: SIZES.h5, lineHeight: 22, fontWeight: 'bold' },
    body1: { fontSize: SIZES.body1, lineHeight: 36 },
    body2: { fontSize: SIZES.body2, lineHeight: 30 },
    body3: { fontSize: SIZES.body3, lineHeight: 22 },
    body4: { fontSize: SIZES.body4, lineHeight: 22 },
    body5: { fontSize: SIZES.body5, lineHeight: 22 },
};

export const darkTheme = {
    name: 'dark',
    backgroundColor1: COLORS.gray85,
    backgroundColor2: COLORS.gray90,
    backgroundColor3: COLORS.gray90,
    backgroundColor4: COLORS.primary,
    backgroundColor5: COLORS.gray85,
    backgroundColor6: COLORS.black,
    backgroundColor7: COLORS.gray90,
    backgroundColor8: COLORS.gray70,
    lineDivider: COLORS.gray70,
    borderColor1: COLORS.gray70,
    borderColor2: COLORS.gray70,
    textColor: COLORS.white,
    textColor2: COLORS.white,
    textColor3: COLORS.gray40,
    textColor4: COLORS.white,
    textColor5: COLORS.gray30,
    textColor6: COLORS.gray30,
    textColor7: COLORS.gray40,
    tintColor: COLORS.white,
    dotColor1: COLORS.white,
    dotColor2: COLORS.primary,
};

export const lightTheme = {
    name: 'light',
    backgroundColor1: COLORS.white,
    backgroundColor2: COLORS.primary3,
    backgroundColor3: COLORS.additionalColor11,
    backgroundColor4: COLORS.white,
    backgroundColor5: COLORS.additionalColor13,
    backgroundColor6: COLORS.primary3,
    backgroundColor7: COLORS.white,
    backgroundColor8: COLORS.gray10,
    lineDivider: COLORS.gray20,
    borderColor1: COLORS.white,
    borderColor2: COLORS.black,
    textColor: COLORS.black,
    textColor2: COLORS.primary,
    textColor3: COLORS.gray80,
    textColor4: COLORS.white,
    textColor5: COLORS.black,
    textColor6: COLORS.gray,
    textColor7: COLORS.black,
    tintColor: COLORS.black,
    dotColor1: COLORS.gray20,
    dotColor2: COLORS.primary3,
};

export const selectedTheme = darkTheme;

const appTheme = { COLORS, SIZES, FONTS, darkTheme, lightTheme };

export default appTheme;
