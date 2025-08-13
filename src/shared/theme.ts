// shared/ts

const lightTheme = {
  background: '#FFFFFF',
  headerBackground: '#212529',
  text: '#000000',
  overlay: 'rgba(0,0,0,0.6)',
  primary: '#000000',
};

const darkTheme = {
  background: '#121212',
  headerBackground: '#FFFFFF',
  text: '#FFFFFF',
  overlay: 'rgba(255,255,255,0.1)',
  primary: '#FFFFFF',
};

const primaryColor = '#1e828c';
const secondaryColor = '#ff9800';

const colors = {
  backgroundColor: primaryColor,
  primaryDark: "#0097a7",
  secondary: secondaryColor,
  background: "#ffffff",
  surface: "#f5f5f5",
  textPrimary: "#212121",
  textSecondary: "#757575",
  textLight: "#ffffff",
  buttonPrimary: primaryColor,
};

const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

const radius = {
  sm: 4,
  md: 8,
  lg: 16,
};

const card = {
  card: {
    // marginBottom: spacing.md,
    paddingBottom: spacing.sm,
    flex: 1,
    // height: 2000,
    // backgroundColor: colors.surface,
    // borderBottomEndRadius: radius.sm,
    borderRadius: radius.md,
    borderColor: colors.textSecondary,
    borderWidth: 0.5,
    color: colors.buttonPrimary,
    // borderColor: colors.buttonPrimary,
    // padding: spacing.sm,
        // shadow for iOS
    // shadowColor: "#000",
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // shadowOffset: { width: 0, height: 2 },

    // shadow for Android
    // elevation: 2,
  },
  header: {
    backgroundColor: colors.backgroundColor,
    borderTopLeftRadius: radius.sm,
    borderTopRightRadius: radius.sm,
    padding: spacing.sm,
    // borderTopWidth: 1,
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    // borderColor: '#000',
    // marginBottom: spacing.sm,
  },
  title: { color: colors.textLight, fontSize: 16, fontWeight: "bold"  as const, includeFontPadding: false},
  
}
export const theme = {
  colors,
  spacing,
  radius,
  darkTheme,
  lightTheme,
  card,
} as const;

export type Theme = typeof theme;
