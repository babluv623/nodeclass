// import { item } from "./sample.js";
// console.log("hello");
// app();
import router from "./routes/recipes.js";
import Express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { Recipe } from "./models/recipes.js";

const url = "mongodb://localhost/RecipeData";

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const con = mongoose.connection;
con.on("open", () => {
  console.log("mongodb connected");
});

const app = Express();
const port = 3200;
app.use(cors());
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use("/recipes", router);

app.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.send(recipes);
  } catch (err) {
    res.send("error", err);
  }
});

app.listen(port, () => console.log("started"));
