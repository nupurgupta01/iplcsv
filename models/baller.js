var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ballerSchema = new Schema({
  // _id:mongoose.Schema.Types.ObjectId,
  MatchId: { type: Number },
  InningsId:    { type: Number},
  OverId: { type: Number },
  BallId: { type: Number },
  TeamBattingId: { type: Number },
  TeamBowlingId: { type: Number },
  StrikerId: { type: Number },
  StrikerBattingPosition: { type: Number },
  NonStrikerId: { type: Number },
  BowlerId: { type: Number },
  BatsmanScored: { type: Number },
  ExtraType: { type: String },
  ExtraRuns: { type: Number },
  PlayerdissimalId: { type: String },
  DissimalType: { type: String },
  FielderId: { type: String }
  
});
module.exports = mongoose.model('ballers', ballerSchema);