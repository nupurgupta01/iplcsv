const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const playerSchema = new Schema({
   PlayerId: { type: Number },
  PlayerName:    { type: String},
  DOB: { type: Date },
  BattingHand: { type: String },
  BowlingSkill: { type: String },
  Country: { type: String },
  IsUmpire: { type: Number },
  })
  module.exports=mongoose.model('player',playerSchema)


