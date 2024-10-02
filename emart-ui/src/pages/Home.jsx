import { Box, Button, Stack } from "@mui/material";
import Header from "../component/Header";
import { useNavigate } from "react-router-dom";
import ProductCard from "../component/ProductCard";

const Home = () => {
 
  const navigate = useNavigate();
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
      <Header />
          <Stack >
            </Stack>      
            <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          navigate("/add-product");
        }}
      >
        Add Product
      </Button>
      <Box
        sx={{
          margin: "5rem 0",
          display: "flex",
          flexWrap: "wrap",
          gap: "3rem",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </Box>
    </Box>
    
  );
};

export default Home;