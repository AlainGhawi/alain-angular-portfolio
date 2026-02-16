#!/usr/bin/env node

/**
 * Inject secrets from environment variables into Angular environment files
 * This script runs during CI/CD deployment to inject API keys
 */

const fs = require('fs');
const path = require('path');

const ENV_PROD_PATH = path.join(__dirname, '../src/environments/environment.prod.ts');

// Get secrets from environment variables
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY || 'YOUTUBE_API_KEY';
const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID || 'EMAILJS_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID || 'EMAILJS_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY || 'EMAILJS_PUBLIC_KEY';

// Read the environment file
let content = fs.readFileSync(ENV_PROD_PATH, 'utf8');

// Replace placeholders with actual values
content = content.replace(
  "youtubeApiKey: 'YOUTUBE_API_KEY'",
  `youtubeApiKey: '${YOUTUBE_API_KEY}'`
);

content = content.replace(
  "serviceId: 'EMAILJS_SERVICE_ID'",
  `serviceId: '${EMAILJS_SERVICE_ID}'`
);

content = content.replace(
  "templateId: 'EMAILJS_TEMPLATE_ID'",
  `templateId: '${EMAILJS_TEMPLATE_ID}'`
);

content = content.replace(
  "publicKey: 'EMAILJS_PUBLIC_KEY'",
  `publicKey: '${EMAILJS_PUBLIC_KEY}'`
);

// Write back the modified content
fs.writeFileSync(ENV_PROD_PATH, content, 'utf8');

// Verify injection (without exposing the key)
if (YOUTUBE_API_KEY === 'YOUTUBE_API_KEY') {
  console.warn('⚠️  Warning: YOUTUBE_API_KEY not set in environment variables');
} else {
  console.log('✓ YouTube API key injected');
}

if (EMAILJS_SERVICE_ID === 'EMAILJS_SERVICE_ID' ||
    EMAILJS_TEMPLATE_ID === 'EMAILJS_TEMPLATE_ID' ||
    EMAILJS_PUBLIC_KEY === 'EMAILJS_PUBLIC_KEY') {
  console.warn('⚠️  Warning: EmailJS credentials not set in environment variables');
} else {
  console.log('✓ EmailJS credentials injected');
}
