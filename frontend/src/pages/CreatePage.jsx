import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  TextField,
  Button,
  Paper,
  Stack,
  Alert,
  useTheme, // <-- Import useTheme
} from "@mui/material";

const CreatePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
  });

  const [message, setMessage] = useState(null);
  const theme = useTheme(); // Access the current theme object

  // Use theme palette values instead of hardcoded colors
  const accentColor = theme.palette.primary.main;
  const primaryTextColor = theme.palette.text.primary;
  const secondaryTextColor = theme.palette.text.secondary;

  // Common styles for TextField, now relying entirely on theme colors
  const inputStyle = {
    // Styling the label and helper text
    '& .MuiInputLabel-root': { color: secondaryTextColor },
    // Styling the input area and border
    '& .MuiOutlinedInput-root': {
        borderRadius: 2,
        color: primaryTextColor,
        '& fieldset': {
            borderColor: theme.palette.divider,
        },
        '&:hover fieldset': {
            borderColor: secondaryTextColor,
        },
        // Highlight border with accent color when focused
        '&.Mui-focused fieldset': {
            borderColor: accentColor,
        },
    },
    // Styling for text when focused
    '& .MuiInputLabel-root.Mui-focused': {
      color: accentColor,
    },
  };

  // handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle form submit (omitted for brevity, assume it's correct)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.image) {
      setMessage({ type: "error", text: "Please fill in all fields" });
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          price: Number(formData.price),
          image: formData.image,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ type: "success", text: "Product created successfully!" });
        setFormData({ name: "", price: "", image: "" }); // clear form
      } else {
        setMessage({ type: "error", text: `Error: ${data.message || "Could not create product"}` });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Server error, try again later" });
    }
  };

  return (
    // Set the overall background to theme.palette.background.default (white in light mode)
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default', pt: 6, pb: 6 }}>
      <Container maxWidth="sm">
        <Box>
          <Typography 
            variant="h4" 
            gutterBottom
            sx={{ fontWeight: 700, mb: 4, color: primaryTextColor, textAlign: 'center' }}
          >
            Create New Product
          </Typography>

          <Paper 
            elevation={6} // Lowered elevation for a lighter feel
            sx={{ 
              p: 4, 
              borderRadius: 3, 
              // Paper background will automatically be white (light mode) or dark gray (dark mode)
              backgroundColor: 'background.paper', 
              color: primaryTextColor, // Text color automatically adjusts
              transition: "all 0.3s",
              "&:hover": { boxShadow: 12 },
            }}
          >
            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  label="Product Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  sx={inputStyle} // Use the theme-based input style
                />
                <TextField
                  label="Price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  sx={inputStyle}
                />
                <TextField
                  label="Image URL"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  sx={inputStyle}
                />
                <Button 
                  type="submit" 
                  variant="contained" 
                  size="large"
                  color="primary" // Use theme's primary color
                  sx={{
                    borderRadius: 2,
                    py: 1.5,
                    fontWeight: 600,
                  }}
                >
                  Create Product
                </Button>
              </Stack>
            </form>

            {/* Using MUI Alert component for modern notification */}
            {message && (
              <Alert
                severity={message.type}
                sx={{ mt: 3, borderRadius: 2, fontWeight: 500 }}
              >
                {message.text}
              </Alert>
            )}
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default CreatePage;