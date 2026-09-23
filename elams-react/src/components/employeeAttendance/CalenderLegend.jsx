import React from 'react';
import { Box, Typography, Stack } from '@mui/material';

function CalendarLegend({markColors, markLabels}) {
  return (
    <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1, mt: 2 }}>
      <Typography variant="subtitle1" gutterBottom>
        Legend
      </Typography>
      <Stack direction="column" flexWrap="wrap" spacing={2}>
        {Object.keys(markColors).map((statusKey) => (
          <Box key={statusKey} sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              sx={{
                width: 14,
                height: 14,
                borderRadius: '50%',
                backgroundColor: markColors[statusKey],
                mr: 1,
              }}
            />
            <Typography variant="body2">{markLabels[statusKey]}</Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

export default CalendarLegend;