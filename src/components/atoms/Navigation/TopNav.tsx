"use client";
import { alpha, Container, Stack, Typography } from "@mui/material";

export const TopNav = () => {
  return (
    <Stack
      component="nav"
      sx={(theme) => ({
        position: "sticky",
        top: 0,
        zIndex: 1000,
        height: 30,
        bgcolor: "primary.dark",
        borderBottom: `1px solid ${alpha(theme.palette.common.black, 0.15)}`,
        boxShadow: `0 1px 0 ${alpha(theme.palette.common.white, 0.06)} inset`,
      })}
    >
      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <Typography variant="h6" color="white">
          Euclid's Elements
        </Typography>
      </Container>
    </Stack>
  );
};
