import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { Box, Typography, Switch, FormControlLabel } from '@mui/material';

const ThemeSwitcher = () => {
  const { theme, toggleMode } = useContext(ThemeContext);

  const handleToggle = () => {
    toggleMode();
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', padding: '8px 16px' }}>
      <Typography variant="body1" sx={{ marginRight: 2 }}>
        {theme.mode === 'light' ? 'Light Mode' : 'Dark Mode'}
      </Typography>
      <FormControlLabel
        control={
          <Switch
            checked={theme.mode === 'dark'}
            onChange={handleToggle}
            color="primary"
          />
        }
        label=""
      />
    </Box>
  );
};

export default ThemeSwitcher;
