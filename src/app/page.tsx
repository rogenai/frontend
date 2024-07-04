import Image from "next/image";
import Rogen from "../Rogen";
import "./anim.css";

function Input({ className, placeholder }: { className?: string, placeholder: string }) {
  return <input className={"rounded-full bg-white px-4 py-2 focus:outline-none text-black " + className} 
  placeholder={placeholder}/>
}

function Button({ className, placeholder }: { className?: string, placeholder: string }) {
  return <button className={"rounded-full px-4 py-2 bg-[#9767FF] font-bold focus:outline-none text-white " + className}>
    {placeholder}
  </button>
}

export default function Home() {
  return (
    <main>
      <div className="w-full flex">
        <div className="w-full flex items-center justify-center">
        <div className="my-[10%]">
          <div className="text-5xl font-bold space-x-2 leading-snug">
            Generate your own roguelike.<br />
            Create.
          </div>
          <Input className="my-8 w-5/6" placeholder="Starwars styled..."/>
          <Button className="m-2" placeholder="Create" />
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
