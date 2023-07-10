import React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  selectExpenseById,
  deleteExpense,
  fetchExpenses,
} from "./expenseSlice";
import Button from "@mui/material/Button";
import { selectCurrentUsersToken } from "../user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ExpenseListItem(props) {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const expense = useSelector((state) => selectExpenseById(state, props.id));
  const currentUserToken = useSelector(selectCurrentUsersToken);

  const [open, setOpen] = React.useState(false);

  const removeExpense = () => {
    dispatch(
      deleteExpense({
        token: currentUserToken,
        id: expense.id,
      })
    ).then(() => {
      dispatch(fetchExpenses(currentUserToken));
    });
  };

  return (
    <React.Fragment>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" }, flexGrow: 1, width: "100%" }}
      >
        <TableCell
          component="th"
          scope="row"
          sx={{ flexGrow: 1, width: "100%" }}
        >
          {expense.title}
        </TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                {expense.description}
              </Typography>
              <Button
                variant="outlined"
                sx={{ mt: 3, mb: 2 }}
                onClick={removeExpense}
              >
                Delete
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  navigate(`/update/${expense.id}`);
                }}
                sx={{ mt: 3, mb: 2, ml: 2 }}
              >
                Update
              </Button>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default ExpenseListItem;
