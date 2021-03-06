const DAO = require('../model/DAO');

class ARTICLE {
    //显示所有文章的全部信息
    getAllArticle(){
        // return DAO('select * from article')
        return DAO('select * from articleauthor left join article on article.authorId=articleauthor.authorId')
    }
    //根据articleId得到文章信息
    getOneArticle(articleId){
        return DAO('select * from article where articleId = ?',
            [articleId])
    }
    //根据文章编号获取文章简介（列表内容）
    getOneArticleBrief(articleId){
        return DAO('select articleName,articleTime,articleBrief,authorName from article,articleAuthor where article.authorId = articleAuthor.authorId and articleId = ?',[articleId])
    }
    //根据articleId删除文章
    delOneArticle(articleId){
        return DAO('delete from article where articleId = ?',
            [articleId])
    }

    //查找文章
    //根据文章名进行模糊查询
    findArticle(p_articleName){
        return DAO('call findArticle(?)',['%'+ p_articleName + '%'])
    }
    //文章分类
    classifyArticle(classifyId){
        return DAO('select articleId from article where classifyId = ?',[classifyId])
    }
    //文章排序
    orderArticle(){
        return DAO('select * from article order by articlePraiseNum desc')
    }

    //显示所有作者
    getAllAuthor(){
        return DAO('select * from articleAuthor')
    }
    //添加作者
    addAuthor(author){
        return DAO('insert into articleAuthor (authorName,authorBrief,authorImg) values (?,?)',
            [author.authorName,author.authorBrief])
    }
    //根据authorId得到作者信息
    getOneAuthor(authorId){
        return DAO('select * from articleAuthor, where authorId = ?',
            [authorId])
    }
    //根据articleId删除作者
    delOneAuthor(authorId){
        return DAO('delete from articleAuthor where authorId = ?',
            [authorId])
    }

    //查：作者模糊查询（根据name）
    findAuthor(p_authorName){
        return DAO('call findAuthor(?)',['%'+ p_authorName + '%'])
    }

}
module.exports = new ARTICLE();