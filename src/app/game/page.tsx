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
    const [level, setLevel] = useState<any>([]);
    const [username, setUsername] = useState<string>("");

    useEffect(() => {
        if (!window) return;

        axiosInstance.get(`/room/exists/${id}`).then((response) => {
            if (!response.data.exists) {
                axiosInstance.post(`/room/create`, { id });
            }
        });

        axiosInstance.get(`/level/${id}`).then((response) => {
            setLevel(response.data.map);
        });

        if (id !== 'tutorial') {
            setUsername(JSON.parse(localStorage.getItem('user')!).username);
        }
    }, []);

    if (level.length === 0) return <Loader />;

    return (
        <div className="fixed z-10 w-screen-full h-screen-full flex justify-center t-0 b-0">
            <DynamicComponentWithNoSSR level={level} id={id} username={username} />
        </div>
    );
};

export default Page;