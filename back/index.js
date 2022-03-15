const express = require("express");
const app = express();
// Routers
const hotelsRouter = require("./routers/hotelsRouter");
const restaurantsRouter = require("./routers/restaurantsRouter");

// Middlewares
app.use(express.json());

// Routers
app.use("/hotels", hotelsRouter);
app.use("/restaurants", restaurantsRouter);

// Routes
app.get("/", (_res, res) => {
	res.send(
		"Trippy"
	);
});

app.get("*", (_req, res) => {
	res.status(404).send("Error 404 not found");
});

// Start server
app.listen(8000, () => console.log("Listening on port 8000..."));