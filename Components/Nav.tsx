"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Login from './Login';

const Nav = () => {


  return (
    <nav className="bg-sky-200 font-serif text-emerald-500 flex flex-col md:flex-row md:justify-between items-center justify-center">
      <div className="flex flex-col md:flex-row items-center gap-3">
        <Link href="/">
          <div>
            <Image
            className='rounded-xl'
              width={50}
              height={50}
              alt="chickenlogo"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbqXTHHoGknTXV4qrWQK5SQCdIh6gnxk9rXw&usqp=CAU"
            />
          </div>
        </Link>
        <Link href="/eggs" className="hover:text-sky-400 text-xl">
          See your egg data
        </Link>
      </div>
      
      <Login />
    </nav>
  );
};

export default Nav;
