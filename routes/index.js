const express = require("express"),
  router = express.Router(),
  fs = require("fs");

const path = "./config/data.json";

router.get("/", (req, res) => {
  fs.readFile(path, (err, logs) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Произошла ошибка");
    }
    const data = JSON.parse(logs);
    res.render("index", {
      title: "Панель управления",
      tg_token: data.tg_token,
      tg_id: data.tg_id,
      ya_token: data.ya_token,
      city_name: data.city_name,
    });
  });
});

router.post("/", (req, res) => {
  const body = req.body;
  console.log(req.body);
  const logs = fs.readFileSync(path);
  const data = JSON.parse(logs);
  switch (body.name) {
    case "params__tg-token":
      data.tg_token = body.value;
      break;
    case "params__tg-id":
      data.tg_id = body.value;
      break;
    case "params__ya-token":
      data.ya_token = body.value;
      break;
    case "params__city-name":
      data.city_name= body.value;
      break;
    default:
      break;
  }
  fs.writeFileSync(path, JSON.stringify(data));
  res.sendStatus(200);
});

module.exports = router;
