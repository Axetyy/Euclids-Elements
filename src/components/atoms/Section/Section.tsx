"use client";
import { Container, ContainerProps, Stack } from "@mui/material";
import { ReactNode, useMemo } from "react";
import { SectionVariant } from "./type";

interface SectionProps {
  variant?: SectionVariant;
  maxWidth?: ContainerProps["maxWidth"];
  children?: ReactNode;
}

export const Section: React.FC<SectionProps> = ({
  variant = SectionVariant.Light,
  maxWidth = "md",
  children,
}) => {
  const backgroundStyle = useMemo(() => {
    switch (variant) {
      case SectionVariant.Dark:
        return {
          backgroundColor: "primary.main",
        };
      case SectionVariant.Light:
        return {
          backgroundColor: "primary.light",
        };
      case SectionVariant.Inherit:
        return {
          backgroundColor: "transparent",
        };
    }
  }, [variant]);

  return (
    <Stack
      sx={{
        flex: 1,
        ...backgroundStyle,
      }}
    >
      <Container
        maxWidth={maxWidth}
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          padding: "20px",
        }}
      >
        {children}
      </Container>
    </Stack>
  );
};
