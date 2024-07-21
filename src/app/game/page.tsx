"use client"
import Rogen from "@/src/Rogen";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";

const Page = () => {
    const id = useSearchParams().get("id");
    const [level, setLevel] = useState<any>([]);

    useEffect(() => {
        axiosInstance.get(`/level/${id}`).then((response) => {
            setLevel(response.data.map);
        });
    }, []);

    if (level.length === 0) return <div></div>;

    return (
        <div className="fixed z-10 w-screen-full h-screen-full flex justify-center t-0 b-0">
            <Rogen level={level} />
        </div>
    );
};

export default Page;