const express=require('express')
const {FeatureController}=require("../controller/Feature.controller.js")
var router = express.Router({mergeParams: true});
router.get('/usecase/:uc',async(req,res)=>{
    let uc=req.params.uc
    res.json(await FeatureController.getFeatureUC(uc))
})
router.post('/',async(req,res)=>{
    let fyc=req.body
    
    res.json(await FeatureController.addFeature(fyc))
})

module.exports=router