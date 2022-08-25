const express=require('express')
const {BugController}=require("../controller/Bug.controller.js")
var router = express.Router({mergeParams: true});
router.get('/usecase/:uc',async(req,res)=>{
    let uc=req.params.uc
    res.json( await BugController.getAllBugUC(uc))
})
router.get('/all',async(req,res)=>{
    let cod_proyecto=req.params.id
    res.json(await BugController.getAllBugP(cod_proyecto))
})
router.post('/',async(req,res)=>{
    let bcpyr=req.body
    
    res.json(await BugController.addBug(bcpyr))
})

module.exports=router