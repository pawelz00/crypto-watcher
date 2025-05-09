import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    headerAppText: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    headerAppText?: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    headerAppText: true;
  }
}
