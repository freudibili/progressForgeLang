"use client";

import { useRouter } from "next/navigation";

export default function CardsPage(): JSX.Element {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Vocabulary Cards</h1>
        <button
          onClick={() => router.push("/cards/new")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add New Card
        </button>
      </div>

      <button
        onClick={() => router.push(`/cards`)}
        className="text-blue-500 hover:text-blue-600"
      >
        View Details
      </button>
    </div>
  );
}
