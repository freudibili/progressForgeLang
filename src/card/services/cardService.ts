import { VocabularyCard } from "../types";

class CardService {
  private baseUrl = "http://localhost:3000/api";

  async fetchCards(): Promise<VocabularyCard[]> {
    const response = await fetch(`${this.baseUrl}/cards`);
    if (!response.ok) {
      throw new Error("Failed to fetch cards");
    }
    return response.json();
  }

  async updateCardProgress(
    cardId: string,
    isCorrect: boolean
  ): Promise<VocabularyCard> {
    const response = await fetch(`${this.baseUrl}/cards/${cardId}/progress`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isCorrect }),
    });
    if (!response.ok) {
      throw new Error("Failed to update card progress");
    }
    return response.json();
  }
}

export const cardService = new CardService();
