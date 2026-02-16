import { Component, OnInit } from '@angular/core';
import { GitHubProject, YouTubeVideo, TutorialArticle } from './portfolio.models';
import { YouTubeService } from '../services/youtube.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
  standalone: false
})
export class PortfolioComponent implements OnInit {

  githubProjects: GitHubProject[] = [
    {
      name: 'alain-angular-portfolio',
      descriptionKey: 'PORTFOLIO.GITHUB.PROJECT_1_DESC',
      url: 'https://github.com/AlainGhawi/alain-angular-portfolio',
      language: 'TypeScript',
      stars: 0,
      forks: 0
    },
    {
      name: 'placeholder-repo-2',
      descriptionKey: 'PORTFOLIO.GITHUB.PROJECT_2_DESC',
      url: 'https://github.com/AlainGhawi',
      language: 'C#',
      stars: 0,
      forks: 0
    },
    {
      name: 'placeholder-repo-3',
      descriptionKey: 'PORTFOLIO.GITHUB.PROJECT_3_DESC',
      url: 'https://github.com/AlainGhawi',
      language: 'TypeScript',
      stars: 0,
      forks: 0
    }
  ];

  youtubeVideos: YouTubeVideo[] = [];
  tutorialArticles: TutorialArticle[] = [];
  isLoadingVideos = true;
  videosError: string | null = null;

  constructor(private youtubeService: YouTubeService) {}

  ngOnInit(): void {
    this.loadYouTubeVideos();
  }

  private loadYouTubeVideos(): void {
    this.isLoadingVideos = true;
    this.videosError = null;

    this.youtubeService.getChannelVideos(environment.youtubeChannelId, 10)
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
