import express from 'express';
import { Course } from '../models/courseModel.js';
import { Student } from '../models/studentModel.js';

export const courseRouter = express.Router();


/////////////////////////////////// POST  ///////////////////////////////////////

courseRouter.post('/courses', async (req, res) => {
  const course = new Course(req.body);

  try {
    await course.save();
    return res.status(201).send(course);
  } catch (error) {
    return res.status(500).send({msg: "No se añadió correctamente el usuario", error: error});
  }

});


/////////////////////////////////// GET  ///////////////////////////////////////

courseRouter.get('/courses', async (req, res) => {
  const filter = req.query.nombre ? {nombre: req.query.nombre.toString()} : {};

  try {
    const course = await Course.find(filter);

    if (course.length !== 0) {
      return res.send(course);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send(error);
  }
});



/////////////////////////////////// DELETE  ///////////////////////////////////////


courseRouter.delete('/courses/:id', async (req, res) => {
  try {
    const course = await Course.findOneAndDelete({
      _id: req.params.id
    })
    if (course) {
      return res.send(course);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send(error);
  }
});


/////////////////////////////////// PATCH  ///////////////////////////////////////

courseRouter.patch('/courses/:id', async (req, res) => {
  try {

    const allowedUpdates = ['nombre', 'descripcion'];
    const actualUpdates = Object.keys(req.body);
    const isValidUpdate = actualUpdates.every((update) => allowedUpdates.includes(update));

    if (!isValidUpdate) {
      return res.status(400).send({
        error: 'Los parámetros introducidos no son válidos',
      });
    }

    const course = await Course.findOneAndUpdate({
      _id: req.params.id
    },
    req.body,
    {
      new: true,
      runValidators: true
    });

    if (course) {
      return res.send(course);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send(error);
  }
});