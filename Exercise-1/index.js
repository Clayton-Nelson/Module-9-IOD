const express = require("express");
const app = express();
port = 3000

app.use('/', express.static('public'))

// import all calculator routes (up top)
const calculatorRoutes =
require('./routes/calculatorRoutes');

// map the calculator routes to our app
app.use('/calculator', calculatorRoutes)

app.listen(port, () => {
    console.log(`Example app listening
  at http://localhost:${port}`);
});