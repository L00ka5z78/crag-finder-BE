const config = {
  server: {
    PORT: 3001,
    HOST: 'localhost',
  },
  jsonWebToken: {
    JWT_KEY:
      'hbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY3NzQ4MzcwNCwiaWF0IjoxNjc',
    REFRESH_JWT_KEY: 'refresh_json_web_token_secret_key',
    ACCESS_TOKEN_TIME_TO_LIVE: 50,
    REFRESH_TOKEN_TIME_TO_LIVE: 5000,
  },
  database: {
    USER: 'root',
    PASSWORD: '',
    DATABASE: 'crag_finder',
  },
};

export default config;
