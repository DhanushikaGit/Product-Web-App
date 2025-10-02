import { Box } from "@mui/material"; // Removed Container
import { Routes, Route } from "react-router-dom";

// Import the Theme Context Provider
import { ThemeContextProvider } from './context/ThemeContext'; 

// Import all components
import Navbar from "./components/Navbar";
import Home from "./pages/HomePage";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";

function App() {
  return (
    // 1. Wrap the entire app with the ThemeContextProvider
    <ThemeContextProvider>
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        
        <Navbar />
        
        {/* 2. Removed the outer <Container> and its padding (<Container sx={{ py: 4 }}>) 
             because each page component (Home, Products, etc.) now handles 
             its own dark background and internal spacing for consistency.
             The main Box structure is sufficient. 
        */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
        </Routes>
        
      </Box>
    </ThemeContextProvider>
  );
}

export default App;