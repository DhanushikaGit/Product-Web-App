import { createContext, useState, useMemo } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue, red } from '@mui/material/colors'; // Import standard colors for reference

export const ThemeContext = createContext({
  mode: 'light',
  toggleMode: () => {},
});

// Define your custom dark theme constants
const CUSTOM_DARK_BACKGROUND = '#121212';
const CUSTOM_DARK_PAPER = '#1E1E1E';
const CUSTOM_ACCENT_BLUE = '#64B5F6';

export function ThemeContextProvider({ children }) {
  // Initialize mode based on your current setup (which is mostly dark-themed)
  const [mode, setMode] = useState('dark'); 

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? {
                // Light Palette (Default MUI look)
                primary: blue,
                secondary: red,
                background: {
                  default: '#f5f5f5', // Very light gray background
                  paper: 'white',
                },
                text: {
                  primary: '#333333',
                  secondary: '#666666',
                },
              }
            : {
                // Dark Palette (Your Custom Look)
                primary: {
                    main: CUSTOM_ACCENT_BLUE, // Use your light blue accent for primary button/focus
                },
                secondary: {
                    main: red[400], // Use a visible red for secondary/error actions
                },
                background: {
                  default: CUSTOM_DARK_BACKGROUND, // #121212 (Overall background)
                  paper: CUSTOM_DARK_PAPER,       // #1E1E1E (Cards/Forms Paper)
                },
                text: {
                  primary: '#ffffff', // White text
                  secondary: 'rgba(255, 255, 255, 0.7)', // Light gray text
                },
                divider: 'rgba(255, 255, 255, 0.12)', // Subtle light divider
              }),
        },
        // Optionally add a custom shape style for rounded corners across the app
        shape: {
          borderRadius: 12,
        },
        // Component overrides to ensure TextFields inherit the dark style correctly
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: {
                        // This helps ensure the input text color is white in dark mode
                        '& .MuiInputBase-input': {
                            color: mode === 'dark' ? '#ffffff' : '#333333',
                        },
                    },
                },
            },
        }
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}