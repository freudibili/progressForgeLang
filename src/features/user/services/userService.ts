import { User, UserPreferences, UserStatistics } from '../types/userTypes';

class UserService {
  private baseUrl = 'http://localhost:3000/api'; // Replace with your API URL

  async fetchUser(): Promise<User> {
    const response = await fetch(`${this.baseUrl}/user`);
    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }
    return response.json();
  }

  async updatePreferences(
    preferences: Partial<UserPreferences>
  ): Promise<User> {
    const response = await fetch(`${this.baseUrl}/user/preferences`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(preferences)
    });
    if (!response.ok) {
      throw new Error('Failed to update preferences');
    }
    return response.json();
  }

  async updateStatistics(statistics: Partial<UserStatistics>): Promise<User> {
    const response = await fetch(`${this.baseUrl}/user/statistics`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(statistics)
    });
    if (!response.ok) {
      throw new Error('Failed to update statistics');
    }
    return response.json();
  }
}

export const userService = new UserService();
