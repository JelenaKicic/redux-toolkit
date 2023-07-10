import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { selectExpensesByCategoryId, fetchExpenses } from "./expenseSlice";
import { selectCurrentUsersToken } from "../user/userSlice";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router-dom";
import ExpenseListItem from "./ExpenseListItem";
import { selectCategories, fetchCategories } from "../categories/categorySlice";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

function ExpenseList() {
  const dispatch = useDispatch();
  const currentUserToken = useSelector(selectCurrentUsersToken);
  let navigate = useNavigate();

  const [categoryId, setCategoryId] = useState(0);

  const categories = useSelector(selectCategories);
  const expenses = useSelector((state) =>
    selectExpensesByCategoryId(state, categoryId)
  );

  useEffect(() => {
    dispatch(fetchExpenses(currentUserToken));
    dispatch(fetchCategories(currentUserToken));
  }, [dispatch]);

  return (
    <Box sx={{ mt: "100px", width: "100%" }}>
      <Typography variant="h4" component="span" sx={{ flexGrow: 1, ml: 5 }}>
        Expenses
      </Typography>
      <IconButton
        type="submit"
        aria-label="add"
        size="large"
        sx={{ mt: 3, mb: 4 }}
        onClick={() => {
          navigate(`/add`);
        }}
      >
        <AddCircleIcon fontSize="inherit" />
      </IconButton>

      <Container sx={{ py: 3 }} maxWidth="md">
        <Grid item xs={{ width: "100%", alignItems: "right" }}>
          <FormControl sx={{ width: "25%" }}>
            <InputLabel id="demo-simple-select-standard-label">
              Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              name="category"
              label="Category"
              onChange={(event) => setCategoryId(event.target.value)}
              value={categoryId}
              sx={{ width: "100%" }}
            >
              <MenuItem value={0}>{"All"}</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Table aria-label="collapsible table">
          <TableBody>
            {expenses.map((expense) => {
              return <ExpenseListItem id={expense.id} key={expense.id} />;
            })}
          </TableBody>
        </Table>
      </Container>
    </Box>
  );
}

export default ExpenseList;
