const express = require("express");

const port = 3000;
const app = express();

app.get("/heavy", (req, res) => {
  let sum = 0;
  for (let i = 0; i < 1e9; i++) {
    sum += i;
  }
  res.send(`The result of the CPU intensive task is : ${sum}`);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Worker pid=${process.pid}`);
});
