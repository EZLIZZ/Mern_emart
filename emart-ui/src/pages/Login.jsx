import {
    Button,
    CircularProgress,
    FormControl,
    FormHelperText,
    Stack,
    TextField,
    Typography,
  } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
  import { Formik } from "formik";
  import React from "react";
import { Link , useNavigate } from "react-router-dom";
  import * as Yup from "yup";
import axiosInstance from "../lib/axios.instance";
  
  const Login = () => {
    const navigate = useNavigate();
    const {isPending, mutate } = useMutation({
      mutationKey:["login-user"],
      mutationFn: async(values)=>{
        return await axiosInstance.post("/user/login", values);
      },
      onSuccess:(res)=>{
      const firstName = res?.data?.userDetail?.firstName;
      const accessToken = res?.data?.accessToken;

      localStorage.setItem("firstName",firstName);
      localStorage.setItem("accessToken",accessToken);

      navigate("/");

      },
      onError:(error) => {
       console.log(error.response.data.message);
      },
    });

    if (isPending){
      return <CircularProgress />;
    }
    return (
      <>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Must be a valid email.")
              .lowercase()
              .max(55, "Email must be at max 55 characters.")
              .required("Email is required.")
              .trim(),
            password: Yup.string().trim().required("Password is required."),
          })}
          onSubmit={(values) => {
            console.log(values);
            mutate(values);
          }}
        >
          {(formik) => (
            <form
              onSubmit={formik.handleSubmit}
              style={{
                background: "linear-gradient(to top, #c471f5 0%, #fa71cd 100%)",
                borderRadius:"10px",
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
                padding: "1rem",
                minWidth: "400px",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              }}
            >
              <Typography variant="h5">Sign in</Typography>
  
              <FormControl fullWidth>
                <TextField label="Email" {...formik.getFieldProps("email")} />
  
                {formik.touched.email && formik.errors.email ? (
                  <FormHelperText error>{formik.errors.email}</FormHelperText>
                ) : null}
              </FormControl>
  
              <FormControl fullWidth>
                <TextField
                  label="Password"
                  {...formik.getFieldProps("password")}
                />
  
                {formik.touched.password && formik.errors.password ? (
                  <FormHelperText error>{formik.errors.password}</FormHelperText>
                ) : null}
              </FormControl>
  
              <Stack
              sx={{
                width: "100%",
                gap: "10px",
                alignItems:"center",
              }}
            >
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="success"
              >
                Login
              </Button>
              <Link to={"/register"}
              >New User? Register</Link>
            </Stack>
            </form>
          )}
        </Formik>
      </>
    );
  };
  
  export default Login;