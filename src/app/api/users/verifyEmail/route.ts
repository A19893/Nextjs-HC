import Connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

Connect();

export const POST = async(request:NextRequest, response:NextResponse) => {
    try{
      const reqBody = await request.json();
      const {token} = reqBody;

      const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}});

      if(!user){
        return NextResponse.json({ error: 'Invalid Token' }, { status: 400 });
      }
      user.isVerified = true;
      user.verifyToken = '';
      user.verifyTokenExpiry = '';
      await user.save();

      return NextResponse.json({
        message:'Email Verified Successfully',
        success: true
      })
    }
    catch(error: any){
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}