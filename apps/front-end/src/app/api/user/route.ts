import { NextResponse } from "next/server";
import adjectives from "./adjectives.json";
import animals from "./animals.json";

export const dynamic = "force-dynamic";

export async function GET() {
  const adj = adjectives[randint(0, adjectives.length)];
  const animal = animals[randint(0, animals.length)];

  return NextResponse.json({
    name: `${adj} ${animal}`,
    color: generateBackgroundGradient(),
  });
}

function generateBackgroundGradient() {
  const deg = () => randint(0, 360);
  const percent = () => randint(0, 100);

  const from = `hsl(${deg()}, ${percent()}%, ${percent()}%)`;
  const to = `hsl(${deg()}, ${percent()}%, ${percent()}%)`;

  return `linear-gradient(${deg()}deg, ${from}, ${to})`;
}

/**
 * Generate a random integer between min and max (inclusive).
 */
function randint(min: number, max: number) {
  return min + Math.floor(Math.random() * (max + 1));
}
