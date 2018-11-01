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
        return DAO('call articleAddPriNum(?)',[articId]);
    }
    //2、取消点赞数
    cancelPraiseArtNum(articId){
        return DAO('call articleCancelPraiseNum(?)',[articId]);
    }

    // 粉丝排名
    fansRanking() {
        return DAO('select count(1) as fansNum,fansId,accountName,sex,headPhoto from fans left join userinfo on userinfo.userId=fans.fansId group by fans.fansId order by fansNum desc');
    }
}
module.exports=new DB();
