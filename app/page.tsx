import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Login from "@/Components/Login";

import NewEgg from "@/Components/NewEgg";
import Nav from "@/Components/Nav";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="bg-sky-300/100 min-h-screen p-10">
      <NewEgg />
    </div>
  );
}
