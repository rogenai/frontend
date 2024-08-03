"use client";
import { useState } from "react";
import "../../styles/anim.css";
import { useRouter } from "next/navigation";
import { Button } from "../../components/button";

export default function Home() {
  const p = useRouter();

  return (
    <main>
      <div className="w-full flex">
        <div className="w-full md:flex md:justify-center">
        <div className="my-20 mx-10 md:mx-[10%] flex flex-col md:w-2/5 text-center">
          <div className="text-5xl font-bold leading-snug">
            <span className="text-[]">Play, upgrade,</span> create and enjoy
          </div>
          <p className="my-3">
            Rogen AI - first AI powered roguelike game where you can play with friends.
          </p>
          <Button className="mt-10 w-full transition-all" placeholder="Play" onClick={() => { p.push("/game?id=tutorial") }} />
          <Button className="mt-5 w-full transition-all bg-transparent border-solid border-2 border-[#9767FF] text-[#9767FF]" placeholder="Skip tutorial" onClick={() => { p.push("/levels") }} />
        </div>
        </div>
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>

    </main>
  );
}
