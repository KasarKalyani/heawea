"use client";
import AI from "@/utils/ai";
import { useState } from "react";

export function Homepage() {
  const [name, setName] = useState("");
  const [personInfo, setPersoninfo] = useState({
    personAge: "",
    personGender: "",
    personNationality: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  let [dietInfo, setDietInfo] = useState("");
  const [heaweaInfo, setHeaweaInfo] = useState("");

  const getAi = async () => {
    try {
      setLoading(true);
      const ai = await AI(dietInfo);
      const { content } = ai;
      setHeaweaInfo(content);
    } catch (e) {
      setError("Failed to analyze food data");
    } finally {
      setLoading(false);
    }
  };

  const getData = async () => {
    try {
      setLoading(true);
      const [resAge, resGen, resNation] = await Promise.all([
        fetch(`https://api.agify.io/?name=${name}`).then((res) => res.json()),
        fetch(`https://api.genderize.io/?name=${name}`).then((res) =>
          res.json()
        ),
        fetch(`https://api.nationalize.io/?name=${name}`).then((res) =>
          res.json()
        ),
      ]);
      setPersoninfo({
        personAge: resAge.age,
        personGender: resGen.gender,
        personNationality: resNation.country[0].country_id,
      });
    } catch (e) {
      setError(
        "Aplologies for inconvenience, server is down, will be in your service soon...."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="border-t-2 border-orange-500 bg-white shadow-md rounded-md p-4 m-2">
        <input
          className="border border-gray-400 shadow-sm rounded-md p-2 m-2"
          placeholder="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <button
          className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline shadow-md m-2"
          disabled={!name}
          onClick={getData}
        >
          GO
        </button>
      </div>
      {
        <div className="border-t-2 border-orange-500 bg-white shadow-md rounded-md p-2 m-2">
          <div className="text-black-300 p-2 m-2">
            Enter your name above lets see what our datasea know about you...
          </div>
          <div className="text-green-500 p-2 m-2">
            {personInfo.personAge} {personInfo.personGender}{" "}
            {personInfo.personNationality}
          </div>
        </div>
      }
      <div className="border-t-2 border-orange-500 bg-white shadow-md rounded-md p-2 m-2">
        <div className="text-black-300 p-2 m-2">
          Here is our fun AI hea-wea(health-wealth) ask him about your diet plan
        </div>
        <input
          className="border border-gray-400 shadow-sm rounded-md p-2 m-2"
          placeholder="dietInfo"
          value={dietInfo}
          onChange={(e) => {
            setDietInfo(e.target.value);
          }}
        />
        <button
          className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline shadow-md m-2"
          disabled={!dietInfo}
          onClick={getAi}
        >
          GO
        </button>
      </div>
      {heaweaInfo && (
        <div
          className={`border-t-2 border-orange-500  bg-white shadow-md rounded-md p-2 m-2`}
        >
          {heaweaInfo}
        </div>
      )}
       {loading && <div className="p-2 m-2">...wait please</div>}
      {error && <div className="text-red-500 p-2 m-2">{error}</div>}
    </>
  );
}
