import mongoose, { Schema, models, model } from "mongoose";

const PlaceSchema = new Schema({
  name: String,
  location: String,
  image: String,
  images: [String],
  price: Number,
  rating: Number,
  category: String,
});

export default models.Place || model("Place", PlaceSchema);
