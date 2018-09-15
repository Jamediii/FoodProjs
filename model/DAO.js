//1、下载数据库
//2、导入数据库
var mysql = require("mysql");
//导入数据库配置文件
var options = require("../model/dbconfig");
//创建数据库连接池
var pool = mysql.createPool(options);

//公开的模块方法
function query(sql, values) {
    return new Promise((resolve,reject)=>{
        pool.getConnection(function (err,connection) {
            if(err){
                reject(err);
            }else {
                connection.query(sql,values,(err,rows)=>{
                    if(err){
                        reject(err);
                        console.log(err);
                    }else{
                        resolve(rows);
                    }
                    connection.release();
                })
            }
        })
    });
}
//导出模块
module.exports=query;
