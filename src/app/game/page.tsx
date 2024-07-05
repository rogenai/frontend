import Rogen from "@/src/Rogen";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


const BACKEND = "157.245.2.36";

const Page = () => {
    const query = useSearchParams();
    const c = query.get("c");

    const [level, setLevel] = useState<any>([]);
    const [weapon, setWeapon] = useState("");

    useEffect(() => {
        async function fetchLevel() {
            if (c && window !== undefined) {
                const map = await fetch(`http://${BACKEND}/level`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ description: c }),
                }).then((res) => res.json());
                setLevel(map.map);
    
                const weapon = await fetch(`http://${BACKEND}/weapon`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ description: c }),
                }).then((res) => res.json());
                setWeapon(weapon.response);
            }
        }
        fetchLevel();
    }, []);

    return (
        <div className="w-full flex justify-center">
            <Rogen />
        </div>
    );
};

export default Page;