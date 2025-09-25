import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Container,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";

function EditProduct() {
  const { id } = useParams(); // get product id from URL
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  const [loading, setLoading] = useState(true);

  // ✅ Fetch product by ID
  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  // ✅ Handle input change
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submit (update product)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      navigate("/products"); // redirect after update
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };

  if (loading) {
    return (
      <Container sx={{ py: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Edit Product
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Product Name"
            name="name"
            value={product.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            value={product.price}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Image URL"
            name="image"
            value={product.image}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <Box sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              Update
            </Button>
            <Button
              sx={{ ml: 2 }}
              variant="outlined"
              onClick={() => navigate("/products")}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
}

export default EditProduct;
