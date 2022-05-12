import { config } from 'firebase-functions';

export default () => {
  const cfg = config();

  return {
    database: {
      host: cfg.database.host,
      port: +cfg.database.port,
      username: cfg.database.username,
      password: cfg.database.password,
      database: cfg.database.database,
    },
  };
};
