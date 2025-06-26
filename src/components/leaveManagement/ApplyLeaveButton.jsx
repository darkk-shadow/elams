import { Button } from '@mui/material';
import React from 'react';
import CreditCardOffIcon from '@mui/icons-material/CreditCardOff';
import { useTheme } from '@mui/material/styles';

const ApplyLeaveButton = (props) => {
  const theme = useTheme();
  return (
    <Button
      variant="outlined"
      sx={{
        borderRadius: '2em',
        borderWidth: 1,
        borderColor: theme.palette.divider,
        px: 3,
        py: 1,
        fontWeight: 500,
        fontSize: 18,
        textTransform: 'none',
        boxShadow: 'none',
        color: theme.palette.text.primary,
        gap: 1.5,
        minWidth: 0,
        minHeight: 0,
        background: theme.palette.background.default,
      }}
      startIcon={<CreditCardOffIcon sx={{ fontSize: 28, color: theme.palette.text.primary }} />}
      {...props}
    >
      Apply Leave
    </Button>
  );
};

export default ApplyLeaveButton;
