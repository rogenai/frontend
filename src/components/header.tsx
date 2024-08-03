"use client"
import React, { useEffect, useState } from 'react';
import { refreshPage } from '../util/util';

export default function Header() {

    const logout = (e: any) => {
        if (!window) return; 
        localStorage.removeItem("token");
        refreshPage();
        e.preventDefault();
    }

    const [logined, setLogined] = useState(false);

    useEffect(() => {
        if (!window) return;
        setLogined(checkLogin());
    }, []);
    
    const checkLogin = () => {
        if (!window) return false;
        return (localStorage.getItem("token") !== null);
    }

    return (
        <div className="flex justify-between w-full p-3 items-center">
            <div className="flex items-center md:mx-[10%]">
                <img src="/logo.png" alt="logo" className="w-10 h-10" />
                <a href="/" className="whitespace-nowrap mx-2">Rogen AI</a>
            </div>
            <nav className="flex gap-4 rounded-full bg-[#2b2b2b] px-4 py-2 text-sm font-bold">
                <a href="/" className="transition-all hover:translate-y-[-4px]">Home</a>
                <a href="/levels" className="transition-all hover:translate-y-[-4px]">Levels</a>
                <a href="/rooms" className="transition-all hover:translate-y-[-4px]">Rooms</a>
            </nav>
            {
                logined ? 
                <a href="/logout" className="md:mx-[10%]" onClick={logout}>Logout</a> : 
                (<>
                    <a href="/register" className="md:mx-[10%]">Register</a>
                    <a href="/login" className="md:mx-[10%]">Login</a>
                </>)
            }
        </div>
    );
};