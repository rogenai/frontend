'use client'
import { useState } from "react";
import axiosInstance from "../../axiosInstance";

export default function Page() {
    const [state, setState] = useState({
      username: "",
      password: "",
      email: ""
    });

    const sendLogin = () => {
      axiosInstance.post("/user/login", state).then((response) => {
        console.log(response.data);
      });
    }

    return (
        <div className="flex justify-center items-center h-screen-full w-screen-full my-4">
          <div className="w-96 h-96 bg-[#2b2b2b] rounded-3xl flex flex-col justify-center items-center">
            <h1 className="text-4xl text-white font-bold">Login</h1>
            <input type="text" placeholder="Email" 
            className="w-3/4 h-10 bg-[#4b4b4b] rounded-full px-4 py-2 mt-4 focus:outline-none" 
            onChange={(e) => setState({ ...state, email: e.target.value })} />
            <input type="password" placeholder="Password" 
            className="w-3/4 h-10 bg-[#4b4b4b] rounded-full px-4 py-2 mt-4 focus:outline-none" 
            onChange={(e) => setState({ ...state, password: e.target.value })} />
            <button className="w-3/4 h-10 bg-[#9767FF] rounded-full px-4 py-2 mt-4 font-bold focus:outline-none text-white"
              onClick={sendLogin}>
            Login
            </button>
          </div>
        </div>
      );
}