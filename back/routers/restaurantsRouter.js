const express = require("express");
const router = express.Router();
const data = require("../json/restaurants.json");

router.get("/", (_req, res) => {
    res.json(data);
});

router.get("/:id", (req, res) => {
	const restaurantsId = data.find((restaurants) => {
	return restaurants.id.toString() === req.params.id.toString();
	});
	if (!restaurantsId) {
		return res.json({
		  message: "Restaurant not found",
		});
	  }
	  res.json(restaurantsId);
  });
  

module.exports = router;