// src/types/mui.d.ts
declare module '@mui/material/Unstable_Grid2' {
  import { ComponentType } from 'react';
  import { SxProps, Theme } from '@mui/material/styles';
  
  interface Grid2Props {
    children?: React.ReactNode;
    sx?: SxProps<Theme>;
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    container?: boolean;
    spacing?: number | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number };
  }
  
  const Grid2: ComponentType<Grid2Props>;
  export default Grid2;
}