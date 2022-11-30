/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function handler(request: any, response: any) {
  const METHOD = request.method;
  if (METHOD === "GET") {
    const pokemons = await prisma.pokemon.findMany({
      orderBy: [{ order: "asc" }],
    });
    return response.status(200).json({ ok: true, data: pokemons });
  }
  if (METHOD === "POST") {
    return await createPokemon(request, response);
  }
}

async function createPokemon(req: any, res: any) {
  const { name } = JSON.parse(req.body);
  try {
    const foundPokemon = await prisma.pokemon.findFirst({
      where: { name },
    });
    console.log({ foundPokemon });
    if (!foundPokemon) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
      if (response.ok) {
        const pokemon = await response.json();
        const newPokemon = await prisma.pokemon.create({
          data: {
            name: pokemon.name,
            order: pokemon.order,
            imageUrl: pokemon.sprites.front_default,
          },
        });
        return res.status(201).json({ ok: true, data: newPokemon });
      } else {
        return res
          .status(400)
          .json({ ok: false, message: "Ese pokemon no existe" });
      }
    }
    return res.status(200).json({ ok: true });
  } catch {}
}
