const express = require("express");
const rootRouter = express.Router();

//controllers imports
const examController = require("../contollers/examController");
const pupilController = require("../contollers/pupilController");
const resultController = require("../contollers/resultController");
const Exam = require("../models/examModel");
const Pupil = require("../models/pupilModel");
const Result = require("../models/resultModel");

//define routes and corresponding controllers

//EXAM ROUTES
rootRouter.post("/exam", examController.addExam);
rootRouter.get("/exam", examController.getAllExams);
rootRouter.post("/custom-message", examController.sendCustomMessage)

//PUPIL ROUTES
rootRouter.post("/pupil", pupilController.addPupil);
rootRouter.get("/pupils", pupilController.getAllPupils);
rootRouter.delete("/pupil/:id", pupilController.deletePupil);

//RESULT ROUTES
rootRouter.post("/result", resultController.addResult);
rootRouter.get("/result/:id", resultController.getAllExamResult);
rootRouter.put("/result/:id", resultController.updateResult);
rootRouter.get("/sendresult/:id", resultController.sendExamResults);
rootRouter.get("/result/uncomplete/:id", resultController.getUncompleteResults);
// rootRouter.get("/examresults/:id", resultController.getAllPupilNotRecorded);

//RESET FUNCTION

// rootRouter.get("/reset", (req, res) => {
//   Pupil.deleteMany().then(() => {
//     console.log("all pupils deleted");
//     Result.deleteMany().then(() => {
//       console.log("all results deleted");
//       Exam.deleteMany().then(() => {
//         console.log("all results deleted");
//         res.send("reset complete");
//       });
//     });
//   });
// });

module.exports = rootRouter;
