const { DATE } = require('sequelize')
const {Sequelize,Model,DataTypes }=require('sequelize')
const sequelize = new Sequelize('sqlite::memory:')
/*
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
  });
*/
//Me quedo con la opcion delicous las consultas son mas faciles y son menos clases

class Proyecto extends Model{}
Proyecto.init({
  nombre:{
    type:DataTypes.STRING,
    allowNull:false
  },
  descripcion:{
    type:DataTypes.STRING(500),
  },
  version:{
    type:DataTypes.STRING,
    defaultValue:"0.0.1"
  },
  //Deben tener la forma " tema1 tema2 "(espacio atras y adelante)
  temas:{
    type:DataTypes.STRING(500),
    allowNull:false,
    defaultValue:''
  },
  fecha_fin:{
    type:DataTypes.DATE
  },
  fecha_inicio:{
    type:DataTypes.DATE,
    defaultValue:new DATE(Date.now())
  }},{
    sequelize,
    modelName:"Proyecto",
    freezeTableName:true
})
class Verificable extends Model{}
Verificable.init({},{
  sequelize,
  modelName:"Verificable",
  freezeTableName:true
})
class UseCase extends Model{}
UseCase.init({
  nombre:{
    type:DataTypes.STRING,
    allowNull:false
  },descripcion:{
    type:DataTypes.STRING(250)
  },cod_proyecto:{
    type:DataTypes.INTEGER,
    allowNull:false
  },
  //Es probable que los casos de uso no tengan verificable,
  //Igual creo uno por defecto
  cod_verificable:{
    type:DataTypes.INTEGER,
    allowNull:false
}},{
  sequelize,
  modelName:"UseCase",
  freezeTableName:true
})
class Criterio extends Model{}
Criterio.init({
  nombre:{
    type:DataTypes.STRING,
    allowNull:false
  },aceptado:{
    type:DataTypes.BOOLEAN,
    defaultValue:false
  },cod_verificable:{
    type:DataTypes.INTEGER,
    allowNull:false
  }},{
    sequelize,
    modelName:"Criterio",
    freezeTableName:true
})
class Info extends Model{}
Info.init({
  //Valor medido en horas
  esfuerzo_estimado:{
    type:DataTypes.INTEGER,
    defaultValue:0
  },
  //la prioridad va del 1 al 10
  //10 mas, 1 menos
  prioridad:{
    type:DataTypes.INTEGER,
    allowNull:false
  },
  //la gravedad va del 1 al 10
  //10 mas 1 menos
  gravedad:{
    type:DataTypes.INTEGER,
    allowNull:false
  }},{
    sequelize,
    modelName:'Info',
    freezeTableName:true
})
class Ticket extends Model{}
Ticket.init({
  nombre:{
    type:DataTypes.STRING,
    allowNull:false
  },descripcion:{
    type:DataTypes.STRING,
    allowNull:false
  },cod_proyecto:{
    type:DataTypes.INTEGER,
    allowNull:false
  },cod_info:{
    type:DataTypes.INTEGER,
    allowNull:false
  }},{
  sequelize,
  modelName:"Ticket",
  freezeTableName:true
})
class BugRecipe extends Model{}
BugRecipe.init({
  descripcion:{
    type:DataTypes.STRING,
    allowNull:false
  },cod_bug:{
    type:DataTypes.INTEGER,
    allowNull:false
  },orden:{
    type:DataTypes.INTEGER,
    defaultValue:0
  }},{
 sequelize,
 modelName:"BugRecipe",
 freezeTableName:true 
})
class Precondicion extends Model{}
Precondicion.init({
  condicion:{
    type:DataTypes.STRING,
    allowNull:false
  },orden:{
    type:DataTypes.INTEGER,
    defaultValue:0  
  },cod_bug:{
    type:DataTypes.INTEGER,
    allowNull:false  
  }},{
    sequelize,
    modelName:'Precondicion',
    freezeTableName:true
})
class TipoActividad extends Model{}
TipoActividad.init({
  nombre:{
    type:DataTypes.STRING,
    allowNull:false
  },
  cod_proyecto:{
    type:DataTypes.INTEGER,
    allowNull:false
  }},{
    sequelize,
    modelName:'TipoActividad',
    freezeTableName:true
})
//Tiene un orden encima, puedo eliminarlos a gusto y placer
class EstadoTarea extends Model{}
EstadoTarea.init({
  nombre:{
    type:DataTypes.STRING,
    allowNull:false
  },orden:{
    type:DataTypes.INTEGER,
    allowNull:false 
  },cod_proyecto:{
    type:DataTypes.INTEGER,
    allowNull:false 
  }
  },{
    sequelize,
    modelName:'EstadoTarea',
    freezeTableName:true
})
class Tarea extends Model{}
Tarea.init({
  nombre:{
    type:DataTypes.STRING,
    allowNull:false,
  },
  descripcion:{
    type:DataTypes.STRING(500),
    allowNull:false,
  },
  cod_estado:{
    type:DataTypes.INTEGER,
    allowNull:false,
    defaultValue:1
  },backlog:{
    type:DataTypes.BOOLEAN,
    defaultValue:true
  },backlog_actual:{
    type:DataTypes.BOOLEAN,
    defaultValue:false    
  },cod_tipo_tarea:{
    //1 es bug, 2 feature, 3 actividad
    //Se repite esta data, pero va a acelerar las busquedas
    type:DataTypes.INTEGER,
    defaultValue:3
  },cod_info:{
    type:DataTypes.INTEGER,
    allowNull:false
  }},{
  sequelize,
  modelName:"Tarea",
  freezeTableName:true
})
//Historias de usuario
class Feature extends Model{}
Feature.init({
  cod_verificable:{
    type:DataTypes.INTEGER,
    allowNull:false
  },cod_tarea:{
    type:DataTypes.INTEGER,
    allowNull:false
  },cod_use_case:{
    type:DataTypes.INTEGER,
    allowNull:false
  }},{
    sequelize,
    modelName:"Feature",
    freezeTableName:true
})
class Actividad extends Model{}
Actividad.init({
  cod_tarea:{
    type:DataTypes.INTEGER,
    allowNull:false
  },cod_tipo_actividad:{
    type:DataTypes.INTEGER,
    allowNull:false
  },cod_proyecto:{
    type:DataTypes.INTEGER,
    allowNull:false
  }},{
  sequelize,
  modelName:"Actividad",
  freezeTableName:true
})
class Bug extends Model{}
Bug.init({
  cod_verificable:{
    type:DataTypes.INTEGER,
    allowNull:false
  },cod_tarea:{
    type:DataTypes.INTEGER,
    allowNull:false
  },cod_use_case:{
    type:DataTypes.INTEGER,
    allowNull:false
  }},{
    sequelize,
    modelName:"Bug",
    freezeTableName:true
})
module.exports={
  sequelize,
  Proyecto,
  Actividad,
  Criterio,
  Bug,
  BugRecipe,
  EstadoTarea,
  Feature,
  Info,
  Precondicion,
  Tarea,
  Ticket,
  TipoActividad,
  UseCase,
  Verificable
}
//Los backlog no existen son tan solo tarea no realizadas
