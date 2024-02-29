import bcryptjs from "bcryptjs";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (request: NextRequest, context: any) => {
  try {
    const reqBody = await request.json();
    const { id } = context.params;
    const { password } = reqBody;
    const existingUser = await User.findById(id);
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    existingUser.password = hashedPassword;
    await existingUser.save();
    if (existingUser) {
      return NextResponse.json({
        message: "Password Updated Successfully",
        success: true,
        data: existingUser,
      });
    }
    return NextResponse.json(
      { error: "Password not Updated" },
      { status: 400 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
