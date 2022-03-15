const express = require("express");
const router = express.Router();
const data = require("../json/hotels.json");
const Joi = require("joi");

const hotel = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
  stars: Joi.number().min(1).max(5).required(),
  hasSpa: Joi.boolean().required(),
  hasPool: Joi.boolean().required(),
  priceCategory: Joi.number().min(1).max(3).required(),
});


router.get("/", (_req, res) => {
    res.json(data);
});

router.get("/:id", (req, res) => {
	const hotelId = data.find((hotel) => {
	return hotel.id.toString() === req.params.id.toString();
	});
	if (!hotelId) {
		return res.json({
		  message: "Hotel not found",
		});
	  }
	  res.json(hotelId);
});
  
function validHotel(req, res, next) {
	const validation = hotel.validate(req.body);
	if (validation.error) {
	  return res.status(400).json({
		message: "Error 400",
		description: validation.error.details[0].message,
	  });
	}
	next();
}

router.post("/", validHotel, (req, res) => {
	const addHotel = {
	  id: data.length + 1,
	  name: req.body.name,
	  address: req.body.address,
	  city: req.body.city,
	  country: req.body.country,
	  hasSpa: req.body.hasSpa,
	  hasPool: req.body.hasPool,
	  stars: req.body.stars,
	  priceCategory: req.body.priceCategory,
	};
	data.push(addHotel);
	res.json({ 
		message: "Hotel added", 
		description: addHotel 
	});
  });

module.exports = router;