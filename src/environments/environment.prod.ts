// IMPORTANT: For production, use GitHub Secrets or CI/CD environment variables.
// Set the API key via GitHub Actions secrets (YOUTUBE_API_KEY).
// This file should contain placeholder values only - actual secrets should be injected at build time.

export const environment = {
  production: true,
  youtubeApiKey: 'YOUTUBE_API_KEY',
  youtubeChannelId: 'UCLYvppaPMnewPjrrETcukyg',
  githubUsername: 'AlainGhawi',
  maxRepositories: 6,
  maxVideos: 10,
  emailjs: {
    serviceId: 'EMAILJS_SERVICE_ID',
    templateId: 'EMAILJS_TEMPLATE_ID',
    publicKey: 'EMAILJS_PUBLIC_KEY'
  }
};
