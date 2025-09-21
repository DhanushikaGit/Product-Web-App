import { Box, Typography, Container } from "@mui/material";

function AddProduct() {
  return (
    <Container>
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Add New Product
        </Typography>
      </Box>
    </Container>
  );
}

export default AddProduct;