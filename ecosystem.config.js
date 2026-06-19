require('dotenv').config();

module.exports = {
  apps: [
    {
      name: 'bot-discord',
      script: './dist/index.js',
      instances: 1,
      exec_mode: 'cluster',
      env_production: {
        NODE_ENV: 'production',
        TOKEN: process.env.TOKEN,
        PRIVATE_KEY: process.env.PRIVATE_KEY,
        CLIENT_ID: process.env.CLIENT_ID,
        DISCORD_API_URL: process.env.DISCORD_API_URL,
      },
      // Configuration optionnelle
      max_memory_restart: '1G',
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
    },
  ],
};
