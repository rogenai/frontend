'use client'
import { useState } from "react";
import axiosInstance from "../../axiosInstance";
import { redirect } from "@/src/util/util";
import { toast } from "react-toastify";

export default function Page() {
    const [state, setState] = useState({
      username: "",
      password: "",
      email: ""
    });
    
    const sendLogin = () => {
      axiosInstance.post("/user/login", state).then((response) => {
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        redirect("/");
      }).catch((err) => {
        toast.error("Invalid credentials!");
        console.log("Error occured while logging in", err);
      });
    }

    return (
        <div className="flex justify-center items-center h-screen-full w-screen-full my-4">
          <form className="w-96 h-96 bg-[#2b2b2b] rounded-3xl flex flex-col justify-center items-center">
            <h1 className="text-4xl text-white font-bold">Login</h1>
            <input required type="text" placeholder="Email" 
            className="w-3/4 h-10 bg-[#4b4b4b] rounded-full px-4 py-2 mt-4 focus:outline-none" 
            onChange={(e) => setState({ ...state, email: e.target.value })} />
            <input required type="password" placeholder="Password" 
            className="w-3/4 h-10 bg-[#4b4b4b] rounded-full px-4 py-2 mt-4 focus:outline-none" 
            onChange={(e) => setState({ ...state, password: e.target.value })} />
            <button className="w-3/4 h-10 bg-[#9767FF] rounded-full px-4 py-2 mt-4 font-bold focus:outline-none text-white"
              onSubmit={sendLogin}>
            Login
            </button>
            <a href="/register" className="text-[#9767FF] mt-4 hover:text-blue-900">Don&apos;t have account?</a>
          </form>
        </div>
      );
}