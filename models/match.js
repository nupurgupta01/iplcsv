const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const matchSchema = new Schema({
    MatchId: { type: Number },
    MatchDate:    { type: Date},
    TeamNameId: { type: Number },
    OpponentTeamId: { type: Number },
    SeasonId: { type: Number },
    TossWinnerId: { type: Number },
    TossDecision:{ type: String },
    ISSuperover:{ type: Number },
    ISResult:{ type: Number },
    IsDuckWorthLewis:{ type: Number },
    WinType:{ type: String },
    WonBy:{ type: Number },
    MatchWinnerId:{ type: Number },
    ManOfTheMatchId:{ type: Number },
    FirstUmpireId:{ type: Number },
    SecondUmpireId:{ type: Number },
    CityName:{ type: String },
    HostCountry:{ type: String },
  })
  module.exports=mongoose.model('matchSeason',matchSchema)




