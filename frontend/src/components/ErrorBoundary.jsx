// filepath: f:\Product_Web_App\frontend\src\components\ErrorBoundary.jsx
import { Component } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box p={4} textAlign="center">
          <Heading>Something went wrong</Heading>
          <Text>Please try refreshing the page</Text>
        </Box>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;