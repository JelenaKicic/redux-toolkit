import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import {
  selectCurrentUser,
  loadUserFromLocalStorage,
  selectStatus,
} from "../features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../components/Loading";

const PrivateRoute = ({ children }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const loadingStatus = useSelector(selectStatus);

  useEffect(() => {
    dispatch(loadUserFromLocalStorage());
  }, [dispatch]);

  if (loadingStatus == "idle" || loadingStatus == "loading") return <Loading />;

  return currentUser && currentUser.token ? (
    children
  ) : (
    <Navigate to="/signin" />
  );
};

export default PrivateRoute;
