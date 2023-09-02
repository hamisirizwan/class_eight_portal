const Exam = require("../models/examModel");
const Result = require("../models/resultModel");
const Pupil = require("../models/pupilModel");
const Utilities = require("../helpers/utilities")

const addExam = (req, res) => {
  const title = req.body.title;

  if (!title) {
    return res.status(400).json("all field required");
  }

  const exam = new Exam();

  exam.title = title;

  exam
    .save()
    .then((savedExam) => {
      //loop through all pupils, for each pupil add a result.
      Pupil.find()
        .then((pupils) => {
          //loop through the results
          pupils.forEach((pupil) => {
            //add a result
            const result = new Result();
            result.exam_id = savedExam._id;
            result.pupil_id = pupil._id;

            result
              .save()
              .then((savedResult) => {
                console.log(savedResult);
              })
              .catch((err) => {
                console.log(err.message);
              });
          });
          res.status(200).json("exam saved successfully");
        })
        .catch((err) => {
          res.status(400).json(err.message);
        });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(400).json(err.message);
    });
};

const getAllExams = (req, res) => {
  Exam.find({})
    .sort({ createdAt: -1 })
    .exec(function (err, data) {
      if (err) {
        res.status(400).json(err.message);
      } else {
        res.status(200).json({ total: data.length, data });
      }
    });
};

const sendCustomMessage = async (req, res)=>{
  const message = req.body.message

  if(!message){
    return res.status(400).json("message cannot be blank")
  }
  const allPupils = await Pupil.find()

  for(const {contact} of allPupils){
    const phone = `254${contact.substring(1)}`;
    Utilities.sendSms(phone, message);
  }

  res.status(200).json("message sent")
}


module.exports = {
  addExam,
  getAllExams,
  sendCustomMessage
};
