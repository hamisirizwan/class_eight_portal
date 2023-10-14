const Exam = require("../models/examModel");
const Result = require("../models/resultModel");
const Pupil = require("../models/pupilModel");
const Utilities = require("../helpers/utilities");
const generatePDF = require("../helpers/generate_pdf");

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

const analyseResults = async (req, res)=>{
  try {
    const pupils = await Pupil.find()
    let lastExamResults = null


    const result = []
    for (const pupil of pupils){
      const requiredJson = {
        name:pupil.name,
        indexNo:pupil.index_no,
        contact:pupil.contact,
        exams:[],
        currentExamMarks:null,
        currentExamRank:null
      }
      
      
      const exams = await Exam.find()
 
      lastExamId = exams[exams.length - 1]._id

      while(lastExamResults === null){
        // console.log("running here")
        lastExamResults = await Result.find({ exam_id: lastExamId })
        .sort({ total: "desc" }).populate("pupil_id")
      }

      
      for(const exam of exams) {
        const title = exam.title.split(" ")
        let examData = {
          name:`${title[title.length - 2]} ${title[title.length - 1]}`,
        }

        // console.log(examData.name)
        const results = await Result.findOne({
          exam_id:exam._id,
          pupil_id:pupil._id
        })

        const dataFromExam = {
          math:results.math,
          eng:results.eng,
          kis:results.kis,
          sci:results.sci,
          sst:results.sst,
          total:results.total
        }
        examData = {...examData, ...dataFromExam}
        requiredJson.exams.push(examData)
      }

    
      for (const result of lastExamResults) {
        if (result.pupil_id.name === requiredJson.name) {
          requiredJson.currentExamMarks = result.total;
          // Calculate the current exam rank
          const rank = lastExamResults.findIndex((r) => r.pupil_id.name === requiredJson.name) + 1;
          const totalPupils = lastExamResults.length;
          requiredJson.currentExamRank = `${rank}/${totalPupils}`;
          break; // Break the loop once we find the pupil's result
        }
      }
      result.push(requiredJson)
    }

   await generatePDF(result,req,res)
    // res.json(result)
  } catch (error) {
    console.log(error)
    res.status(500).json(error.message)
  }
}

module.exports = {
  addExam,
  getAllExams,
  sendCustomMessage,
  analyseResults
};
