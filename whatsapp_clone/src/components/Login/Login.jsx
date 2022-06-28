import { Button } from "@material-ui/core";
import React from "react";
import "./Login.css";
import {useAuth0} from '@auth0/auth0-react'


function Login() {

  const {user,
    isAuthenticated,
    loginWithRedirect,
    logout,} = useAuth0();

  // const domain = process.env.AUTH0_DOMAIN;
  // const clientId = process.env.AUTH0_CLIENT_ID;


  // const signIn = async (e) =>  {
  //   e.preventDefault();
  //  await loginWithRedirect();
  //  console.log(user);
  // };

  return (
    <div className="Login">
      <div className="Login__container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt=""
        />

        <div className="Login__text">
          <h1>Sign in to Whatsapp</h1>
        </div>

        <Button type="submit" onClick={loginWithRedirect}>
          Sign in with Auth0
        </Button>
      </div>
    </div> 
  );
}

export default Login;
