import { Box, Typography, Container } from '@mui/material';

function HomePage() {
  return (
    <Container>
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom>
          Welcome to Product Store
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Manage your products efficiently
        </Typography>
      </Box>
    </Container>
  );
}

export default HomePage;