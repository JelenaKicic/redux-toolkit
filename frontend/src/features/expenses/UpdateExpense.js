import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import * as Yup from "yup";
import { useFormik } from "formik";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useNavigate, useParams } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import { selectCategories, fetchCategories } from "../categories/categorySlice";
import { selectCurrentUsersToken } from "../user/userSlice";
import {
  updateExpense,
  selectExpenseById,
  fetchExpenses,
} from "./expenseSlice";
import Button from "@mui/material/Button";

function UpdateExpense(props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const currentUserToken = useSelector(selectCurrentUsersToken);
  const categories = useSelector(selectCategories);

  const expense = useSelector((state) => {
    console.log(props);
    return selectExpenseById(state, id);
  });

  useEffect(() => {
    dispatch(fetchCategories(currentUserToken));
    dispatch(fetchExpenses(currentUserToken));
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      title: expense?.title || "",
      description: expense?.description || "",
      category: expense?.categoryId || "",
    },

    validationSchema: Yup.object({
      title: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
      category: Yup.string().required("Required"),
    }),

    onSubmit: (values) => {
      dispatch(
        updateExpense({
          token: currentUserToken,
          expense: {
            id: id,
            title: values.title,
            description: values.description,
            categoryId: values.category,
          },
        })
      ).then(() => {
        navigate("/");
      });
    },
  });

  return (
    <Box sx={{ mt: "100px", width: "100%" }}>
      <Typography variant="h4" component="div" sx={{ flexGrow: 1, ml: 5 }}>
        Update expense
      </Typography>
      <Container sx={{ py: 3 }} maxWidth="md">
        <Box
          component="form"
          noValidate
          onSubmit={formik.handleSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="title"
                required
                fullWidth
                id="title"
                label="Title"
                autoFocus
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
                helperText={
                  formik.errors.title &&
                  formik.touched.title &&
                  formik.errors.title
                }
                error={
                  formik.errors.title &&
                  formik.touched.title &&
                  formik.errors.title
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="description"
                required
                fullWidth
                id="description"
                label="Description"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
                helperText={
                  formik.errors.description &&
                  formik.touched.description &&
                  formik.errors.description
                }
                error={
                  formik.errors.description &&
                  formik.touched.description &&
                  formik.errors.description
                }
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Category
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  name="category"
                  label="Category"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.category}
                  error={
                    formik.errors.category &&
                    formik.touched.category &&
                    formik.errors.category
                  }
                  sx={{ width: "100%" }}
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {formik.errors.category &&
                    formik.touched.category &&
                    formik.errors.category}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Update
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default UpdateExpense;
