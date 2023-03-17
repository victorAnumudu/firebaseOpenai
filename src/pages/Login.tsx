import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../component/Input";
import Button from "../component/Button";
import Spinner from "../component/Spinner";

import { Authenticate } from "../context/Auth"; // authentication useContext

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"; // for firebase authentication
import {auth} from '../firebase'

type HandleOnChangeProps = {
  target: {
    email: String;
    password: String;
    "Retype-password": String;
    value: String;
    name: String;
  };
};

type UserDetails = {
  loggedIn: boolean;
  email: string;
}

const Login = () => {

  const { setUserDetails }:any = Authenticate()

  let navigate = useNavigate();
  let [isLoading, setIsLoading] = useState<boolean>(false); // use to determine when the spinner comes out

  let [errorMessage, setErrorMessage] = useState({
    status: false,
    message: "",
  });

  let [inputs, setInputs] = useState<{email: string, password: string}>({
    email: "",
    password: "",
  });

  let handleOnChange = ({ target: { name, value } }: HandleOnChangeProps) => {
    setInputs((prevs) => {
      return { ...prevs, [`${name}`]: value };
    });
  };

  const handleLogin = (): void => {
    setIsLoading(true); // for loading spinner

    setErrorMessage({
        status: false,
        message: ''
    })
    let userDetails = {...inputs}
    if(!userDetails.email || !userDetails.password){
        setErrorMessage({
            status: false,
            message: 'Opps!, Fill all fields'
        })
        setIsLoading(false)
        return
    }

    signInWithEmailAndPassword(auth, userDetails.email, userDetails.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
        setErrorMessage({
          status: true,
          message: 'Login successfully'
        })
        localStorage.setItem("islogin", "true"); // sets islogin to true in local storage
        setUserDetails({
          loggedIn: true,
          email: "",
        })

        setTimeout(() => {
          navigate("/", { replace: true });
          setIsLoading(false); // sets spinner display to false
        }, 1000);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setIsLoading(false)
        setErrorMessage({
          status: false,
          message: error.message
        })
      });
  };

  return (
    <div className="w-[350px] bg-slate-50 shadow-lg mt-5 absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%]">
      <div>
        <h2 className="relative text-center p-3 mb-3 text-2xl before:w-2/4 before:h-0.5 before:absolute before:left-[50%] before:bottom-0 before:translate-x-[-50%] before:bg-blue-500">Login</h2>
        <div className="">
          <Input
            type="email"
            name="email"
            value={inputs.email}
            handleOnChange={handleOnChange}
          />
          <Input
            type="password"
            name="password"
            value={inputs.password}
            handleOnChange={handleOnChange}
          />
        </div>
        <div className="">
          {isLoading ? (
            <Spinner />
          ) : (
            <Button name="Login" onclick={handleLogin} />
          )}
        </div>
        {errorMessage.message != "" && (
          <div
            className={`text-center ${
              errorMessage.status ? "text-green-500" : "text-red-500"
            }`}
          >
            <p>{errorMessage.message}</p>
          </div>
        )}
        <div className="p-2 mt-1 flex justify-between items-center">
          <p>
            Don't have an Account{" "}
            <span className="underline text-blue-500">
              <Link to="/signup">Signup</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
