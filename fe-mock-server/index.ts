
const mockAuthorizePaymentResponse = require('./../src/app/container-components/authorize-payment/mocks/authorize-payment.mocks.json');
const mockCancelPaymentResponse = require('./../src/app/container-components/cancel-payment/mocks/cancel-payment.mocks.json');

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const corsOptions = {
  origin: '*',
  credentials: true
};

app.listen(3003);
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.post('/payments', async (request, response) => {
  await sleep(2000);
  response.json(mockAuthorizePaymentResponse);
});

function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}
app.post('/payments/authorizations/cancellations/eyJrIjoiazNhYjYzMiJ9', (request, response) => {
  response.json(mockCancelPaymentResponse);
});
