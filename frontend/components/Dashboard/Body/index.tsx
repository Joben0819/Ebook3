"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import React from "react";

function index() {
  const { data: session } = useSession();
  console.log("data", session);
  return (
    <div>
      {" "}
      {!session ? (
        <button onClick={() => signIn("google")}>Sign in with Google</button>
      ) : (
        <div>
          <p>Welcome, {session.user?.name}!</p>
          <img src={session.user?.image ?? ""} alt="pic" />
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      )}
    </div>
  );
}

export default index;
