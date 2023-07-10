import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { selectCurrentUsersToken } from "../user/userSlice";
import {
  selectCategories,
  fetchCategories,
  deleteCategory,
  addCategory,
  selectAddCategoryError,
} from "./categorySlice";
import * as Yup from "yup";
import { useFormik } from "formik";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Snackbar from "@mui/material/Snackbar";
import Alert from "../../components/Alert";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const AlertRef = React.forwardRef(Alert);

function Categories() {
  const dispatch = useDispatch();
  const currentUserToken = useSelector(selectCurrentUsersToken);

  const categories = useSelector(selectCategories);

  const addCategoryError = useSelector(selectAddCategoryError);

  useEffect(() => {
    dispatch(fetchCategories(currentUserToken));
  }, [dispatch]);

  const removeCategory = (id) => {
    dispatch(
      deleteCategory({
        token: currentUserToken,
        id: id,
      })
    ).then(() => {
      dispatch(fetchCategories(currentUserToken));
    });
  };

  const formik = useFormik({
    initialValues: {
      newCategory: "",
    },

    onSubmit: (values) => {
      dispatch(
        addCategory({
          token: currentUserToken,
          category: { name: values.newCategory },
        })
      ).then(() => {
        dispatch(fetchCategories(currentUserToken));
        formik.setValues({
          newCategory: "",
        });
      });
    },
  });

  return (
    <Box sx={{ mt: "100px", width: "100%" }}>
      <Typography variant="h4" component="div" sx={{ flexGrow: 1, ml: 5 }}>
        Categories
      </Typography>
      <Container sx={{ py: 3 }} maxWidth="md">
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <TextField
              sx={{ width: "100%" }}
              margin="normal"
              id="newCategory"
              label="New category"
              name="newCategory"
              autoComplete="newCategory"
              autoFocus
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newCategory}
            />
            <IconButton
              type="submit"
              aria-label="add"
              size="large"
              sx={{ mt: 2, mb: 4 }}
            >
              <AddCircleIcon fontSize="inherit" />
            </IconButton>
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell component="th" scope="row">
                      {category.name}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        aria-label="delete"
                        size="large"
                        onClick={() => removeCategory(category.id)}
                      >
                        <DeleteIcon fontSize="inherit" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
      <Snackbar open={addCategoryError} autoHideDuration={6000}>
        <AlertRef severity="error" sx={{ width: "100%" }}>
          {addCategoryError}
        </AlertRef>
      </Snackbar>
    </Box>
  );
}

export default Categories;
