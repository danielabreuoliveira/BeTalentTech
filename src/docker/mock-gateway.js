const express = require("express");

const app = express();

app.use(express.json());

app.post("/charge", (req, res) => {

  if (req.body.amount > 100) {

    return res.status(200).json({
      status: "approved"
    });

  }

  res.status(500).json({
    status: "error"
  });

});

app.listen(4000, () => {
  console.log("Mock gateway running");
});