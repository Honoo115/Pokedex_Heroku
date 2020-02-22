require("dotenv").config();
const POKEDEX = require("./pokedex.json");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const helmet = require("helmet");

const validTypes = [
  `Bug`,
  `Dark`,
  `Dragon`,
  `Electric`,
  `Fairy`,
  `Fighting`,
  `Fire`,
  `Flying`,
  `Ghost`,
  `Grass`,
  `Ground`,
  `Ice`,
  `Normal`,
  `Poison`,
  `Psychic`,
  `Rock`,
  `Steel`,
  `Water`
];

// Helper functions
validateBearerToken = (req, res, next) => {
  console.log("What exactly is this doing...?");
  debugger;
  next();
};

// function validateBearerToken(req, res, next) {

// }
//////////////////////////////////////

// Middleware assignment

app.use(validateBearerToken);
app.use(cors());
app.use(helmet());
const morganSetting = process.env.NODE_ENV === "production" ? "tiny" : "common";
app.use(morgan(morganSetting));
// Response functions
// function handleGetTypes(req, res) {
//   // console.log(process.env.API_TOKEN)
//   res.json(validTypes);
// }

handleGetTypes = (req, res) => {
  res.json(validTypes);
};

handleGetPokemon = (req, res) => {
  let { name, type } = req.query;

  let data = POKEDEX.pokemon;

  if (name) {
    data = data.filter(pokemon =>
      // case insensitive searching
      pokemon.name.toLowerCase().includes(req.query.name.toLowerCase())
    );
  }

  // filter our pokemon by type if type query param is present
  if (type) {
    data = data.filter(pokemon => pokemon.type.includes(req.query.type));
  }

  res.json({ data });
};

app.get("/types", function handleGetTypes(req, res) {
  res.json(validTypes);
});

app.get("/pokemon", handleGetPokemon);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
