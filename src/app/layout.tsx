import { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "@/theme/theme";
import { TopNav } from "@/components/atoms/Navigation/TopNav";
import { BottomNav } from "@/components/atoms/Navigation/BottomNav";
export const metadata: Metadata = {
  title: {
    default: "Euclids Elements",
    template: "%s",
  },
  description: "A collection of Euclid's Elements in a tree format",
  icons: {
    icon: "/favicon.svg",
  },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <TopNav />
            {children}
            <BottomNav />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
