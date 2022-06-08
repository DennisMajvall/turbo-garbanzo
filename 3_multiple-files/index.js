// Perform "on-startup actions" (file-generators, .env etc)
// Connect to databases etc
// Attach Process Signal Listeners for graceful shutdown etc

const { expressListen } = require('./express');

expressListen();
