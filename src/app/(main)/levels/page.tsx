"use client"
import { Button, Link } from '@/src/components/button';
import { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';
import { Input } from '@/src/components/input';

type Level = {
  id: string;
  name: string;
  difficulty: string;
  map: number[][];
}

const createRoom = (id: string) => {
  axiosInstance.post(`/room/create`, { id }).then((res) => {
    window.location.href = `/game?id=${res.data.id}`;
  });
}

export default function Dashboard() {
  const [levels, setLevels] = useState<Level[]>([]);
  const [value, setValue] = useState<string>("Easy");
  const [name, setName] = useState<string>("");

  const generateLevel = () => {
    axiosInstance.post('/level/generate', {
      difficulty: value,
      name
    });

    axiosInstance.get('/level/all').then((response) => {
      setLevels(response.data);
    });
  };

  useEffect(() => {
    axiosInstance.get('/level/all').then((response) => {
      setLevels(response.data);
    });
  }, []);

  return (
    <div className="w-full">
      <h1 className="w-full text-center font-extrabold text-xl">
        Levels
      </h1>
      <div className="flex flex-wrap justify-center m-5 rounded-lg border-2 border-solid border-[#9767FF]">
        <div className="flex flex-col rounded-md bg-[#3f3f3f] p-2 m-2">
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
        </div>
        {
          levels.map((level, index) => {
            return <LevelCard 
            key={index} 
            id={level.id} 
            name={level.name}
            difficulty={level.difficulty}
            />
          })
        }
      </div>
    </div>
  );
}

function LevelCard({ id, name, difficulty }: { id: string, name: string, difficulty: string }) {
  return (
    <div className="w-[30%] bg-[#3f3f3f] rounded-lg flex flex-col justify-center items-center m-3">
      <h1 className="text-2xl m-2">
        Level name: {name}
      </h1>
      <h2 className="text-lg">Difficulty: {difficulty}</h2>
      <Button className="m-2 rounded-lg" placeholder="Create room" onClick={() => createRoom(id)} />
    </div>
  );
}
