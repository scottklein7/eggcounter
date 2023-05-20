"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Login from './Login';

const Nav = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <nav className="bg-sky-200 p-4 font-serif text-emerald-500 flex flex-col items-center md:flex-row md:justify-between">
      <div className="flex items-center gap-5">
        <Link href="/">
          <Image
            width="50"
            height="50"
            className='rounded-xl'
            alt="chickenlogo"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbqXTHHoGknTXV4qrWQK5SQCdIh6gnxk9rXw&usqp=CAU"
          />
        </Link>
        {!isMobile && (
          <Link
            className="hover:text-sky-400 text-xl"
            href="/eggs"
          >
            See your egg data
          </Link>
        )}
      </div>
      <Login />
    </nav>
  );
};

export default Nav;
