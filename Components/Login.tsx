"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import UserCard from "./UserCard";

function Login() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex flex-col md:flex-row gap-5 items-center">
        <UserCard user={session?.user} />
        <button
          className="bg-green-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </div>
    );
  } else {
    return (
      <button
        className="bg-green-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
        onClick={() => signIn()}
      >
        Sign in
      </button>
    );
  }
}

export default Login;
