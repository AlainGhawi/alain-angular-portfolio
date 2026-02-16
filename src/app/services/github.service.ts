import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  created_at: string;
  updated_at: string;
  topics: string[];
}

export interface ProcessedRepo {
  name: string;
  description: string;
  url: string;
  language: string;
  stars: number;
  forks: number;
  topics: string[];
  updatedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class GitHubService {
  private readonly API_URL = 'https://api.github.com';

  constructor(private http: HttpClient) {}

  /**
   * Fetches public repositories for a GitHub user
   * @param username - GitHub username
   * @param maxResults - Maximum number of repositories to fetch (default: 10)
   * @returns Observable of processed repositories sorted by last updated
   */
  getUserRepositories(username: string, maxResults: number = 10): Observable<ProcessedRepo[]> {
    const params = new HttpParams()
      .set('sort', 'updated')
      .set('direction', 'desc')
      .set('per_page', maxResults.toString());

    return this.http.get<GitHubRepo[]>(`${this.API_URL}/users/${username}/repos`, { params })
      .pipe(
        map(repos => this.processRepositories(repos))
      );
  }

  /**
   * Processes raw GitHub API response into a cleaner format
   */
  private processRepositories(repos: GitHubRepo[]): ProcessedRepo[] {
    return repos.map(repo => ({
      name: repo.name,
      description: repo.description || 'No description available',
      url: repo.html_url,
      language: repo.language || 'Unknown',
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      topics: repo.topics || [],
      updatedAt: repo.updated_at
    }));
  }

  /**
   * Fetches a specific repository by name
   */
  getRepository(username: string, repoName: string): Observable<ProcessedRepo> {
    return this.http.get<GitHubRepo>(`${this.API_URL}/repos/${username}/${repoName}`)
      .pipe(
        map(repo => this.processRepositories([repo])[0])
      );
  }
}
