import { APIRequestContext } from '@playwright/test';

export interface PostResponse {
  status: number;
  body: {
    id?: number;
    title: string;
    body: string;
    userId: number;
  };
}

export class PostApiClient {
  constructor(private request: APIRequestContext) {}

  async createPost(title: string, body: string, userId: number): Promise<PostResponse> {
    const response = await this.request.post('/posts', {
      data: { title, body, userId },
    });

    // Technische foutafhandeling (geen functionele assertion)
    if (response.status() >= 500) {
      throw new Error(`Serverfout bij aanmaken post: HTTP ${response.status()}`);
    }

    return {
      status: response.status(),
      body: await response.json(),
    };
  }

  async getPostById(postId: number): Promise<PostResponse> {
    const response = await this.request.get(`/posts/${postId}`);

    if (response.status() >= 500) {
      throw new Error(`Serverfout bij ophalen post ${postId}: HTTP ${response.status()}`);
    }

    return {
      status: response.status(),
      body: await response.json(),
    };
  }
}
