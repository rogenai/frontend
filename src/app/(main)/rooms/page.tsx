"use client"
import { Button, Link } from '@/src/components/button';
import { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';
import { Input } from '@/src/components/input';

type Entity = {
    x: number;
    y: number;
    entity: string;
    name: string;
    id: string;
}

type Room = {
    id: string;
    players: { id: string, name: string }[];
}


export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [value, setValue] = useState<string>("Easy");
  const [name, setName] = useState<string>("");

  useEffect(() => {
    
    if (!window) return;
    if (localStorage.getItem('token') === null) {
      window.location.href = '/login';
      return;
    }
    
    axiosInstance.get('/room/').then((response) => {
      setRooms(response.data);
    });
  }, []);

  return (
    <div className="w-full">
      <h1 className="w-full text-center font-extrabold text-xl">
        Rooms
      </h1>
      <div className="flex flex-wrap justify-center m-5 rounded-lg border-2 border-solid border-[#9767FF]">
        {/* <div className="flex flex-col rounded-md bg-[#3f3f3f] p-2 m-2">
          <label className="mx-5">Level name: </label>
          <Input placeholder={name} onChange={(e: any) => setName(e.target.value)} className="rounded-md mx-5"/>
          <select className="rounded-lg m-5 text-black focus:outline-none" 
            defaultValue={"Easy"} 
            onChange={(e) => setValue(e.target.value)}>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          <Button className="rounded-lg m-5" placeholder="Generate new..." onClick={generateLevel}/>
        </div> */}
        {
          rooms.map((room, index) => {
            return <RoomCard 
            key={index} 
            id={room.id} 
            players={room.players}
            />
          })
        }
      </div>
    </div>
  );
}

function RoomCard({ id, players }: { id: string, players: { id: string, name: string }[] }) {
  return (
    <div className="w-[30%] bg-[#3f3f3f] rounded-lg flex flex-col justify-center items-center m-3">
      <h1 className="text-2xl m-2">
        Room id: {id}
      </h1>
      <h2 className="text-lg">Players: </h2>
      {
        players.map((player, index) => {
          return <p key={index} className="text-md">{player.name}</p>
        })
      }
      <Link className="m-2 rounded-lg" placeholder="Enter room" href={`/game?id=${id}`} />
    </div>
  );
}
