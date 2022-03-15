const express = require("express");
const router = express.Router();
const data = require("../json/hotels.json");
const Joi = require("Joi");

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

function handleHotel(req, res, next) {
	hotelId = data.find((hotel, test) => {
	  hotelNew = test;
	  return hotel.id.toString() === req.params.id.toString();
	});
  
	if (!hotelId) {
	  return res.status(400).json({
		error: "Error 400",
		description: `${req.params.id} id does not exists`,
	  });
	}
	next();
}

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

router.get("/country/:country", (req, res) => {
	const country = req.params.country;
  
	const filterCountry = data.filter(
		(i) => i.country.toString() === country.toString()
	);
	if (filterCountry.length < 1) {
	  return res.json({
		error: `${country} not found `,
	  });
	}
	res.json(filterCountry);
});
  
router.get("/priceCategory/:priceCategory", (req, res) => {
	const priceCategory = req.params.priceCategory;

	const filterPrice = data.filter(
	  (i) => i.priceCategory.toString() === priceCategory.toString()
	);
	if (filterPrice.length < 1) {
	  return res.json({
		error: `Error. ${priceCategory} is unavailable`,
	  });
	}
	res.json(filterPrice);
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

router.patch("/:id",handleHotel, (req, res) => {
	hotelId.name = req.body.name;
	res.json({ 
		message: "Update hotel name ", 
		description: hotelId 
	});
});

router.delete("/:id", handleHotel, (req, res) => {
	data.splice(hotelNew, 1);
	res.json(data);
});

module.exports = router;