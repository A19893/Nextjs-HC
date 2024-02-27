"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

const SignupPage = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const onSignup = async () => {};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 text-2xl">
      <h1>Signup</h1>
      <hr />
      <label htmlFor="username">username</label>
      <input
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="Enter Username"
        className="bg-white  rounded-md p-2 focus:outline-none focus:border-gray-600 text-black"
      />
      <hr />
      <label htmlFor="email">email</label>
      <input
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Enter Email"
        className="bg-white  rounded-md p-2 focus:outline-none focus:border-gray-600 text-black"
      />
      <hr />
      <label htmlFor="password">password</label>
      <input
        id="password"
        type="text"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Enter Password"
        className="bg-white  rounded-md p-2 focus:outline-none focus:border-gray-600 text-black"
      />
      <button
      className="p-2 border-gray-300 rounded-md focus:outline-none focus:border-gray-600 bg-red-600 my-2">
        Signup Here
      </button>
      <Link href="/login" className="text-lg">Visit Login Page</Link>
    </div>
  );
};

export default SignupPage;
