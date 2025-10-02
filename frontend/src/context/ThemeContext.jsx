import React, { createContext, useState, useMemo } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// 1. Define the default context value
export const ThemeContext = createContext({ 
  mode: 'light',
  toggleMode: () => {} 
});

// 2. Define the context provider component
export function ThemeContextProvider({ children }) {
  // Use 'dark' as the initial mode since all your components were styled for dark mode
  const [mode, setMode] = useState('dark'); 

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  // Define your custom dark theme constants (based on your previous components)
  const CUSTOM_DARK_BACKGROUND = '#121212';
  const CUSTOM_DARK_PAPER = '#1E1E1E';
  const CUSTOM_ACCENT_BLUE = '#64B5F6'; // Your light blue accent

  // 3. Create the theme object, memoized based on the mode
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? {
                // Light Palette (Default MUI look)
                background: {
                  default: '#f5f5f5', 
                  paper: 'white',
                },
                primary: {
                    main: '#1976d2', // Default MUI blue
                },
              }
            : {
                // Dark Palette (Your Custom Look)
                primary: {
                    main: CUSTOM_ACCENT_BLUE, // Custom accent blue
                },
                background: {
                  default: CUSTOM_DARK_BACKGROUND, // Overall background
                  paper: CUSTOM_DARK_PAPER,       // Cards/Forms Paper
                },
                text: {
                  primary: '#ffffff', // White text
                  secondary: 'rgba(255, 255, 255, 0.7)', // Light gray secondary text
                },
              }),
        },
        // Global styling for consistency (e.g., rounded corners)
        shape: {
          borderRadius: 8,
        },
        // Override components to ensure full dark theme compatibility
        components: {
          MuiTextField: {
              styleOverrides: {
                  root: {
                      '& .MuiInputBase-input': {
                          color: mode === 'dark' ? '#ffffff' : undefined,
                      },
                  },
              },
          },
          MuiPaper: {
            defaultProps: {
              // Ensure default paper uses the theme background.paper for consistency
              elevation: 4, 
            },
          },
        }
      }),
    [mode]
  );

  // 4. Create the context value object, memoized to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      mode,
      toggleMode,
    }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}