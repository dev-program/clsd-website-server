module.exports = {
    port: process.env.PORT,
    local_client: process.env.LOCAL_CLIENT,
    remote_client: process.env.REMOTE_CLIENT,
    allowedDomains:
      process.env.NODE_ENV === 'production'
        ? [process.env.REMOTE_CLIENT, process.env.REMOTE_SERVER_API]
        : [process.env.LOCAL_CLIENT, process.env.LOCAL_SERVER_API],
    database: {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || '',
      name: process.env.DB_NAME,
      dialect: 'mysql',
      pool: {
        max: parseInt(process.env.DB_POOL_MAX) || 5,
        min: parseInt(process.env.DB_POOL_MIN) || 0,
        acquire: parseInt(process.env.DB_POOL_ACQUIRE) || 30000,
        idle: parseInt(process.env.DB_POOL_IDLE) || 10000,
      },
    },
  };
  

