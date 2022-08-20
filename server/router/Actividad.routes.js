const express=require('express')
const {ActividadController}=require("../controller/Actividad.controller.js")
var router = express.Router({mergeParams: true});
var contador_add=0
router.post('/',async(req,res)=>{
    let act=req.body
    contador_add+=1
    console.log(contador_add)
    res.json(await ActividadController.addActividad(act))
})
router.get('/all',async(req,res)=>{
    let cod_proyecto=req.params.id
    if(isNaN(cod_proyecto)){res.status(500)}
    res.json(await ActividadController.getActividadesProyecto(cod_proyecto))
})
module.exports=router
