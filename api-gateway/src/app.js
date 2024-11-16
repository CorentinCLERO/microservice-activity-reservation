const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const config = require('./config/config');

const app = express();

// Middleware de base
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', routes);

// Gestion des erreurs
app.use(errorHandler);

const PORT = config.port;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});