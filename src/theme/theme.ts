"use client";

import { IBM_Plex_Mono, Source_Code_Pro } from "next/font/google";
import {
  createTheme,
  PaletteOptions,
  Shadows,
  TypographyVariantsOptions,
} from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface CommonColors {
    eggshell: string;
  }

  interface Palette {
    surface: {
      canvas: string;
      panel: string;
      elevated: string;
      overlay: string;
      scrim: string;
    };
    graph: {
      dependency: string;
      dependent: string;
      edge: string;
    };
  }

  interface PaletteOptions {
    surface?: Partial<Palette["surface"]>;
    graph?: Partial<Palette["graph"]>;
  }
}

declare module "@mui/material/Divider" {
  interface DividerPropsVariantOverrides {
    white: true;
    black: true;
  }
}

const source = Source_Code_Pro({
  weight: ["400", "500"],
  style: "normal",
  subsets: ["latin"],
});

const Ibm = IBM_Plex_Mono({
  weight: ["100", "200", "400", "500"],
  subsets: ["latin"],
});

const fontFamilies = {
  source: source.style.fontFamily,
  ibm: Ibm.style.fontFamily,
};

const colors = {
  canvas: "#111315",
  panel: "#191C1F",
  elevated: "#222629",
  border: "#303538",
  text: "#E8EAEC",
  muted: "#969DA3",
  accent: "#8CCFD0",
  accentHover: "#A5DEDE",
  eggshell: "#D8DEDC",
  white: "#F5F6F6",
  black: "#111315",
};

const palette: PaletteOptions = {
  mode: "dark",

  primary: {
    main: colors.accent,
    light: colors.accentHover,
    dark: "#548F91",
    contrastText: "#111719",
  },

  secondary: {
    main: "#B6BEC1",
    light: "#D4DADB",
    dark: "#858E92",
    contrastText: "#111315",
  },

  common: {
    white: colors.white,
    black: colors.black,
    eggshell: colors.eggshell,
  },

  text: {
    primary: colors.text,
    secondary: colors.muted,
    disabled: "#646C70",
  },

  background: {
    default: colors.canvas,
    paper: colors.panel,
  },

  divider: colors.border,

  surface: {
    canvas: colors.canvas,
    panel: colors.panel,
    elevated: colors.elevated,
    overlay: "rgba(25, 28, 31, 0.96)",
    scrim: "rgba(0, 0, 0, 0.55)",
  },

  info: {
    main: colors.accent,
  },

  success: {
    main: "#8DBDA5",
  },

  warning: {
    main: "#D5B77D",
  },

  error: {
    main: "#D98F91",
  },

  graph: {
    dependency: "#D5B77D",
    dependent: colors.accent,
    edge: "#596267",
  },
};

const typography: TypographyVariantsOptions = {
  fontFamily: fontFamilies.source,

  h1: {
    fontFamily: fontFamilies.source,
    fontSize: "clamp(2rem, 1.93vw + 1.61rem, 3.06rem)",
    fontWeight: 500,
    lineHeight: 1.15,
    letterSpacing: "-0.045em",
  },

  h2: {
    fontFamily: fontFamilies.source,
    fontSize: "clamp(1.5rem, 0.8vw + 1.2rem, 2rem)",
    fontWeight: 500,
    lineHeight: 1.25,
    letterSpacing: "-0.03em",
  },

  h3: {
    fontFamily: fontFamilies.source,
    fontSize: "1.25rem",
    fontWeight: 500,
    lineHeight: 1.4,
  },

  h4: {
    fontFamily: fontFamilies.source,
    fontSize: "1.125rem",
    fontWeight: 500,
  },

  body1: {
    fontFamily: fontFamilies.source,
    fontSize: "0.9375rem",
    lineHeight: 1.7,
  },

  body2: {
    fontFamily: fontFamilies.source,
    fontSize: "0.875rem",
    lineHeight: 1.65,
  },

  button: {
    fontFamily: fontFamilies.source,
    fontSize: "0.875rem",
    fontWeight: 500,
    textTransform: "none",
  },

  caption: {
    fontFamily: fontFamilies.ibm,
    fontSize: "0.7rem",
    lineHeight: 1.5,
    letterSpacing: "0.02em",
  },

  overline: {
    fontFamily: fontFamilies.ibm,
    fontSize: "0.65rem",
    fontWeight: 500,
    letterSpacing: "0.1em",
  },
};

const shadows: Shadows = Array.from({ length: 25 }, (_, elevation) => {
  if (elevation === 0) return "none";

  return `0px ${elevation}px ${elevation * 3}px rgba(0, 0, 0, ${Math.min(
    0.04 + elevation * 0.008,
    0.12,
  )})`;
}) as Shadows;

