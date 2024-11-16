const express = require('express');
const cors = require('cors');
const reservationController = require('./controllers/reservationController');
const errorHandler = require('./utils/errorHandler');
const config = require('./config/config');

const app = express();

app.use(cors());
app.use(express.json());

// Route principale pour orchestrer une réservation
app.post('/orchestrate-reservation', reservationController.orchestrateReservation);

app.use(errorHandler);

const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Orchestrator running on port ${PORT}`);
});