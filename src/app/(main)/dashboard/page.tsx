"use client"
import { Button, Link } from '@/src/components/button';
import { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';
import axios from 'axios';

type Level = {
  id: string;
  name: string;
  difficulty: string;
  map: number[][];
}

export default function Dashboard() {
  const [levels, setLevels] = useState<Level[]>([]);
  const [value, setValue] = useState<string>("Easy");

  const generateLevel = () => {
    axiosInstance.post('/level/generate', {
      difficulty: value
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
      <div className="flex flex-wrap justify-center m-5 rounded-lg border-2 border-solid border-[#9767FF]">
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
        <div className="flex flex-col">
          <select className="rounded-lg m-5 text-black focus:outline-none" 
            defaultValue={"Easy"} 
            onChange={(e) => setValue(e.target.value)}>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          <Button className="rounded-lg m-5" placeholder="Generate new..." onClick={generateLevel}/>
        </div>
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
      <Link className="m-2 rounded-lg" placeholder="Start" href={`/game?id=${id}`} />
    </div>
  );
}
