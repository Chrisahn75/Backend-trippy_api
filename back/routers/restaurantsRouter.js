const express = require("express");
const router = express.Router();
const data = require("../json/restaurants.json");
const Joi = require("Joi");

const restaurants = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
  stars: Joi.number().min(1).max(5).required(),
  cusine: Joi.string().required(),
  priceCategory: Joi.number().min(1).max(3).required(),
});

function handleRestaurants(req, res, next) {
	restaurantsId = data.find((hotel, test) => {
	  restaurantsNew = test;
	  return hotel.id.toString() === req.params.id.toString();
	});
  
	if (!restaurantsId) {
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
	const restaurantsId = data.find((restaurants) => {
	return restaurants.id.toString() === req.params.id.toString();
	});
	if (!restaurantsId) {
		return res.json({
		  message: "Restaurants not found",
		});
	  }
	  res.json(restaurantsId);
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
  
function validRestaurants(req, res, next) {
	const validation = restaurants.validate(req.body);
	if (validation.error) {
	  return res.status(400).json({
		message: "Error 400",
		description: validation.error.details[0].message,
	  });
	}
	next();
}

router.post("/", validRestaurants, (req, res) => {
	const addRestaurants = {
	  id: data.length + 1,
	  name: req.body.name,
	  address: req.body.address,
	  city: req.body.city,
	  country: req.body.country,
	  stars: req.body.stars,
      cuisine: req.body.cuisine,
	  priceCategory: req.body.priceCategory,
	};
	data.push(addRestaurants);
	res.json({ 
		message: "Restaurants added", 
		description: addRestaurants
	});
});

router.patch("/:id",handleRestaurants, (req, res) => {
	restaurantsId.name = req.body.name;
	res.json({ 
		message: "Update restaurants name ", 
		description: restaurantsId 
	});
});

router.delete("/:id", handleRestaurants, (req, res) => {
	data.splice(restaurantsNew, 1);
	res.json(data);
});

module.exports = router;