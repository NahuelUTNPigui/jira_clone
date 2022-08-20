const express=require('express')
const {FeatureController}=require("../controller/Feature.controller.js")
var router = express.Router({mergeParams: true});

router.post('/',async(req,res)=>{
    let f=req.body
    
    res.json(act)
})

module.exports=router