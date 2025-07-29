const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const diseaseSuggestionSchema = new Schema({
  disease: { type: String, required: true, unique: true },
  crop: { type: String, required: true },
  suggestion_en: { type: String, required: true },
  suggestion_ta: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('DiseaseSuggestion', diseaseSuggestionSchema); 