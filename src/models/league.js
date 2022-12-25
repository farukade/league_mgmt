const mongoose = require("mongoose");

const leagueSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "name is required"], unique: true, trim: true },
  },
  {
    timestamps: true,
  },
);

const League = mongoose.model("league", leagueSchema);

module.exports = League;
