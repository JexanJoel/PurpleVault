const mongoose = require('mongoose');

const AssetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  assetName: String,
  assetType: String,
  buyValue: Number
});

module.exports = mongoose.model('Asset', AssetSchema);
