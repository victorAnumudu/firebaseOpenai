import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../component/Input";
import Button from "../component/Button";
import Spinner from "../component/Spinner";

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

type InputType = {
  email: string,
  password: string,
  'Retype-password': string
}

const Signup = () => {
  let navigate = useNavigate();
  let [isLoading, setIsLoading] = useState(false); // use to determine when the spinner comes out

  let [errorMessage, setErrorMessage] = useState({
    status: false,
    message: "",
  });

  let [inputs, setInputs] = useState<InputType>({
    email: "",
    password: "",
    "Retype-password": "",
  });

  let handleOnChange = ({target: { name, value },}: HandleOnChangeProps): void => {
    setInputs((prevs) => {
      return { ...prevs, [`${name}`]: value };
    });
  };

  const handleSignup = (): void => { // function to handle user signup
    setIsLoading(true); // for loading spinner

    setErrorMessage({ // error message state sets to empty
        status: false,
        message: ''
    })

    let userDetails = {...inputs}  // assigns inputs to userDetails

    if(userDetails.email == '' || userDetails.password == '' || userDetails['Retype-password'] == ''){ // test for empty inputs
        setErrorMessage({
            status: false,
            message: 'Opps!, Fill all fields'
        })
        setIsLoading(false)
        return
    }

    if(userDetails.password != userDetails['Retype-password']){ //checking if password matches retype password
        setErrorMessage({
            status: false,
            message: 'Opps!, Password do not match'
        })
        setIsLoading(false)
        return
    }
    
    createUserWithEmailAndPassword(auth, userDetails.email, userDetails.password) // calls create user firebase function
      .then((userCredential) => { // on success, redirects user to login page
        // Signed in 
        const user = userCredential.user;
        setErrorMessage({
          status: true,
          message: 'User account created succesfully'
        })
        setTimeout(() => {
          setIsLoading(false)
          navigate("/login", { replace: true });
          setIsLoading(false); // sets spinner display to flase
        }, 1000);
      })
      .catch((error) => { // on error
        const errorCode:string = error.code;
        const errorMessage:string = error.message;
        setIsLoading(false)
        setErrorMessage({
          status: false,
          message: `${errorMessage}`
        })
        return
      });

    
  };

  return (
    <div className="w-[350px] bg-slate-100 shadow-lg mt-5 absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%]">
      <div>
        <h2 className="relative text-center p-3 mb-3 text-2xl before:w-2/4 before:h-0.5 before:absolute before:left-[50%] before:bottom-0 before:translate-x-[-50%] before:bg-blue-500">Signup</h2>
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
          <Input
            type="password"
            name="Retype-password"
            value={inputs["Retype-password"]}
            handleOnChange={handleOnChange}
          />
        </div>
        <div className="">
          {isLoading ? (
            <Spinner />
          ) : (
            <Button name="Register" onclick={handleSignup} />
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
            Already have an Account{" "}
            <span className="underline text-blue-500">
              <Link to="/login">Login</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
