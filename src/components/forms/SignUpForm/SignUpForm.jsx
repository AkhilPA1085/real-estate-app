"use client";
import CustomButton from "@/components/common/Button/Button";
import {userSignup} from "@/services/user.services";
import { Card, Input, Typography } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SignUpForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    username: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await userSignup(credentials);
      console.log('User created successfully', res);
      if(res){
        router.push('/login');
      }
    } catch (error) {
      console.error('User creation failed', error);
    } finally {
      setLoading(false);
    }
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
        <CustomButton type="submit">
          {loading ? "Processing..." : "Create Account"}
        </CustomButton>
        <CustomButton outlined>Create account with Google</CustomButton>
        <Link href="/login">Already have an account?</Link>
      </form>
    </Card>
  );
};

export default SignUpForm;
