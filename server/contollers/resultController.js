const Result = require("../models/resultModel");
const Pupil = require("../models/pupilModel");
const Exam = require("../models/examModel");
const Utilities = require("../helpers/utilities");
const XLSX = require('xlsx');
const path = require('path');

const addResult = async (req, res) => {
  const { math, eng, kis, sci, sst, pupil_id, exam_id } = req.body;

  if (!math || !eng || !kis || !sci || !sst || !pupil_id || !exam_id) {
    return res.status(400).json("all fields required");
  }

  //todo : check if the result exists

  //NEW where in mongoose

  const existingResult = await Result.findOne({
    pupil_id: pupil_id,
  })
    .where("exam_id")
    .equals(exam_id);

  // console.log(existingResult);

  if (existingResult) {
    return res.status(400).json("The result for the pupil is already added");
  }

  const total =
    parseInt(math) +
    parseInt(eng) +
    parseInt(kis) +
    parseInt(sci) +
    parseInt(sst);

  const result = new Result();

  result.math = math;
  result.eng = eng;
  result.kis = kis;
  result.sci = sci;
  result.sst = sst;
  result.total = total;
  result.exam_id = exam_id;
  result.pupil_id = pupil_id;

  result
    .save()
    .then((savedResult) => {
      res
        .status(201)
        .json({ message: "results added successfully", savedResult });
    })
    .catch((err) => {
      res.status(400).json(err.message);
    });
};

const getAllExamResult = (req, res) => {
  const id = req.params.id;
  //   console.log(id);

  Result.find({ exam_id: id })
    .populate("pupil_id")
    .then((data) => {
      res.status(200).json({ totalKids: data.length, data });
    })
    .catch((err) => {
      res.status(400).json(err.message);
    });
};

const sendExamResults = async (req, res) => {
  const id = req.params.id;
  Result.find({ exam_id: id })
    .sort({ total: "desc" })
    .then((results) => {
      //   res.status(200).json({ totalKids: results.length, results });
      results.forEach(async (result, index) => {
        const pupil = await Pupil.findById(result.pupil_id);
        if (!pupil) {
          return res.json("pupil not found");
        }
        const name = pupil.name;
        const index_no = pupil.index_no;
        const contact = pupil.contact;

        const exam = await Exam.findById(result.exam_id);
        if (!exam) {
          return res.json("pupil not found");
        }
        const title = exam.title;
        const position = index + 1;
        const note =
          "Be reminded to pay exam money(100) by tomorrow if you have not.";
        const teacher = "Class Tr : 0796755945";
        const msg = `${title}\nname: ${name}\nindex: ${index_no} \nMATH ${result.math} ENG ${result.eng} KIS ${result.kis} SCI ${result.sci} SST ${result.sst} \nTOTAL: ${result.total}/500\nPOSITION: ${position}/${results.length}\n${teacher}`;
        // console.log(msg);
        //send msg
        const phone = `254${contact.substring(1)}`;
        Utilities.sendSms(phone, msg);

        // const finalMsg = `I, Tr. Hamisi, on behalf of the Brightstar Staff wish all my Candidates Success in their Exams\nIt has been my great honour being a class teacher to your child for the past 4 years.\n I believe i did my best to handle your child to the best of my ability. \n They have been good children all along and hoping they will continue with the same. \n Lets keep constant communication even when they leave my hands. \n They will forever be in my heart.`;

        // setTimeout(Utilities.sendSms(phone, finalMsg), 60000);
      });
      res.status(200).json({ totalKids: results.length, results });
    })
    .catch((err) => {
      res.status(400).json(err.message);
    });
};

//update result
const updateResult = async (req, res) => {
  const id = req.params.id;
  // console.log(id);

  const { math, eng, kis, sci, sst } = req.body;

  if (!math || !eng || !kis || !sci || !sst) {
    return res.status(400).json("all fields required");
  }
  const total =
    parseInt(math) +
    parseInt(eng) +
    parseInt(kis) +
    parseInt(sci) +
    parseInt(sst);

  Result.findOneAndUpdate(
    { _id: id },
    {
      math: math,
      eng: eng,
      kis: kis,
      sci: sci,
      sst: sst,
      total: total,
      completed: true,
    },
    { new: true }
  )
    .then((newResult) => {
      res.status(200).json({ message: "result added successfully", newResult });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(400).json(err.message);
    });
};

//bulk upload results
const bulkUpload = async (req, res) => {
  try {
    const filePath = path.join(__dirname, '..', 'uploads', 'exam.xlsx');

    // Read the Excel file
    const workbook = XLSX.readFile(filePath);

    // Assuming you want to read data from the first sheet (index 0)
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Convert the worksheet to an array of objects
    const data = XLSX.utils.sheet_to_json(worksheet);

    // Send the data as a response
    res.json(data);
  } catch (error) {
    console.error("Error processing Excel file:", error);
    res.status(500).json({ error: "Error processing Excel file" });
  }
};
//get unfilled exam result
const getUncompleteResults = async (req, res) => {
  id = req.params.id;
  // get all results where examid is the id

  Result.find({ exam_id: id, completed: false })
    .populate("pupil_id")
    .then((results) => {
      res.status(200).json({ count: results.length, results });
    })
    .catch((err) => {
      res.status(400).json(err.message);
    });
};

module.exports = {
  addResult,
  getAllExamResult,
  sendExamResults,
  updateResult,
  getUncompleteResults,
  bulkUpload
};
