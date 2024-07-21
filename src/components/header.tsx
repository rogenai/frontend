import React from 'react';

const Header: React.FC = () => {
    return (
        <div className="flex justify-between w-full p-3 items-center">
            <div className="flex items-center md:mx-[10%]">
                <img src="/logo.png" alt="logo" className="w-10 h-10" />
                <a href="/" className="whitespace-nowrap mx-2">Rogen AI</a>
            </div>
            <nav className="flex gap-4 rounded-full bg-[#2b2b2b] px-4 py-2 text-sm font-bold">
                <a href="/" className="transition-all hover:translate-y-[-4px]">Home</a>
                <a href="#" className="transition-all hover:translate-y-[-4px]">Games</a>
                <a href="#" className="transition-all hover:translate-y-[-4px]">Contact</a>
            </nav>
            <a href="/register" className="md:mx-[10%]">Register</a>
            <a href="/login" className="md:mx-[10%]">Login</a>
        </div>
    );
};

export default Header;