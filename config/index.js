module.exports = {
    port: process.env.PORT || '3001',
    local_client: process.env.LOCAL_CLIENT || process.env.LOCAL_CLIENT_IP,
    remote_client: process.env.REMOTE_CLIENT || process.env.REMOTE_CLIENT_IP,
    allowedDomains:
      process.env.NODE_ENV === 'production'
        ? [process.env.REMOTE_CLIENT, process.env.REMOTE_SERVER_API] || [process.env.REMOTE_CLIENT_IP, process.env.REMOTE_SERVER_API_IP]
        : [process.env.LOCAL_CLIENT, process.env.LOCAL_SERVER_API] || [process.env.LOCAL_CLIENT_IP, process.env.LOCAL_SERVER_API_IP]  ,
    database: {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || '',
      name: process.env.DB_NAME || 'db_clsd',
      dialect: 'mysql',
      pool: {
        max: parseInt(process.env.DB_POOL_MAX) || 5,
        min: parseInt(process.env.DB_POOL_MIN) || 0,
        acquire: parseInt(process.env.DB_POOL_ACQUIRE) || 30000,
        idle: parseInt(process.env.DB_POOL_IDLE) || 10000,
      },
    },
  };
  

