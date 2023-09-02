const mongoose = require("mongoose");
const { Schema } = mongoose;

const examSchema = new Schema(
  {
    title: { type: String, required: true }, // String is shorthand for {type: String}
  },
  { timestamps: true }
);

const Exam = mongoose.model("Exam", examSchema);

module.exports = Exam;
