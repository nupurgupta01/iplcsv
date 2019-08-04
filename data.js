const fs = require("fs");
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/iplcsv1', { useNewUrlParser: true });
mongoose.Promise = global.Promise
var db = mongoose.connection;
const ballers = require('./models/baller.js');
const player=require('./models/player.js')
const matchSeason=require('./models/match.js')
let ballsDeliverd;
let temp;
var m_array;
function read_store(filepath,schemafile){
return fs.readFile(filepath, { encoding: 'utf-8' }, (err, data) => {
    if (err) console.log("err", err)
    // split on rows

    rowsData = data.split("\n");
    //separating header row from rrowsdata
    headers = rowsData[0].split(",").map(i => i.replace('\r', '')).map(i => i.replace('_', '')).map(i => i.replace('_', ''));
    //removing last object as it is extra 
   
    rowsData = rowsData.slice(1)
    .filter((i, index) => (index != rowsData.length - 1))
    .map(i=>i.replace('Do_nothing',0))
    .map(i=>i.replace('NULL',00-00-00))
    
    //loop through each row
    ballsDeliverd=rowsData.map(i=>i.split(",").map(i=>i.replace("\r",'')))
     .reduce((previous, next) => {
         bowler_info = {}

        next.forEach((x, index) => {
            
            bowler_info[headers[index]] = x
        
        })
        // console.info(temp,"x")
        
        const bowler = new schemafile(bowler_info)
        previous.push(bowler)
        return previous
    }, [])
    
    console.time('')
    
    schemafile.insertMany(ballsDeliverd).then(i => {
        console.log("success");

    }).catch(console.error)
})
    
}

// read_store("dataset/Ball.csv",ballers);
// read_store("dataset/Player.csv",player);
// read_store("dataset/Match.csv",matchSeason);

// matchSeason.aggregate([{ $match: { SeasonId: 1}},{ $group: { _id:"$SeasonId", matchIds: {$push: "$MatchId"}}},
// { $project:
//     {  _id: 0,
       
//        match_array:
//           { $map:
//              {
//                 input: "$matchIds",
//                 as: "m_i",
//                 in: { $add: [ "$$m_i", 0 ] }
//              }
//           }
//     }
//  }])
//  .exec((err,data)=>{
//      if (err) console.log('error')
//      m_array=data[0].match_array
//      console.log(m_array)

//  })




    

// function data_info(){ matchSeason.aggregate([{ $match: { SeasonId: 1}},{ $group: { _id:"$SeasonId", matchIds: {$push: "$MatchId"}}}])
// .exec((err, matchids) => {
//     if (err) throw err;
//     console.log(matchids);
// })
// return data
// }
// data_info();

// ballers.aggregate([{$match: { MatchId:{ $in: m_array}}},{$group: { _id: "$BowlerId", totalBalls: {$sum: 1}, runs: {$sum: "$BatsmanScored"}, extraRuns: {$sum: "$ExtraRuns"}}},{
//      $addFields: { totalRuns:
//        { $add: [ "$runs", "$extraRuns"] } }
//    },{
//      $addFields: { economy:
//        { $divide: [ "$totalRuns", "$totalBalls"] } }
//    }])
// .exec((err, matchids) => {
//     if (err) throw err;
//     console.log(matchids);
// })


// ballers.aggregate([{$match: { MatchId: data}},{$group: { _id: "$BowlerId", totalBalls: {$sum: 1}, runs1: {$sum: "$BatsmanScored"},runs:{$multiply:["$run1",6]}, extraRuns: {$sum: "$ExtraRuns"}}}])

