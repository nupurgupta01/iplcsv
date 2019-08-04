var express=require('express');
var router =express.Router();

router.get('/',(req,res,next)=>{
    res.send("API working properly")
})
console.log("i m listening to 9000")

module.exports = router;