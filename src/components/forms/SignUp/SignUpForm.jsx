"use client";
import CustomButton from "@/components/common/Button/Button";
import { Card, Input, Typography } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";

const SignUpForm = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    username:""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(credentials);
  };
  return (
    <Card className="p-5">
      <Typography variant="h6">Create Your Account</Typography>
      <form className="flex flex-col gap-5 pt-5" onSubmit={handleSubmit}>
        <Input
          placeholder="Email"
          name="email"
          type="email"
          value={credentials.email}
          onChange={handleChange}
        />
        <Input
          placeholder="User Name"
          name="username"
          type="text"
          value={credentials.username}
          onChange={handleChange}
        />
        <Input
          placeholder="Password"
          name="password"
          type="password"
          value={credentials.password}
          onChange={handleChange}
        />
        <CustomButton type="submit">Create Account</CustomButton>
        <CustomButton outlined>Create account with Google</CustomButton>
        <Link href="/login">Already have an account?</Link>
      </form>
    </Card>
  );
};

export default SignUpForm;
