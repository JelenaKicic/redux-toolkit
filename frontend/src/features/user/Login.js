import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
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
import { selectUserManagmentError, login } from "./userSlice";
import {
  selectCurrentUsersToken,
  loadUserFromLocalStorage,
  selectStatus,
} from "../user/userSlice";
import { Navigate } from "react-router-dom";
import Loading from "../../components/Loading";

const AlertRef = React.forwardRef(Alert);

function Login() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const currentUserToken = useSelector(selectCurrentUsersToken);

  const error = useSelector(selectUserManagmentError);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    validationSchema: Yup.object({
      username: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    }),

    onSubmit: (values) => {
      dispatch(login(values)).then((response) => {
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
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
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
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container justifyContent="flex-end">
            <Link component={RouterLink} variant="body2" to="/signup">
              {"Don't have an account? Sign Up"}
            </Link>
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

export default Login;
