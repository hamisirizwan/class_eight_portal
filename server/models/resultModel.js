const mongoose = require("mongoose");
const { Schema } = mongoose;

const resultSchema = new Schema(
  {
    math: { type: String, required: true, default: "0" },
    eng: { type: String, required: true, default: "0" },
    kis: { type: String, required: true, default: "0" },
    sci: { type: String, required: true, default: "0" },
    sst: { type: String, required: true, default: "0" },
    total: { type: String, required: true, default: "0" },
    exam_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Exam",
    },
    pupil_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Pupil",
    },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Result = mongoose.model("Result", resultSchema);

module.exports = Result;
