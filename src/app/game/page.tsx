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
    const [level, setLevel] = useState<number[][]>([]);

    useEffect(() => {
        if (!window) return;

        if (id === 'tutorial') {
            axiosInstance.get(`/level/${id}`).then((response) => {
                setLevel(response.data.map);
            });
            return;
        }
        setUsername(JSON.parse(localStorage.getItem('user')!).username);
    }, []);

    if (level.length === 0) {
        return <Loader />;
    }

    return (
        <div className="fixed z-10 w-screen-full h-screen-full flex justify-center t-0 b-0">
            <DynamicComponentWithNoSSR id={id} username={username} level={level} />
        </div>
    );
};

export default Page;