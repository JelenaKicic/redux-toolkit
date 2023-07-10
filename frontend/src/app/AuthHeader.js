export default function authHeader(props) {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };

  if (props?.token) {
    headers.Authorization = "Bearer " + props.token;
  }

  return headers;
}
