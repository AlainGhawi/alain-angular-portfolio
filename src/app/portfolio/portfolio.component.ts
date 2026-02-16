import { Component, OnInit } from '@angular/core';
import { GitHubProject, YouTubeVideo, TutorialArticle } from './portfolio.models';
import { YouTubeService } from '../services/youtube.service';
import { GitHubService } from '../services/github.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
  standalone: false
})
export class PortfolioComponent implements OnInit {

  githubProjects: GitHubProject[] = [];
  youtubeVideos: YouTubeVideo[] = [];
  tutorialArticles: TutorialArticle[] = [];

  isLoadingRepos = true;
  isLoadingVideos = true;
  reposError: string | null = null;
  videosError: string | null = null;

  constructor(
    private youtubeService: YouTubeService,
    private githubService: GitHubService
  ) {}

  ngOnInit(): void {
    this.loadGitHubRepositories();
    this.loadYouTubeVideos();
  }

  private loadGitHubRepositories(): void {
    this.isLoadingRepos = true;
    this.reposError = null;

    this.githubService.getUserRepositories(environment.githubUsername, environment.maxRepositories)
      .subscribe({
        next: (repos) => {
          this.githubProjects = repos;
          this.isLoadingRepos = false;
        },
        error: (error) => {
          console.error('Failed to load GitHub repositories:', error);
          this.reposError = 'Failed to load repositories. Please try again later.';
          this.isLoadingRepos = false;
        }
      });
  }

  private loadYouTubeVideos(): void {
    this.isLoadingVideos = true;
    this.videosError = null;

    this.youtubeService.getChannelVideos(environment.youtubeChannelId, environment.maxVideos)
      .subscribe({
        next: (videos) => {
          this.youtubeVideos = videos;
          this.isLoadingVideos = false;
        },
        error: (error) => {
          console.error('Failed to load YouTube videos:', error);
          this.videosError = 'Failed to load videos. Please try again later.';
          this.isLoadingVideos = false;
        }
      });
  }

  getYoutubeUrl(videoId: string): string {
    return this.youtubeService.getYoutubeUrl(videoId);
  }

  getThumbnailUrl(videoId: string): string {
    return this.youtubeService.getThumbnailUrl(videoId, 'medium');
  }
}
