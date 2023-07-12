module.exports = {
    port: process.env.PORT,
    local_client: process.env.LOCAL_CLIENT,
    remote_client: process.env.REMOTE_CLIENT,
    allowedDomains: (process.env.NODE_ENV === 'production' ? [process.env.REMOTE_CLIENT, process.env.REMOTE_SERVER_API] : [process.env.LOCAL_CLIENT, process.env.LOCAL_SERVER_API])
}