export const theme = createTheme({
  palette,
  typography,
  shadows,

  shape: {
    borderRadius: 10,
  },

  spacing: 8,

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          height: "100%",
          scrollBehavior: "smooth",
        },

        body: {
          minHeight: "100%",
          backgroundColor: colors.canvas,
          color: colors.text,
          fontSynthesis: "none",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        },

        "*, *::before, *::after": {
          boxSizing: "border-box",
        },

        "::selection": {
          backgroundColor: "rgba(140, 207, 208, 0.25)",
          color: colors.white,
        },

        "*:focus-visible": {
          outline: `2px solid ${colors.accent}`,
          outlineOffset: 3,
        },
      },
    },

    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },

      styleOverrides: {
        root: {
          minHeight: 38,
          padding: "8px 16px",
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 500,
          transition: "background-color 150ms ease, border-color 150ms ease",
        },

        outlined: {
          borderColor: colors.border,
          "&:hover": {
            borderColor: colors.muted,
            backgroundColor: "rgba(255,255,255,0.03)",
          },
        },
      },
    },

    MuiIconButton: {
      defaultProps: {
        disableRipple: true,
      },

      styleOverrides: {
        root: {
          border: `1px solid ${colors.border}`,
          borderRadius: 8,
          color: colors.muted,
          transition: "all 150ms ease",

          "&:hover": {
            color: colors.text,
            backgroundColor: colors.elevated,
            borderColor: "#485054",
          },
        },
      },
    },

    MuiSlider: {
      styleOverrides: {
        root: {
          color: colors.accent,
        },

        rail: {
          opacity: 1,
          backgroundColor: colors.border,
        },

        track: {
          border: "none",
        },

        thumb: {
          width: 14,
          height: 14,
          boxShadow: "none",
          border: `2px solid ${colors.canvas}`,
          "&:hover, &.Mui-focusVisible": {
            boxShadow: "0 0 0 5px rgba(140, 207, 208, 0.15)",
          },
        },
      },
    },

    MuiListItem: {
      styleOverrides: {
        root: {
          minHeight: 0,
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: colors.panel,
          border: `1px solid ${colors.border}`,
          borderRadius: 12,
          boxShadow: "none",
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          border: `1px solid ${colors.border}`,
          borderRadius: 12,
          boxShadow: "none",
          transition: "border-color 150ms ease",

          "&:hover": {
            borderColor: "#485054",
          },
        },
      },
    },

    MuiTypography: {
      styleOverrides: {
        root: {
          overflowWrap: "break-word",
        },
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: colors.border,
        },
      },

      variants: [
        {
          props: { variant: "white" },
          style: {
            borderColor: colors.white,
          },
        },
        {
          props: { variant: "black" },
          style: {
            borderColor: colors.black,
          },
        },
      ],
    },

    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: colors.muted,
          padding: 8,

          "&.Mui-checked": {
            color: colors.accent,
          },

          "&:hover": {
            backgroundColor: "rgba(140, 207, 208, 0.06)",
          },
        },
      },
    },

    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: colors.panel,
          borderTop: `1px solid ${colors.border}`,
        },
      },
    },

    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          minWidth: 64,
          color: colors.muted,
          borderRadius: 8,
          transition: "color 150ms ease",

          "&.Mui-selected": {
            color: colors.accent,
          },

          "&:hover": {
            backgroundColor: "rgba(255,255,255,0.025)",
          },
        },

        label: {
          fontFamily: fontFamilies.source,
          fontSize: "0.7rem",

          "&.Mui-selected": {
            fontSize: "0.7rem",
          },
        },
      },
    },

    MuiLink: {
      defaultProps: {
        color: "primary",
        underline: "none",
      },

      styleOverrides: {
        root: {
          fontWeight: 500,
          transition: "color 150ms ease",

          "&:hover": {
            color: colors.accentHover,
          },
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: colors.canvas,
          borderRadius: 8,
          fontFamily: fontFamilies.source,
          transition: "border-color 150ms ease",

          "& fieldset": {
            borderColor: colors.border,
            transition: "border-color 150ms ease",
          },

          "&:hover fieldset": {
            borderColor: "#596267",
          },

          "&.Mui-focused fieldset": {
            borderColor: colors.accent,
            borderWidth: "1px",
          },

          "& input": {
            padding: "11px 14px",
            color: colors.text,
            fontFamily: fontFamilies.source,
            fontSize: "0.875rem",

            "&::placeholder": {
              color: colors.muted,
              opacity: 0.8,
            },
          },

          "& input:-webkit-autofill": {
            WebkitBoxShadow: `0 0 0 100px ${colors.canvas} inset`,
            WebkitTextFillColor: colors.text,
            caretColor: colors.text,
          },
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: colors.muted,
          "&.Mui-focused": {
            color: colors.accent,
          },
        },
      },
    },

    MuiSelect: {
      styleOverrides: {
        icon: {
          color: colors.muted,
        },
      },
    },

    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: colors.elevated,
          border: `1px solid ${colors.border}`,
          borderRadius: 10,
          marginTop: 4,
        },
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: "0.875rem",
          borderRadius: 6,
          margin: "2px 4px",

          "&.Mui-selected": {
            backgroundColor: "rgba(140, 207, 208, 0.1)",
            color: colors.accent,
          },
        },
      },
    },

    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: 4,
          borderRadius: 4,
          backgroundColor: colors.border,
          overflow: "hidden",
        },

        bar: {
          borderRadius: 4,
          backgroundColor: colors.accent,
        },
      },
    },

    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: colors.elevated,
          border: `1px solid ${colors.border}`,
          color: colors.text,
          fontSize: "0.75rem",
          borderRadius: 6,
          boxShadow: "none",
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          height: 26,
          borderRadius: 6,
          fontFamily: fontFamilies.source,
          fontSize: "0.75rem",
          backgroundColor: colors.elevated,
          border: `1px solid ${colors.border}`,
        },

        label: {
          paddingLeft: 9,
          paddingRight: 9,
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: colors.border,
          padding: "12px 16px",
          fontSize: "0.875rem",
        },

        head: {
          color: colors.muted,
          fontFamily: fontFamilies.ibm,
          fontSize: "0.7rem",
          fontWeight: 500,
          letterSpacing: "0.04em",
        },
      },
    },

    MuiSwitch: {
      styleOverrides: {
        track: {
          backgroundColor: colors.border,
          opacity: 1,
        },

        thumb: {
          boxShadow: "none",
        },

        switchBase: {
          "&.Mui-checked + .MuiSwitch-track": {
            backgroundColor: colors.accent,
            opacity: 0.7,
          },
        },
      },
    },
  },
});
