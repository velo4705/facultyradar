const app = require('./faculty-radar-backend/src/app');
const { port } = require('./faculty-radar-backend/src/config/environment');

// Graceful shutdown handling
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully');
    process.exit(0);
});

const serverPort = parseInt(process.env.PORT) || port || 8000;

console.log(`Attempting to listen on port: ${serverPort}`);

const server = app.listen(serverPort, '0.0.0.0', () => {
    console.log(`Faculty Radar Backend running on port ${serverPort}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

server.on('error', (err) => {
    console.error('Server error:', err);
    process.exit(1);
});

module.exports = server;