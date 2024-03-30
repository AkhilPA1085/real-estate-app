import { getUserDataFromToken } from "@/helpers/getUserDataFromToken";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const userId = await getUserDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");
    return NextResponse.json({
      message: "User Found",
      data: user,
    });
  } catch (error) {
    return error;
  }
}
