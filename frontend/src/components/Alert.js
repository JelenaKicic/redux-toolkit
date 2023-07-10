import MuiAlert from "@mui/material/Alert";

function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
}

export default Alert;
