"use client"
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import dynamic from 'next/dynamic';
import Loader from "@/src/components/loader";

const DynamicComponentWithNoSSR = dynamic(
  () => import('@/src/Rogen'),
  { ssr: false }
);

const Page = () => {
    const id = useSearchParams().get("id");
    const [username, setUsername] = useState<string>("");

    useEffect(() => {
        if (!window) return;

        axiosInstance.get(`/room/exists/${id}`).then((response) => {
            if (!response.data.exists) {
                axiosInstance.post(`/room/create`, { id });
            }
        });

        if (id !== 'tutorial') {
            setUsername(JSON.parse(localStorage.getItem('user')!).username);
        }
    }, []);

    return (
        <div className="fixed z-10 w-screen-full h-screen-full flex justify-center t-0 b-0">
            <DynamicComponentWithNoSSR id={id} username={username} />
        </div>
    );
};

export default Page;