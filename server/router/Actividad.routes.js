const express=require('express')
const {ActividadController}=require("../controller/Actividad.controller.js")
var router = express.Router({mergeParams: true});

router.post('/',async(req,res)=>{
    let act=req.body
    
    res.json(act)
})

module.exports=router
