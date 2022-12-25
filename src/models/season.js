const mongoose = require("mongoose");

const SeasonSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "name is required"], unique: true, trim: true },
    start: { type: Date, required: [true, "start date is required"] },
    end: { type: Date, required: [true, "end date is required"] },
  },
  {
    timestamps: true,
  },
);

const Season = mongoose.model("season", SeasonSchema);

module.exports = Season;
