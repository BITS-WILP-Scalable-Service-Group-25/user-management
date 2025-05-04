export class Auth0Client {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  /**
   * Verify a JWT token
   * @param token The JWT token to verify
   * @returns Promise with verification result
   */
  async verifyToken(token: string): Promise<{ isValid: boolean; user: any }> {
    const response = await fetch(`${this.baseUrl}/api/auth/verify`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Token verification failed');
    }

    return response.json();
  }

  /**
   * Check if the auth service is healthy
   * @returns Promise with health status
   */
  async checkHealth(): Promise<{ status: string }> {
    const response = await fetch(`${this.baseUrl}/api/auth/health`);
    return response.json();
  }
}
