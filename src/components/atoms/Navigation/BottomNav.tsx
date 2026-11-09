"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Box, Container, Tab, Tabs, Typography } from "@mui/material";

import { pageRoutes } from "@/utils/routes";

const BOOK_COUNT = 13;
const tabs = Array.from({ length: BOOK_COUNT }, (_, index) => {
  const bookNumber = index + 1;
  return {
    label: `Book ${bookNumber}`,
    href: pageRoutes.book(bookNumber),
  };
});

export const BottomNav = () => {
  const pathname = usePathname();
  const activeIndex = tabs.findIndex((tab) => pathname === tab.href);

  return (
    <Box
      component="nav"
      sx={{
        position: "sticky",
        bottom: 0,
        bgcolor: "background.paper",
        borderTop: 1,
        borderColor: "divider",
        zIndex: (theme) => theme.zIndex.appBar,
      }}
      aria-label="Books navigation"
    >
      <Container maxWidth="lg" disableGutters>
        <Tabs
          value={activeIndex === -1 ? false : activeIndex}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            minHeight: 64,
            "& .MuiTabs-indicator": {
              backgroundColor: "primary.main",
            },
            "& .MuiTab-root": {
              minHeight: 64,
              minWidth: 96,
              color: "text.secondary",
              textTransform: "none",
              fontWeight: 500,
              "&.Mui-selected": {
                color: "primary.main",
              },
            },
          }}
        >
          {tabs.map(({ label, href }, index) => {
            return (
              <Tab
                key={href}
                value={index}
                label={<Typography variant="caption">{label}</Typography>}
                component={Link}
                href={href}
              />
            );
          })}
        </Tabs>
      </Container>
    </Box>
  );
};
