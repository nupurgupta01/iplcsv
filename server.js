var express = require('express');
var mongoose = require('mongoose');
var fs = require('fs');

var bodyparser = require('body-parser');
var cookieparser = require('cookie-parser');

var cors = require('cors')
var app = express();

app.use(cors());
app.use(bodyparser.json());
app.use(cookieparser());
app.use(express.static('public'));
app.use(bodyparser.urlencoded({
    extended: false
}));

app.use(express.static('public'));
mongoose.connect('mongodb://localhost:27017/iplcsv1', { useNewUrlParser: true });
mongoose.Promise = global.Promise
var db = mongoose.connection;
const ballers = require('./models/baller.js');
const player = require('./models/player.js')
const matchSeason = require('./models/match.js')
let ballsDeliverd;
let temp;
var m_array;
function read_store(filepath, schemafile) {
    return fs.readFile(filepath, { encoding: 'utf-8' }, (err, data) => {
        if (err) console.log("err", err)
        // split on rows

        rowsData = data.split("\n");
        //separating header row from rrowsdata
        headers = rowsData[0].split(",").map(i => i.replace('\r', '')).map(i => i.replace('_', '')).map(i => i.replace('_', ''));
        //removing last object as it is extra 

        rowsData = rowsData.slice(1)
            .filter((i, index) => (index != rowsData.length - 1))
            .map(i => i.replace('Do_nothing', 0))
            .map(i => i.replace('NULL', 00 - 00 - 00))

        //loop through each row
        ballsDeliverd = rowsData.map(i => i.split(",").map(i => i.replace("\r", '')))
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
app.get('/api?:id', (req, res) => {

    // console.info(JSON.stringify(req.query,null,2))
    const season = req.query.season
    console.log(season)
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
            ballers.aggregate([{ $match: { MatchId: { $in: matchids } } }, { $group: { _id: "$BowlerId", totalBalls: { $sum: 1 }, runs: { $sum: "$BatsmanScored" }, extraRuns: { $sum: "$ExtraRuns" } } }, {
                $addFields: {
                    totalRuns:
                        { $add: ["$runs", "$extraRuns"] }
                }
            }, {
                $addFields: {
                    overs:
                        { $divide: ["$totalBalls", 6] }
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

})
app.get('/', (req, res) => {
    // res.send("")

})
app.listen(9000);
console.log("listening on 9000")
