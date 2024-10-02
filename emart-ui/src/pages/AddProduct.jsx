import { Formik } from "formik";
import React from "react";
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { productCategories } from "../constants/general.constant";
import productSchema from "../schema/product.schema";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../lib/axios.instance";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
  const {isPending , mutate }= useMutation ({
    mutationKey : ["add-product"],
    mutationFn : async(values)=> {
      return await axiosInstance.post("/product/add",values);
    },
    onSuccess:() =>{
      navigate("/");
    },
    onError:(error)=>{
      console.log(error.response.data.message);
    },
    });
    if (isPending){
      return <CircularProgress />;
    }
  
  return (
    <Formik
      initialValues={{
        name: "",
        brand: "",
        price: 0,
        quantity: 1,
        category: "",
        description: "",
        hasFreeShipping: false,
      }}
      validationSchema={productSchema}
      onSubmit={(values) => {
        console.log(values);
        mutate(values);
      }}
    >
      {(formik) => {
        return (
          <form
            onSubmit={formik.handleSubmit}
            cons
            style={{
              background: "linear-gradient(to top, #c471f5 0%, #fa71cd 100%)",
              borderRadius:"20px",
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              padding: "1rem",
              minWidth: "400px",
              justifyContent: "center",
              alignItems: "center",
              color:"white",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
             
            }}
          >
            <Typography variant="h4">Add Product</Typography>

            <FormControl fullWidth>
              <TextField
                required
                label="Name"
                {...formik.getFieldProps("name")}
              />

              {formik.touched.name && formik.errors.name ? (
                <FormHelperText error>{formik.errors.name}</FormHelperText>
              ) : null}
            </FormControl>

            <FormControl fullWidth>
              <TextField
                required
                label="Brand"
                {...formik.getFieldProps("brand")}
              />

              {formik.touched.brand && formik.errors.brand ? (
                <FormHelperText error>{formik.errors.brand}</FormHelperText>
              ) : null}
            </FormControl>

            <FormControl fullWidth>
              <TextField
                required
                type="number"
                label="Price"
                {...formik.getFieldProps("price")}
              />

              {formik.touched.price && formik.errors.price ? (
                <FormHelperText error>{formik.errors.price}</FormHelperText>
              ) : null}
            </FormControl>

            <FormControl fullWidth>
              <TextField
                required
                type="number"
                label="Quantity"
                {...formik.getFieldProps("quantity")}
              />

              {formik.touched.quantity && formik.errors.quantity ? (
                <FormHelperText error>{formik.errors.quantity}</FormHelperText>
              ) : null}
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select label="Category" {...formik.getFieldProps("category")}>
                {productCategories.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <FormControl
              fullWidth
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography>Free shipping</Typography>
              <Checkbox {...formik.getFieldProps("hasFreeShipping")} />
            </FormControl>

            <FormControl fullWidth>
              <TextField
                multiline
                rows={7}
                required
                label="Description"
                {...formik.getFieldProps("description")}
              />

              {formik.touched.description && formik.errors.description ? (
                <FormHelperText error>
                  {formik.errors.description}
                </FormHelperText>
              ) : null}
            </FormControl>

            <Button fullWidth type="submit" variant="contained" color="success">
              submit
            </Button>
          </form>
        );
      }}
    </Formik>
  );
};

export default AddProduct;