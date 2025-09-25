import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  TextField,
  Button,
  Paper,
  Stack,
} from "@mui/material";

const CreatePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
  });

  const [message, setMessage] = useState("");

  // handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.image) {
      setMessage("⚠️ Please fill in all fields");
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
        setMessage("✅ Product created successfully!");
        setFormData({ name: "", price: "", image: "" }); // clear form
      } else {
        setMessage(`❌ Error: ${data.message}`);
      }
    } catch (error) {
      setMessage("❌ Server error, try again later");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Create New Product
        </Typography>

        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                label="Product Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Image URL"
                name="image"
                value={formData.image}
                onChange={handleChange}
                fullWidth
              />
              <Button type="submit" variant="contained" color="primary">
                Create Product
              </Button>
            </Stack>
          </form>

          {message && (
            <Typography
              variant="body1"
              color={message.includes("✅") ? "green" : "red"}
              sx={{ mt: 2 }}
            >
              {message}
            </Typography>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default CreatePage;
