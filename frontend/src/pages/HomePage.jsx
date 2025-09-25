import { Box, Typography } from "@mui/material";

function HomePage() {
  return (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant="h3" gutterBottom>
        Welcome to My Shop 🛍️
      </Typography>
      <Typography variant="h6" color="text.secondary">
        Manage products easily with Add, Edit, and Delete features.
      </Typography>
    </Box>
  );
}

export default HomePage;
