import { connection } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connection();

export async function POST(request) {
  try {
    const requestBody = await request.json();
    const { email, password, username } = requestBody;

    // Input validation
    if (!email || !password || !username) {
      return NextResponse.json({
        error: "Missing required fields",
      }, {
        status: 400
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({
        error: "User already exists",
      }, {
        status: 400
      });
    }

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create new user
    const newUser = new User({
      email,
      username,
      password: hashedPassword,
    });

    // Save user to database
    const savedUser = await newUser.save();

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      // savedUser
    });

  } catch (error) {
    console.error("Error while handling signup request", error);
    return NextResponse.json({
      error: "Internal server error",
    }, {
      status: 500
    });
  }
}
