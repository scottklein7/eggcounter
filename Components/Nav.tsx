import Link from "next/link";
import Login from "./Login";
import Image from "next/image";

function Nav() {
  return (
    <nav className="bg-sky-200 p-4 flex items-center gap-5 text-lg font-extrabold text-emerald-600 justify-between">
      <div className="flex items-center gap-5">
        <Link href="/">
          <Image
            width="50"
            height="50"
            alt="chickenlogo"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbqXTHHoGknTXV4qrWQK5SQCdIh6gnxk9rXw&usqp=CAU"
          />
        </Link>

        <Link className="hover:text-sky-400" href="/eggs">
          See your egg data
        </Link>
      </div>
      <Login />
    </nav>
  );
}

export default Nav;
