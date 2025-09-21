import { Box, Typography, Container } from '@mui/material';

function Products() {
  return (
    <Container>
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Products
        </Typography>
      </Box>
    </Container>
  );
}

export default Products;