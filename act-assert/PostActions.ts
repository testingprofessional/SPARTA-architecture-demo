import { APIRequestContext } from '@playwright/test';
import { PostApiClient, PostResponse } from '../interactie/PostApiClient';

export class PostActions {
  private apiClient: PostApiClient;

  constructor(request: APIRequestContext) {
    this.apiClient = new PostApiClient(request);
  }

  async maakNieuwePostAan(title: string, body: string, userId: number): Promise<PostResponse> {
    return await this.apiClient.createPost(title, body, userId);
  }
}
