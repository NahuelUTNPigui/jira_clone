const express=require('express')
const {EstadoTareaController} = require('../controller/EstadoTarea.controller.js')
var router = express.Router({mergeParams: true});
router.get('/',async(req,res)=>{
    let cod_proyecto=req.params.id
    if(isNaN(cod_proyecto)){res.status(500)}
    else{
        res.json(await EstadoTareaController.getAllEstados(cod_proyecto))
    }
})
router.post('/',async (req,res)=>{
    let et=req.body
    res.json(await EstadoTareaController.addEstado(et))
})
router.delete('/:cod_orden',async (req,res)=>{
    let cod_orden=req.params.cod_orden
    let cod_proyecto=req.params.id
    if(isNaN(cod_orden)|| isNaN(cod_proyecto)){res.status(500)}
    else{
        res.json(await EstadoTareaController.delOrden(cod_orden))
    }
})
router.post('/addCambioOrden/:nuevo_orden',async(req,res)=>{

    let et=req.body
    let cod_proyecto=req.params.id
    let nuevo_orden=req.params.nuevo_orden
    if(isNaN(cod_proyecto) || isNaN(nuevo_orden)){res.status(500)}
    else{
        res.json(await EstadoTareaController.addOrdenCambiado(et,nuevo_orden))
    }
})
router.put('/modCambioOrden/:orden_anterior/:nuevo_orden',async(req,res)=>{
    let et=req.body
    let cod_proyecto=req.params.id
    let nuevo_orden=req.params.nuevo_orden
    let orden_anterior=req.params.orden_anterior
    if(isNaN(cod_proyecto) || isNaN(nuevo_orden) || isNaN(orden_anterior)){res.status(500)}
    else{
        res.json(await EstadoTareaController.modOrdenCambiado(et,orden_anterior,nuevo_orden))
    }
})
router.put('/',async(req,res)=>{
    let et=req.body
    res.json(await EstadoTareaController.modEstadoTarea(et))
})

module.exports=router