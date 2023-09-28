import React, { useLayoutEffect, useState, useEffect } from "react";
import { auth_routes, routes } from "./routes";
import { Route, Routes, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
// Import scss
import "./assets/scss/theme.scss";

import { useSelector, useDispatch } from "react-redux";
import Layout from "./components/layout";
import { useNavigate } from "react-router-dom";
import {
  setAccessToken,
  setRefreshToken,
  setUserDetails,
} from "./store/authentication/Authentication";

const App = () => {
  const navigate = useNavigate();

  const userData = useSelector((state) => state.authentication.userdetails);

  const setpermission = useSelector((state) => state.permissions.setpermission);
  const [s_route, sets_route] = useState(auth_routes);
  const dispatch = useDispatch();

  // useLayoutEffect(() => {
  //   let data = routes;
  //   if (userData !== null) {
  //     if (userData?.is_onborded) {
  //       data.push(routes);
  //     } else {
  //       data = [
  //         {
  //           path: "/signin",
  //           element: <Navigate to="/ems/employee/UserStepForm" />,
  //         },
  //         ...data.filter((route) => route.path !== "/signin"),
  //       ];
  //     }
  //     sets_route(data);
  //   } else {
  //     sets_route(auth_routes);
  //   }
  // }, [userData]);

  useLayoutEffect(() => {
    if (userData != null && setpermission === true) {
      sets_route(routes);
    } else {
      sets_route(auth_routes);
    }
  }, [userData, setpermission]);

  useEffect(() => {
    if (!setpermission) {
      dispatch(setUserDetails(null));
      dispatch(setAccessToken(""));
      dispatch(setRefreshToken(""));
      navigate("/");
    }
  }, [setpermission]);

  // to loack Screen
  // to lock screen by clicking shift + L
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event) => {
      // if (event.key === 'L')
      // Window + Shift + L
      if (event.key === "L" && event.shiftKey && event.metaKey) {
        setIsDisabled(!isDisabled);
        document.body.style.pointerEvents = isDisabled ? "auto" : "none";
        document.onkeydown = isDisabled ? null : () => false;
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [isDisabled]);

  return (
    <>
      <Routes>
        {userData != null ? (
          <Route path="/" element={<Layout />}>
            {s_route.map((item, index) => {
              return (
                <Route path={item.path} element={item.element} key={index} />
              );
            })}
          </Route>
        ) : (
          <>
            {s_route.map((item, index) => {
              return (
                <Route path={item.path} element={item.element} key={index} />
              );
            })}
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
