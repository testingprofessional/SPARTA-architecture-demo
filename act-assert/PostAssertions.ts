import { expect, APIRequestContext } from '@playwright/test';
import { PostApiClient, PostResponse } from '../interactie/PostApiClient';

export class PostAssertions {
  private apiClient: PostApiClient;

  constructor(request: APIRequestContext) {
    this.apiClient = new PostApiClient(request);
  }

  // Controleert het resultaat van een eerdere actie
  controleerAangemaaktePost(response: PostResponse, verwachteTitel: string, verwachteUserId: number) {
    expect(response.status).toBe(201);
    expect(response.body.title).toBe(verwachteTitel);
    expect(response.body.userId).toBe(verwachteUserId);
    expect(response.body.id).toBeDefined();
  }

  // Haalt zelf data op via de Interactielaag en doet de validatie
  async controleerBestaandePost(postId: number, verwachteUserId: number) {
    const response = await this.apiClient.getPostById(postId);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(postId);
    expect(response.body.userId).toBe(verwachteUserId);
  }
}
