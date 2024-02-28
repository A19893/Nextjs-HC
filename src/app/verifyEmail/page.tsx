"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

const VerifyEmail = () => {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyEmail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const url = window.location.search.split("=")[1];
    setToken(url || '');
  }, [token]);

  useEffect(() => {
    if (token?.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <>
      <div className="flex justify-center items-center">
        <h1 className="text-4xl">Verify Email</h1>
        <h2>{token ? `${token}` : "no token"}</h2>
        {verified && (
          <div>
            <h2>Email Verified</h2>
            <Link href="/login">Login</Link>
          </div>
        )}
        {error && (
          <div>
            <h2>There was an error</h2>
          </div>
        )}
      </div>
    </>
  );
};


export default VerifyEmail;