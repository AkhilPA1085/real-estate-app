import { connection } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connection();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    // checking for credentials are there
    if (!email || !password) {
      return NextResponse.json(
        {
          error: "Login credentials are missing",
        },
        { status: 404 }
      );
    }

    // check whether user exist
    const userExisting = await User.findOne({ email });
    if (!userExisting) {
      return NextResponse.json(
        {
          error: "No user found with this email",
        },
        { status: 400 }
      );
    }

    // password checking
    const validatePassword = await bcryptjs.compare(
      password,
      userExisting.password
    );
    if (!validatePassword) {
      return NextResponse.json(
        {
          error: "Password is invalid",
        },
        { status: 400 }
      );
    }
    // create Token
    const tokenData = {
      id: userExisting._id,
      email: userExisting.email,
      username: userExisting.username,
    };
    const token = jwt.sign(
      tokenData,
      process.env.NEXT_PUBLIC_JWT_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    const response = NextResponse.json({
      message: "Login Successful",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error) {
    console.error("Error while handling login request", error);
  }
}
