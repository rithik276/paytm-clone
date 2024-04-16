import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const signInHandler = async () => {
    const response = await axios.post(
      "http://localhost:3000/api/v1/user/signin",
      {
        username,
        password,
      }
    );
    if (response.status == 200) {
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    }
  };
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox
            onChange={(e) => {
              e.preventDefault();
              setUsername(e.target.value);
            }}
            placeholder="Enter Email Address"
            label={"Email"}
          />
          <InputBox
            onChange={(e) => {
              e.preventDefault();
              setPassword(e.target.value);
            }}
            placeholder="Enter Password"
            label={"Password"}
          />
          <div className="pt-4">
            <Button
              label={"Sign in"}
              onClick={() => {
                signInHandler();
              }}
            />
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};