ballers.aggregate([{$match: { MatchId:{ $in: [335987, 335988, 335989, 335990, 335991, 335992, 335993,  336045]}}},{$group: { _id: "$BowlerId", totalBalls: {$sum: 1}, runs: {$sum: "$BatsmanScored"}, extraRuns: {$sum: "$ExtraRuns"}}},
{
     $addFields: { totalRuns:
       { $add: [ "$runs", "$extraRuns"] } }
   },
    {
        $addFields: {
            balls:
                { $multiply: ["$totalBalls", 6] }
        }
    },
   {
     $addFields: { economy:
       { $divide: [ "$totalRuns", "$totalBalls"] } }
   },{$project : { _id:1, economy : 1 }}])
   .exec((err, matchids) => {
        if (err) throw err;
        console.log(matchids);
    })
    


db.ballers.aggregate([{ $match: { MatchId: { $in: [335987, 335988, 335989, 335990, 335991, 335992, 335993, 335994, 335995, 335996, 335997, 335998, 335999, 336000, 336001, 336002, 336003, 336004, 336005, 336006, 336007, 336008, 336009, 336010, 336011, 336012, 336013, 336014, 336015, 336016, 336017, 336018, 336019, 336020, 336021, 336022, 336023, 336024, 336025, 336026, 336027, 336028, 336029, 336030, 336031, 336032, 336033, 336034, 336036, 336037, 336038, 336039, 336040, 336041, 336042, 336043, 336044, 336045, 335987, 335988, 335989, 335990, 335991, 335992, 335993, 335994, 335995, 335996, 335997, 335998, 335999, 336000, 336001, 336002, 336003, 336004, 336005, 336006, 336007, 336008, 336009, 336010, 336011, 336012, 336013, 336014, 336015, 336016, 336017, 336018, 336019, 336020, 336021, 336022, 336023, 336024, 336025, 336026, 336027, 336028, 336029, 336030, 336031, 336032, 336033, 336034, 336036, 336037, 336038, 336039, 336040, 336041, 336042, 336043, 336044, 336045, 335987, 335988, 335989, 335990, 335991, 335992, 335993, 335994, 335995, 335996, 335997, 335998, 335999, 336000, 336001, 336002, 336003, 336004, 336005, 336006, 336007, 336008, 336009, 336010, 336011, 336012, 336013, 336014, 336015, 336016, 336017, 336018, 336019, 336020, 336021, 336022, 336023, 336024, 336025, 336026, 336027, 336028, 336029, 336030, 336031, 336032, 336033, 336034, 336036, 336037, 336038, 336039, 336040, 336041, 336042, 336043, 336044, 336045, 335987, 335988, 335989, 335990, 335991, 335992, 335993, 335994, 335995, 335996, 335997, 335998, 335999, 336000, 336001, 336002, 336003, 336004, 336005, 336006, 336007, 336008, 336009, 336010, 336011, 336012, 336013, 336014, 336015, 336016, 336017, 336018, 336019, 336020, 336021, 336022, 336023, 336024, 336025, 336026, 336027, 336028, 336029, 336030, 336031, 336032, 336033, 336034, 336036, 336037, 336038, 336039, 336040, 336041, 336042, 336043, 336044, 336045, 335987, 335988, 335989, 335990, 335991, 335992, 335993, 335994, 335995, 335996, 335997, 335998, 335999, 336000, 336001, 336002, 336003, 336004, 336005, 336006, 336007, 336008, 336009, 336010, 336011, 336012, 336013, 336014, 336015, 336016, 336017, 336018, 336019, 336020, 336021, 336022, 336023, 336024, 336025, 336026, 336027, 336028, 336029, 336030, 336031, 336032, 336033, 336034, 336036, 336037, 336038, 336039, 336040, 336041, 336042, 336043, 336044, 336045] } } }, { $group: { _id: "$BowlerId", totalBalls: { $sum: 1 }, runs: { $sum: "$BatsmanScored" }, extraRuns: { $sum: "$ExtraRuns" } } }, {
    $addFields: {
        totalRuns:
            { $add: ["$runs", "$extraRuns"] }
    }
}, {
    $addFields: {
        economy:
            { $divide: ["$totalRuns", "$totalBalls"] }
    }
}, { $addFields: { div: { $multiply: ["$economy", 6] } } }, { $project: { _id: 1, economy: 1 } }])
