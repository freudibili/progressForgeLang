"use client";

import { useRouter } from "next/navigation";
import { Button } from "tamagui";

import { getNativeUrl } from "@/utils/navigation";

export default function CardsPage(): JSX.Element {
  const router = useRouter();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Vocabulary Cards</h1>
      <p className="mb-4">Practice your vocabulary here</p>
      <Button onPress={() => router.push(getNativeUrl("/"))}>Go Back</Button>
    </div>
  );
}
