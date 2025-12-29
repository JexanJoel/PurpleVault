const express = require('express');
const Asset = require('../models/Asset');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  const assets = await Asset.find({ userId: req.userId });
  res.json(assets);
});

router.post('/', auth, async (req, res) => {
  const asset = await Asset.create({ ...req.body, userId: req.userId });
  res.json(asset);
});

router.delete('/:id', auth, async (req, res) => {
  await Asset.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

module.exports = router;
