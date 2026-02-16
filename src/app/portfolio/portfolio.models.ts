export interface GitHubProject {
  name: string;
  descriptionKey: string;
  url: string;
  language: string;
  stars: number;
  forks: number;
}

export interface YouTubeVideo {
  videoId: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnailUrl?: string;
}

export interface TutorialArticle {
  titleKey: string;
  summaryKey: string;
  categoryKey: string;
  date: string;
  url: string;
}
