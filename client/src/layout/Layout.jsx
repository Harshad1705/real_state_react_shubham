import React, { useContext, useEffect } from "react";
import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import UserDetailContext from "../context/userDetailContext.js";
import { useMutation } from "react-query";
import { createUser } from "../utils/api.js";
// import { createUser } from "../../utils/api.js";

const Layout = () => {
  const { isAuthenticated, user, getAccessTokenWithPopup } = useAuth0();
  const { setUserDetails } = useContext(UserDetailContext);

  const { mutate } = useMutation({
    mutationKey: [user?.email],
    mutationFn: () => createUser(user?.email),
  });

  useEffect(() => {
    // const getTokenAndRegister = async () => {
    //   const res = await getAccessTokenWithPopup({
    //     authorizationParams: {
    //       audience: "http://localhost:5000",
    //       scope: "openid profile email",
    //     },
    //   });
    //   localStorage.setItem("access_token", res);
    //   setUserDetails((prev) => ({ ...prev, token: res }));
    //   console.log(res.access_token);
    //   mutate(res);
    // };

    isAuthenticated && mutate();
  }, [isAuthenticated]);

  return (
    <>
      <div style={{ background: "var(--black)", overflow: "hidden" }}>
        <Header />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
