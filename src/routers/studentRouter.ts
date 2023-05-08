import express from 'express';
import { Student } from '../models/studentModel.js';

export const studentRouter = express.Router();


/////////////////////////////////// POST  ///////////////////////////////////////

studentRouter.post('/students', async (req, res) => {
  const student = new Student(req.body);

  try {
    await student.save();
    return res.status(201).send(student);
  } catch (error) {
    return res.status(500).send({msg: "No se añadió correctamente el estudiante", error: error});
  }

});


/////////////////////////////////// GET  ///////////////////////////////////////


studentRouter.get('/students', async (req, res) => {
  const filter = req.query.nombre ? {nombre: req.query.nombre.toString()} : {};

  try {
    const students = await Student.find(filter);

    if (students.length !== 0) {
      return res.send(students);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send(error);
  }
});




studentRouter.get('/students/:id', async (req, res) => {
  try {
    const students = await Student.find( { asignaturas: { $in : req.params.id } });

    if (students.length !== 0) {
      return res.send(students);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send(error);
  }
});



/////////////////////////////////// DELETE  ///////////////////////////////////////


studentRouter.delete('/students/:email', async (req, res) => {
  try {
    const student = await Student.findOneAndDelete({
      email: req.params.email
    })
    if (student) {
      return res.send(student);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send(error);
  }
});


/////////////////////////////////// PATCH  ///////////////////////////////////////

studentRouter.patch('/students/:email', async (req, res) => {
  try {

    const allowedUpdates = ['nombre', 'apellidos', 'edad', 'email', 'asignaturas'];
    const actualUpdates = Object.keys(req.body);
    const isValidUpdate = actualUpdates.every((update) => allowedUpdates.includes(update));

    if (!isValidUpdate) {
      return res.status(400).send({
        error: 'Los parámetros introducidos no son válidos',
      });
    }

    const student = await Student.findOneAndUpdate({
      email: req.params.email
    },
    req.body,
    {
      new: true,
      runValidators: true
    });

    if (student) {
      return res.send(student);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send(error);
  }
});