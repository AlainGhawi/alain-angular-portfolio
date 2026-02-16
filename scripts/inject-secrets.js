#!/usr/bin/env node

/**
 * Inject secrets from environment variables into Angular environment files
 * This script runs during CI/CD deployment to inject API keys
 */

const fs = require('fs');
const path = require('path');

const ENV_PROD_PATH = path.join(__dirname, '../src/environments/environment.prod.ts');

// Get secrets from environment variables
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY || 'YOUR_YOUTUBE_API_KEY_HERE';

// Read the environment file
let content = fs.readFileSync(ENV_PROD_PATH, 'utf8');

// Replace placeholders with actual values
content = content.replace(
  "youtubeApiKey: 'YOUR_YOUTUBE_API_KEY_HERE'",
  `youtubeApiKey: '${YOUTUBE_API_KEY}'`
);

// Write back the modified content
fs.writeFileSync(ENV_PROD_PATH, content, 'utf8');

// Verify injection (without exposing the key)
if (YOUTUBE_API_KEY === 'YOUR_YOUTUBE_API_KEY_HERE') {
  console.warn('⚠️  Warning: YOUTUBE_API_KEY not set in environment variables');
} else {
  console.log('✓ YouTube API key injected');
}
