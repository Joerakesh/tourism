import mongoose, { Schema, model, models } from "mongoose";

const PlaceSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    image: { type: String, required: true }, // Just one simple URL string
    duration: { type: String, default: "3 Days" },
  },
  { timestamps: true }
);

const Place = models.Place || model("Place", PlaceSchema);

export default Place;
