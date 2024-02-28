import { NextRequest, NextResponse } from "next/server";
import Connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { getDataFromToken } from "@/helpers";

Connect();
export const GET = async (request: NextRequest, response: NextResponse) => {
    try{
      const userId = await getDataFromToken(request);
      const user = await User.findOne({_id: userId}).select("-password");
      return NextResponse.json({
        message: 'User Found',
        data: user
      },{status: 200})
    }
    catch(error: any){
        return NextResponse.json({error: error.message})
    }
};
