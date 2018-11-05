//关于用户作品的相关数据操作
const DAO = require("../model/DAO");

class DB {
    //获取全部用户的数据
    getUserproc() {
        return DAO("select * from dietlist where productState ='未审核'", []);
    }

    //修改用户作品的审核状态
    updateProductState(stateMessage,id) {
        return DAO("update dietlist set dietlist.productState=? where dietlist.dietId=?;", [stateMessage,id]);
    }

    //上传文章
    upArticle(articleDetail) {
        return DAO("insert into article(articleName,articleTime,articleContent,articleCoverImg,articlePic,authorId,articleBrief,classifyId) values (?,?,?,?,?,?,?,?);",
            [articleDetail.aTitle,articleDetail.aPublishTime,articleDetail.aContent,articleDetail.aListPic,
                articleDetail.aContentPic,articleDetail.aAuthorNum,articleDetail.aBrief,articleDetail.aArticleType]);
    }

    //获取管理员信息
    getAdminInfo(){
        return DAO('SELECT * FROM myadmin',[]);
    }

}

module.exports = new DB();
