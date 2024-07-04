import React from 'react';

const Header: React.FC = () => {
    return (
        <div className="flex justify-between w-full p-3">
            <a href="/"><h1>Rogen AI</h1></a>
            <nav className="flex gap-4 rounded-full bg-[#2b2b2b] px-4 py-2 text-sm font-bold">
                <a href="/" className="transition-all hover:translate-y-[-4px]">Home</a>
                <a href="/game" className="transition-all hover:translate-y-[-4px]">Game</a>
                <a href="/contact" className="transition-all hover:translate-y-[-4px]">Contact</a>
            </nav>
            <a href="/login">Login</a>
        </div>
    );
};

export default Header;