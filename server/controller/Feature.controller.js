const {FeatureService}=require("../services/Feature.service.js")
async function addFeature(fyc){
    return FeatureService.addFeature(fyc)
}
async function getFeatureUC(cod_use_case){
    return FeatureService.getFeaturesWhere({where:{cod_use_case}})
}
module.exports={
    FeatureController:{
        addFeature,getFeatureUC
    }
}