
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
    
])
function csvdata(season,x,y){
matchSeason.find({ SeasonId: season }, { _id: 0, MatchId: 1 })
    .exec((err, result) => {
        if (err) throw err;
        //console.log("data "+ matchids);
        // res.send(JSON.stringify(matchids));
        let matchids = []
        console.log("result " + result)
        for (let i = 0; i <= result.length - 1; i++) {
            matchids.push(result[i].MatchId)

        }
        console.log("mid " + matchids)
        ballers.aggregate([{ $match: { MatchId: { $in: matchids } } }, { $group: { _id: "$x", totalBalls: { $sum: 1 }, runs: { $sum: "$BatsmanScored" }, extraRuns: { $sum: "$ExtraRuns" } } }, {
            $addFields: {
                totalRuns:
                    { $add: ["$runs", "$extraRuns"] }
            }
        }, {
            $addFields: {
                overs:
                    { $divide: ["$totalBalls", y] }
            }
        }, {
            $addFields: {
                economy:
                    { $divide: ["$totalRuns", "$overs"] }
            },
        }, { $project: { _id: 1, economy: 1 } }, { $sort: { _id: 1 } }])
            .exec((err, result) => {
                if (err) throw err;
                console.log("economy")
                console.log(result)
                let bowler_temp = []
                for (let i = 0; i <= result.length - 1; i++) {
                    bowler_temp.push(result[i]._id)

                }
                console.log("temp")
                console.log(bowler_temp)
                let sum = 0
                let count = 0

                for (let i = 0; i <= result.length - 1; i++) {
                    sum += result[i].economy
                    count++
                }
                let economyavg = sum / count
                console.log(sum)
                console.log(economyavg)

                player.find({ PlayerId: { $in: bowler_temp } }, { _id: 0, PlayerId: 1, PlayerName: 1 })
                    .exec((err, data) => {
                        if (err) throw err
                        console.log(data)
                        console.log(result)
                        var finalresult = []
                        for (let i = 0; i < result.length - 1; i++) {
                            if (result[i].economy >= economyavg) {
                                if (result[i]._id == data[i].PlayerId) {
                                    var bowlerobj = { "Pname": data[i].PlayerName, "economy": result[i].economy }
                                    finalresult.push(bowlerobj)

                                }
                            }
                        }
                        //console.log("ans ")
                        //console.log(ans[1])
                        res.send(finalresult)
                    })



            })
    })

}
