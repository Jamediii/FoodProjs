//关于评论的相关操作
const DAO = require("../model/DAO");
class DB {
    //根据菜谱id查询评论人数
    getCommPerson(id){
        return DAO('select count(1) from comment where detailsId = ? ;',[id]);
    }
    //根据菜谱id查询评论内容
    getCommContent(id){
        return DAO('select * from comment where detailsId = ?',[id]);
    }

    //根据菜谱详情id添加评论
    addComment(comment){
        return DAO('insert into comment(userId,userComment,detailsId) values(?,?,?)',
            [comment.userId,comment.userComment,comment.detailsId]);
    }

    //根据评论表ID修改评论
    updateComment(comment){
        return DAO('update comment set userComment = ? where commentId =?',
            [comment.content,comment.commentId]);
    }

    //根据评论表ID删除评论
    deleteComment(commentId){
        return DAO('delete from comment where commentId = ?',[commentId]);
    }
}
module.exports=new DB();