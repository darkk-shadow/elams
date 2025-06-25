import { Button } from '@mui/material';
import React from 'react';
import CreditCardOffIcon from '@mui/icons-material/CreditCardOff';

const ApplyLeaveButton = () => {
  return (
    <Button
      variant="outlined"
      sx={{
        borderRadius: '2em',
        borderWidth: 1,
        borderColor: '#222',
        px: 3,
        py: 1,
        fontWeight: 500,
        fontSize: 18,
        textTransform: 'none',
        boxShadow: 'none',
        color: '#222',
        gap: 1.5,
        minWidth: 0,
        minHeight: 0,
      }}
      startIcon={<CreditCardOffIcon sx={{ fontSize: 28, color: '#222' }} />}
    >
      Apply Leave
    </Button>
  );
};

export default ApplyLeaveButton;
