"use client";

import { Button } from "../../../components/ui/button";

export default function CardsPage(): JSX.Element {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Vocabulary Cards</h1>
      <p className="mb-4">Practice your vocabulary here</p>
      <Button onClick={() => {}}>Go Back</Button>
    </div>
  );
}
