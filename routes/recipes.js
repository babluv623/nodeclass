import Express from "express";
import { item } from "../sample.js";
import { Recipe } from "../models/recipes.js";
const router = Express.Router();
router.use((req, res, next) => {
  console.log(req.url, "---", Date.now());
  req.time = Date.now();

  next();
});
router
  .route("/")

  .get(async (req, res) => {
    // req.query.ings
    //   ? res.send(
    //       item.find(
    //         (item) =>
    //           `${item.like}` === req.query.like &&
    //           item.ings.includes(req.query.ings)
    //       )
    //     )
    //   : res.send(item);
    let filter = {};
    if (req.query.like) {
      filter.like = req.query.like.toLowerCase();
    }
    if (req.query.ings) {
      filter.ings = { $in: [req.query.ings.toLowerCase()] };
    }
    if (req.query.title) {
      filter.title = new RegExp(req.query.title, "i");
    }
    try {
      const recipes = await Recipe.find(filter);
      res.send(recipes);
    } catch (err) {
      res.send("error", err);
    }
  })
  .post(async (req, res) => {
    const recipe = new Recipe({
      title: req.body.title,
      ings: req.body.ings,
      like: req.body.like,
    });
    try {
      const newRecipe = await recipe.save();
      res.send(newRecipe);
    } catch (err) {
      res.send(err);
    }
  })
  .patch(async (req, res) => {
    console.log(req.body);
    let update = req.body;
    const id = update._id;
    try {
      const newRecipe = await Recipe.findOneAndUpdate(id, update, {
        new: true,
      });
      res.send(newRecipe);
    } catch (err) {
      res.send(err);
    }
  });
router
  .route("/:id")
  .get(async (req, res) => {
    // res.send(item.find((item) => item.id === +req.params.id));

    try {
      const recipes = await Recipe.find({ _id: req.params.id });
      res.send(recipes);
    } catch (err) {
      res.send("error", err);
    }
  })
  .delete(async (req, res) => {
    try {
      const recipes = await Recipe.findById(req.params.id).remove();
      res.json(recipes);
    } catch (err) {
      res.send(err);
    }
  });

// no-restful
// router.route("/delete/:id").post(async (req, res) => {
//   try {
//     const recipes = await Recipe.findById(req.params.id).remove();
//     res.json(recipes);
//   } catch (err) {
//     res.send(err);
//   }
// });
export default router;
