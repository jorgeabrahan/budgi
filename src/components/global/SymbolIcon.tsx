import { type SvgIconProps } from "@mui/material";

type SymbolIconProps = {
  name: string;
  size?: string;
} & SvgIconProps;

export const SymbolIcon = ({ name, size = "24px" }: SymbolIconProps) => (
  <span className="material-symbols-outlined" style={{ fontSize: size }}>
    {name}
  </span>
);
