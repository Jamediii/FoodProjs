//1、下载数据库
//2、导入数据库
var mysql = require("mysql");
//导入数据库配置文件
var options = require("../model/dbconfig");
//创建数据库连接池
var pool = mysql.createPool(options);


//公开的模块方法
function adminStorageDAO(dietlist, foodlist, stepList) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            //开始事务
            connection.beginTransaction(async (err) => {
                if (err) return reject(err);
                await connection.query('insert into recipedetails(recipeName,recipeBrief,recipeCoverImg,authorid,recipeClassifyId,recipeMakeTime,recipeWeight) values(?,?,?,?,?,?,?)',
                    [
                        dietlist.dietMessage.recipeName,
                        dietlist.dietMessage.recipeBrief,
                        dietlist.recipeCoverImg,
                        dietlist.id,
                        dietlist.recipeClassifyId,
                        dietlist.dietMessage.recipeMakeTime,
                        dietlist.dietMessage.recipeWeight,
                    ],
                    async (err, ret) => {
                        if (err) {
                            reject(err);
                            connection.rollback(() => {
                                console.log('rollback1, 部分失败!', err);
                            });
                        } else {
                            console.log(ret);
                            // 获取作品编号
                            let dietId = await ret.insertId;
                            for (let i = 0; i < foodlist.length; i++) {
                                connection.query('insert into recipefood(foodNum,foodName,detailsId) values(?,?,?)', [foodlist[i].foodNum, foodlist[i].foodName, dietId],
                                    async (err, ret) => {
                                        if (err) {
                                            reject(err);
                                            connection.rollback(() => {
                                                console.log(`rollback2-${i}, 部分失败!`, err);
                                            });
                                        }
                                    });
                            }
                            console.log(ret);
                            console.log(stepList.stepAll);
                            for (let j = 0; j < stepList.stepAll.length; j++) {
                                await connection.query('insert into recipestep(Id,recipeStepBrief,recipeStepImg,detailsId) values(?,?,?,?)',
                                    [
                                        stepList.stepAll[j].steps,
                                        stepList.stepAll[j].stepDetail,
                                        stepList.stepAll[j].stepsName,
                                        dietId
                                    ],
                                    (err, ret) => {
                                    if (err) {
                                        reject(err);
                                        connection.rollback(() => {
                                            console.log('rollback1, 部分失败!', err);
                                        });
                                    }
                                });
                            }
                            console.log(ret);
                            connection.commit(async (err) => {
                                if (err) {
                                    connection.rollback(function () {
                                        console.log('rollback2, 部分失败!', err);
                                    });
                                    reject(err);
                                }
                                resolve(true);
                                console.log('All success!');
                            });
                        }

                    });
            });
        });
    });
}

//导出模块
module.exports = adminStorageDAO;