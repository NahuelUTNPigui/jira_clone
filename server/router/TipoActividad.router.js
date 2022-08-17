const express=require('express')
const {TipoActividadController} = require('../controller/TipoActividad.controller.js');
var router = express.Router({mergeParams: true});
router.get('/',async(req,res)=>{
    let cod_proyecto=req.params.id
    if(isNaN(cod_proyecto)){res.status(500)}
    else{
        res.json(await TipoActividadController.getTiposActividadProyecto(cod_proyecto))
    }
})
router.post('/',async(req,res)=>{
    let cod_proyecto=req.params.id
    let tipo_actividad=req.body
    if(isNaN(cod_proyecto)){res.status(500)}
    else{
        res.json(await TipoActividadController.addTipoActividad(tipo_actividad))
    }
})
router.put('/',async(req,res)=>{
    let cod_proyecto=req.params.id
    let tipo_actividad=req.body
    if(isNaN(cod_proyecto)){res.status(500)}
    else{
        res.json(await TipoActividadController.modTipoActividad(tipo_actividad))
    }

})
router.delete('/:cod_tipo',async (req,res)=>{
    let cod_proyecto=req.params.id
    let cod_tipo=req.params.cod_tipo
    if(isNaN(cod_proyecto)|| isNaN(cod_tipo)){res.status(500)}
    else{
        res.json(await TipoActividadController.delTipoActividad(cod_tipo))
    }
})
module.exports=router
