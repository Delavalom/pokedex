/* eslint-disable @typescript-eslint/no-explicit-any */
import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemons, setPokemons] = useState<any>([]);
  const [loading, setLoading] = useState("");

  const handleChange = ({ target }: any) =>
    setPokemonName(target.value.toLowerCase());

  const catchPokemon = async () => {
    if (!pokemonName) return;

    setLoading("catching...");

    const response = await fetch("/api/pokemon", {
      method: "POST",
      body: JSON.stringify({ name: pokemonName }),
      headers: { "Content-Type": "application/json" },
    });

    const resJSON = await response.json();
    if (response.ok) {
      await fetchPokemons();
      console.log({ resJSON });
    } else {
      await fetchPokemons()
    }
  };

  const fetchPokemons = async () => {
    setLoading("Fetching...");
    const response = await fetch("/api/pokemon");

    if (response.ok) {
      const { data } = await response.json();
      setLoading("");
      setPokemons(data);
    } else {
      console.log("Error fetch the data");
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  return (
    <>
      <Head>
        <title>Pokedex</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center gap-12 px-4 py-8 ">
          <h1 className="text-5xl font-black text-white">
            Which Pokemon would you like to catch?
          </h1>
          <span className="text-gray-300">
            {pokemons.lenght} have been caught
          </span>
          <input
            onChange={handleChange}
            value={pokemonName}
            className="rounded-full bg-[#532c89] py-2 px-4 text-center text-xl md:text-5xl font-light tracking-tight text-white"
          />
        </div>
        <button
          onClick={catchPokemon}
          className="flex w-40 md:w-80 items-center justify-center rounded-full bg-[#a768fe] px-5 py-2 text-sm md:text-2xl text-white hover:bg-[#532c89]"
        >
          {" "}
          {loading ? (
            <div className="flex items-center gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5 md:h-10 md:w-10 animate-spin"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
              <span>{loading}</span>
            </div>
          ) : (
            "Atrapar!"
          )}
        </button>
        <div className="mt-6 flex w-full px-10 md:max-w-[70rem] flex-wrap gap-4">
          {pokemons.map((pokemon: any) => (
            <div
              key={pokemon.id}
              className="mt-4 flex flex-col items-center justify-center rounded-lg bg-white shadow-lg shadow-white hover:scale-105 hover:cursor-pointer"
            >
              <Image
                src={pokemon.imageUrl}
                alt={pokemon.name}
                width={150}
                height={150}
              />
              <p className="font-bold">{pokemon.name.toUpperCase()}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;
