
db.matchseasons.aggregate([
    { $match: { SeasonId: 1 } },
    { $lookup: { from: "ballers", localField: "MatchId", foreignField: "MatchId", as: "bowlers" } },
    { $lookup: { from: "ballers", localField: "MatchId", foreignField: "PlayerId", as: "playername" }},

    { $project: { _id: 0, MatchId: 1, bowlers: 1 } },
    { $unwind: "$bowlers" },
    {$project: {
        MatchId: 1, "bowlers.BallId": 1, "bowlers.MatchId": 1, "bowlers.BowlerId": 1, "bowlers.BatsmanScored": 1, "bowlers.ExtraRuns": 1
    }}
])

// ballers.find({matchid:{$in:matchids}},{_id:0,BallId:1,BowlerId:1,BatsmanScored:1,ExtraRuns:1,})
        
        // .exec((err,result)=>{
        //     if (err) throw err;
        //     //console.log(result)
        //     ballers.group({})
           
        // })



        // const season = req.query.season
// console.log(season)
// matchSeason.find({SeasonId:season},{_id:0,MatchId:1})
//    .exec((err, result) => {
//         if (err) throw err;
//         //console.log("data "+ matchids);
//         // res.send(JSON.stringify(matchids));
//         let matchids = []
//         //console.log("result "+result)
//         for(let i =0;i<=result.length-1;i++){
//             matchids.push(result[i].matchid)
//         }


        // ballers.aggregate([{$match: { MatchId:{ $in:matchids}}},{$group: { _id: "$BowlerId", totalBalls: {$sum: 1}, runs: {$sum: "$BatsmanScored"}, extraRuns: {$sum: "$ExtraRuns"}}},{
        //     $addFields: { totalRuns:
        //       { $add: [ "$runs", "$extraRuns"] } }
        //   },{
        //     $addFields: { economy:
        //       { $divide: [ "$totalRuns", "$totalBalls"] } }
          //}])
        //   .exec((err,result)=>{
        //         if (err) throw err;
        //         console.log(result)
                
               
        //     })


db.matchseasons.aggregate([
    { $match: { SeasonId: 1 } },
    { $lookup: { from: "ballers", localField: "MatchId", foreignField: "MatchId", as: "bowlers" } },

    { $project: { _id: 0, MatchId: 1, bowlers: 1 } },
    { $unwind: "$bowlers" },
    {
        $project: {
            MatchId: 1, "bowlers.BallId": 1, "bowlers.MatchId": 1, "bowlers.BowlerId": 1, "bowlers.BatsmanScored": 1, "bowlers.ExtraRuns": 1
        }
    },
    { $lookup: { from: "players", localField: "bowlers.BowlerId", foreignField: "PlayerId", as: "playername" } },

    { $unwind: "$playername" },
    {
        $project: {
            MatchId: 1, "bowlers.BallId": 1, "bowlers.MatchId": 1, "bowlers.BowlerId": 1, "bowlers.BatsmanScored": 1, "bowlers.ExtraRuns": 1,
            "playername.PlayerName": 1
        }
    }
    { $group:}
])