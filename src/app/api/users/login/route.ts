import Connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
Connect();

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { password, email } = reqBody;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const isPasswordMatch = await bcryptjs.compare(
        password,
        existingUser.password
      );

      const isVerified = existingUser.isVerified;
      if (!isPasswordMatch) {
        return NextResponse.json(
          { error: "Invalid Email/Password" },
          { status: 400 }
        );
      }
      else if(!isVerified){
        return NextResponse.json(
          { error: "You are not a verified user" },
          { status: 400 }
        );
      }

      const tokenData = {
        id: existingUser._id,
        email: existingUser.email,
        username: existingUser.username,
      };

      const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
        expiresIn: "1d",
      });
      const response = NextResponse.json({
        message: "User Login Successfully",
        success: true,
        data: existingUser,
      });
      response.cookies.set("token", token, {
        httpOnly: true,
      });
      return response;
    }
    return NextResponse.json({ error: "User not exists" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
