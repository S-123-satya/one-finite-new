const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    res.status(200).json(task);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post('/', async (req, res) => {
  const { text } = req.body;
  try {
    const newTask = new Task({ text });
    await newTask.save();
    res.status(201).json({ message: 'Note added successfully', newTask });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).send('Note deleted successfully');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put('/:id', async (req, res) => {
    const { text, completed } = req.body;
  
    try {
      const updatedTask = await Task.findByIdAndUpdate(
        req.params.id,
        { text, completed },
        { new: true }
      );
  
      if (!updatedTask) {
        return res.status(404).send('Task not found');
      }
  
      res.status(200).json(updatedTask);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

module.exports = router;
