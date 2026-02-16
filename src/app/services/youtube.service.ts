import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

export interface YouTubeApiVideo {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    description: string;
    publishedAt: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
  };
}

export interface YouTubeApiResponse {
  items: YouTubeApiVideo[];
}

export interface ProcessedVideo {
  videoId: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnailUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class YouTubeService {
  private readonly API_URL = 'https://www.googleapis.com/youtube/v3';

  constructor(private http: HttpClient) {}

  /**
   * Fetches the latest videos from a YouTube channel
   * @param channelId - YouTube channel ID
   * @param maxResults - Maximum number of videos to fetch (default: 10)
   * @returns Observable of processed videos sorted by publish date (newest first)
   */
  getChannelVideos(channelId: string, maxResults: number = 10): Observable<ProcessedVideo[]> {
    const params = new HttpParams()
      .set('part', 'snippet')
      .set('channelId', channelId)
      .set('order', 'date')
      .set('type', 'video')
      .set('maxResults', maxResults.toString())
      .set('key', environment.youtubeApiKey);

    return this.http.get<YouTubeApiResponse>(`${this.API_URL}/search`, { params })
      .pipe(
        map(response => this.processVideos(response.items))
      );
  }

  /**
   * Processes raw YouTube API response into a cleaner format
   */
  private processVideos(items: YouTubeApiVideo[]): ProcessedVideo[] {
    return items.map(item => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      publishedAt: item.snippet.publishedAt,
      thumbnailUrl: item.snippet.thumbnails.medium.url
    }));
  }

  /**
   * Generates a YouTube watch URL from a video ID
   */
  getYoutubeUrl(videoId: string): string {
    return `https://www.youtube.com/watch?v=${videoId}`;
  }

  /**
   * Gets the thumbnail URL for a video
   * @param quality - Thumbnail quality: 'default', 'medium' (mqdefault), 'high' (hqdefault), 'max' (maxresdefault)
   */
  getThumbnailUrl(videoId: string, quality: 'default' | 'medium' | 'high' | 'max' = 'medium'): string {
    const qualityMap = {
      default: 'default',
      medium: 'mqdefault',
      high: 'hqdefault',
      max: 'maxresdefault'
    };
    return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}.jpg`;
  }
}
