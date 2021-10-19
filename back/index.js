const express = require("express");
const fetch = require("node-fetch");
const app = express();
var cors = require("cors");
const port = 3001;

app.use(
  cors({
    origin: "http://84.201.170.215:3000",
  })
);
// app.use(cors())

app.get("/getJson", (req, res) => {
  const { lan, lat } = req.query;
  console.log(lan, lat);
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lan}&exclude={part}&appid=8572c63895af038c1944ad5496049405&units=metric`
  )
    .then((res) => res.text())
    .then((body) => {
      console.log(JSON.parse(body));
      res.send({
        data: JSON.parse(body),
      });
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
