const Pupil = require("../models/pupilModel");

const addPupil = async (req, res) => {
  const { name, index_no, contact } = req.body;

  if (!name || !index_no) {
    res.status(400).json("all fields required");
  }

  const existingPupil = await Pupil.findOne({ index_no: index_no });
  //   console.log(existingPupil);

  if (existingPupil) {
    return res.status(400).json("pupil with the index no already exists");
  }

  const pupil = new Pupil();

  pupil.name = name;
  pupil.index_no = index_no;
  pupil.contact = contact;

  pupil
    .save()
    .then((savedPupil) => {
      res.status(201).json(savedPupil);
    })
    .catch((err) => {
      res.status(400).json(err.message);
    });
};

//delete
const deletePupil = (req, res) => {
  const id = req.params.id;

  Pupil.findOneAndDelete({ _id: id })
    .then((resp) => {
      res.status(200).json({ message: "deleted successfullly", resp });
    })
    .catch((err) => console.log(err.message));
};

const getAllPupils = (req, res) => {
  Pupil.find({})
    .sort({ createdAt: -1 })
    .exec(function (err, data) {
      if (err) {
        res.status(400).json(err.message);
      } else {
        res.status(200).json({ total: data.length, data });
      }
    });
};

module.exports = {
  addPupil,
  getAllPupils,
  deletePupil,
};
