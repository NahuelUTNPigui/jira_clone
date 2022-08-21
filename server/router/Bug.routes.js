const express=require('express')
const {RouterController}=require("../controller/Router.controller.js")
var router = express.Router({mergeParams: true});
router.get('/usecase/:uc',async(req,res)=>{
    let uc=req.params.uc
    res.json( (uc))
})
router.post('/',async(req,res)=>{
    let fyc=req.body
    
    res.json( (fyc))
})

module.exports=router