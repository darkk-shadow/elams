import { useTheme, useMediaQuery } from '@mui/material';

export default function useIsMobile() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  return {isMobile, isTablet};
}