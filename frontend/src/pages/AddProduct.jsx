import { useState } from "react";
import {
  Box,
  Typography,
  Container,
  TextField,
  Button,
  Paper,
  Stack,
  Alert,
} from "@mui/material";

function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
        setMessage({ type: "success", text: "Product added successfully!" });
        setFormData({ name: "", price: "", image: "" });
      } else {
        setMessage({ type: "error", text: data.message || "Error adding product" });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Server error, try again later" });
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 6 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ textAlign: "center", fontWeight: 700, mb: 4 }}
        >
          Add New Product
        </Typography>

        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 3,
            backgroundColor: "#f9f9f9",
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
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />
              <TextField
                label="Price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />
              <TextField
                label="Image URL"
                name="image"
                value={formData.image}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />

              <Button
                variant="contained"
                size="large"
                color="primary"
                type="submit"
                sx={{
                  borderRadius: 2,
                  py: 1.5,
                  fontWeight: 600,
                  "&:hover": { backgroundColor: "#1976d2" },
                }}
              >
                Add Product
              </Button>
            </Stack>
          </form>

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
  );
}

export default AddProduct;
