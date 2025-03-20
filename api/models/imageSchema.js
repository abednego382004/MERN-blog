import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  url: { type: String, required: true }, // Cloudinary image URL
  public_id: { type: String, required: true }, // Cloudinary image ID (for deleting)
  createdAt: { type: Date, default: Date.now },
});

const Image = mongoose.model("Image", ImageSchema);

export default Image;
