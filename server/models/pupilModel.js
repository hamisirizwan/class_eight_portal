const mongoose = require("mongoose");
const { Schema } = mongoose;

const pupilSchema = new Schema(
  {
    name: { type: String, required: true }, // String is shorthand for {type: String}
    index_no: { type: String, required: true }, // String is shorthand for {type: String}
    contact: { type: String }, // String is shorthand for {type: String}
  },
  { timestamps: true }
);

const Pupil = mongoose.model("Pupil", pupilSchema);

module.exports = Pupil;
