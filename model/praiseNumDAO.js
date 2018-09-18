//修改点赞数
const DAO = require("../model/DAO");
class DB {

    //修改菜谱点赞数
    //1、添加点赞数
    addPraiseRecNum(detailsId){
        return DAO('call updatePraiseNum(?)',[detailsId]);
    }
    //2、取消点赞数
    cancelPraiseRecNum(detailsId){
        return DAO('call delPraiseNum(?)',[detailsId]);
    }

    //根据文章id,修改文章点赞数
    //1、添加点赞数
    addPraiseArtNum(articId){
        return DAO('call articAddPriNum(?)',[articId]);
    }
    //2、取消点赞数
    cancelPraiseArtNum(articId){
        return DAO('call articCancelPraiseNum(?)',[articId]);
    }
}
module.exports=new DB();