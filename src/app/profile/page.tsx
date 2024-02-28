"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>('');
  useEffect(()=>{
   const getUserDetails = async () =>{
    const res = await axios.get('/api/users/checkUser');
    console.log(res.data.data)
    setUser(res.data.data);
   }
   getUserDetails();
  },[])
  const onLogout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      console.log(response, "Logout Success");
      router.push("/login");
    } catch (error: any) {
      console.log("Logout Failed", error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 text-2xl">
      <h1>Profile</h1>
      <hr />
      <p>Profile Page</p>
      <h2>{user?<Link href={`/profile/${user._id}`}>Go to Your Profile</Link>:""}</h2>
      <hr />
      <button
        className="p-2 border-gray-300 rounded-md focus:outline-none focus:border-gray-600 bg-red-600 my-2"
        onClick={onLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
