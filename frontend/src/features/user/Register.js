import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link as RouterLink } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "../../components/Alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { selectUserManagmentError, register } from "./userSlice";
import {
  selectCurrentUsersToken,
  loadUserFromLocalStorage,
  selectStatus,
} from "../user/userSlice";
import { Navigate } from "react-router-dom";
import Loading from "../../components/Loading";

const AlertRef = React.forwardRef(Alert);

function Register() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const currentUserToken = useSelector(selectCurrentUsersToken);

  const error = useSelector(selectUserManagmentError);

  const formik = useFormik({
    initialValues: {
      username: "",
      firstName: "",
      lastName: "",
      password: "",
    },

    validationSchema: Yup.object({
      username: Yup.string().required("Required"),
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    }),

    onSubmit: (values) => {
      dispatch(
        register({
          username: values.username,
          name: values.firstName,
          surname: values.lastName,
          password: values.password,
        })
      ).then((response) => {
        localStorage.setItem("userInfo", JSON.stringify(response?.payload));
        navigate("/");
      });
    },
  });

  const loadingStatus = useSelector(selectStatus);

  useEffect(() => {
    dispatch(loadUserFromLocalStorage());
  }, [dispatch]);

  if (loadingStatus == "idle" || loadingStatus == "loading") return <Loading />;

  if (currentUserToken != null) return <Navigate to="/" />;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={formik.handleSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
                helperText={
                  formik.errors.firstName &&
                  formik.touched.firstName &&
                  formik.errors.firstName
                }
                error={
                  formik.errors.firstName &&
                  formik.touched.firstName &&
                  formik.errors.firstName
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
                helperText={
                  formik.errors.lastName &&
                  formik.touched.lastName &&
                  formik.errors.lastName
                }
                error={
                  formik.errors.lastName &&
                  formik.touched.lastName &&
                  formik.errors.lastName
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                helperText={
                  formik.errors.username &&
                  formik.touched.username &&
                  formik.errors.username
                }
                error={
                  formik.errors.username &&
                  formik.touched.username &&
                  formik.errors.username
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                helperText={
                  formik.errors.password &&
                  formik.touched.password &&
                  formik.errors.password
                }
                error={
                  formik.errors.password &&
                  formik.touched.password &&
                  formik.errors.password
                }
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} variant="body2" to="/signin">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Snackbar open={error} autoHideDuration={6000}>
        <AlertRef severity="error" sx={{ width: "100%" }}>
          {error}
        </AlertRef>
      </Snackbar>
    </Container>
  );
}

export default Register;
