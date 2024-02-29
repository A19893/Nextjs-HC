import  bcryptjs from 'bcryptjs';
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from '@/helpers';

export const POST = async (request: NextRequest, response:NextResponse) => {
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
        if(existingUser){
        await sendEmail({email, emailType:"forgot-Password", userId: existingUser._id})
        return NextResponse.json({
          message: "Email Sent Successfully",
          success: true,
          data: existingUser,
        });
    }
      }
      return NextResponse.json({ error: "User not exists" }, { status: 400 });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  };