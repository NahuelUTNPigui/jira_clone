export interface Actividad{
    id:number,
    //Actividad
    tipo_actividad:number,
    cod_proyecto:number,
    //Tarea
    nombre:string
    descripcion:string,
    cod_estado:number,
    backlog:boolean,
    backlog_actual:boolean,
    cod_tipo_tarea:number,
    //Hago la union de 3 clases para que sea mas facil guardarlo
    //Info
    esfuerzo_estimado:number,
    prioridad:number,
    gravedad:number
}