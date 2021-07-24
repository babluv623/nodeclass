import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  ings: [{ type: String }],
  like: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export const Recipe = mongoose.model("Recipe", recipeSchema);
