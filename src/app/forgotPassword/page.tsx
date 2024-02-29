"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

const ForgotPassword = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const updatePassword = async () => {
    console.log("hit hua")
    const id = window.location.search.split("=")[1];
    console.log(id,"ewg")
    try {
      await axios.patch(`/api/users/forgotPassword/${id}`, {password});
      router.push("/profile");
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <h1 className="text-4xl">Update Password</h1>
        {error && (
          <div>
            <h2>There was an error</h2>
          </div>
        )}
        <label htmlFor="password">password</label>
        <input
          id="password"
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
          className="bg-white  rounded-md p-2 focus:outline-none focus:border-gray-600 text-black"
        />
        <button
          className="p-2 border-gray-300 rounded-md focus:outline-none focus:border-gray-600 bg-red-600 my-2 cursor-pointer"
          onClick={updatePassword}
        >
          Update Password
        </button>
      </div>
    </>
  );
};

export default ForgotPassword;
