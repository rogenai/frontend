"use client";
import { useState } from "react";
import "./anim.css";
import { usePathname } from "next/navigation";

function Input(props: any) {
  return <input className={"rounded-full bg-white px-4 py-2 focus:outline-none text-black " + props.className} 
  placeholder={props.placeholder} onChange={props.onChange} />
}

function Button(props: any) {
  return <button className={"rounded-full px-4 py-2 bg-[#9767FF] font-bold focus:outline-none text-white " + props.className} onClick={props.onClick}>
    {props.placeholder}
  </button>
}

export default function Home() {

  const [input, setInput] = useState("");
  const p = usePathname();

  return (
    <main>
      <div className="w-full flex">
        <div className="w-full flex items-center justify-center">
        <div className="my-[10%]">
          <div className="text-5xl font-bold space-x-2 leading-snug">
            Generate your own roguelike.<br />
            Create.
          </div>
          <Input className="my-8 w-5/6" placeholder="Starwars styled..." onChange={() => setInput(input)} />
          <Button className="m-2" placeholder="Create" onClick={() => } />
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
