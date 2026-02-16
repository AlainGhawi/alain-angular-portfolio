// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// Get your API key at: https://console.cloud.google.com/apis/credentials
// Enable the YouTube Data API v3 in your Google Cloud project.
// For production, use GitHub Secrets or environment variables instead of hardcoding keys.

export const environment = {
  production: false,
  youtubeApiKey: 'YOUR_YOUTUBE_API_KEY_HERE',
  youtubeChannelId: 'UCLYvppaPMnewPjrrETcukyg',
  githubUsername: 'AlainGhawi',
  maxRepositories: 6,
  maxVideos: 10
};
