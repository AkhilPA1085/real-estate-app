"use client";
import CustomButton from "@/components/common/Button/Button";
import { Card, Input, Typography } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import { userLogin } from "@/services/user.services";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginCredentials((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(loginCredentials);
    try {
      setLoading(true);
      const response = await userLogin(loginCredentials);
      if(response){
        router.push("/");
      }

    } catch (error) {
      console.log("Login Failed", error);
    }finally{
      setLoading(false)
    }
  };
  return (
    <Card className="p-5">
      <Typography variant="h6">Login Your Account</Typography>
      <form className="flex flex-col gap-5 pt-5" onSubmit={handleSubmit}>
        <Input
          placeholder="Email"
          name="email"
          type="email"
          value={loginCredentials.email}
          onChange={handleChange}
        />
        <Input
          placeholder="Password"
          name="password"
          type="password"
          value={loginCredentials.password}
          onChange={handleChange}
        />
        <CustomButton type="submit">
          {loading ? "Processing..." : "Login"}
        </CustomButton>
        <CustomButton outlined>Login account with Google</CustomButton>
        <Link href="/signup">Create an account?</Link>
      </form>
    </Card>
  );
};

export default LoginForm;
