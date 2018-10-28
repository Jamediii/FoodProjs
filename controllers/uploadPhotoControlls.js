const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const userDAO = require('../model/userSelectInfo');
const storageDAO = require('../model/storageDAO');


class uploadPhoto {
    // 上传 头像
    upPhotoHead(ctx) {
        let formidb = new formidable.IncomingForm();
        // 设置文件下载路径
        formidb.uploadDir = '../public/images/userPhoto';

        formidb.parse(ctx.req, async (err, fields, files) => {
            if (err) {
                console.log("上传失败");
                return false;
            }
            let users = {};
            // 获取当前时间
            let dt = new Date();
            // 获取时间戳
            let userDate = dt.toLocaleString().replace(/[^0-9]/g, '');
            // 获取用户ID
            let userId = fields.userId;
            let src = files.file.path;
            let fileName = files.file.name;
            // 获取源文件全路径
            let srcNew = path.join(__dirname, src);
            let destName = `headPhoto_${userDate}_${fileName}`;
            // 改名
            let name = path.join(path.parse(srcNew).dir, destName);
            fs.renameSync(srcNew, name);
            users = {
                id: userId,
                headPhoto: destName
            };
            userDAO.uploadUserPhoto(users);
        });
    }

    // 上传 背景图片
    upPhotoWall(ctx) {
        let formidb = new formidable.IncomingForm();
        // 设置文件下载路径
        formidb.uploadDir = '../public/images/userPhoto';

        formidb.parse(ctx.req, async (err, fields, files) => {
            if (err) {
                console.log("上传失败");
                return false;
            }
            let users = {};
            // 获取当前时间
            let dt = new Date();
            // 获取时间戳
            let userDate = dt.toLocaleString().replace(/[^0-9]/g, '');
            // 获取用户ID
            let userId = fields.userId;
            let src = files.file.path;
            let fileName = files.file.name;
            // 获取源文件全路径
            let srcNew = path.join(__dirname, src);
            let destName = `WallPhoto_${userDate}_${fileName}`;
            let name = path.join(path.parse(srcNew).dir, destName);
            fs.renameSync(srcNew, name);
            users = {
                id: userId,
                settingWall: destName
            };
            userDAO.uploadUserWallPhoto(users);
        });
    }

    // 上传 作品基本信息
    upContent(ctx) {
        let formidb = new formidable.IncomingForm();
        formidb.uploadDir = '../public/images/dietPhoto'; // 设置文件下载路径
        // 获取当前时间
        let dt = new Date();
        // 获取时间戳
        let userDate = dt.toLocaleString().replace(/[^0-9]/g, '');

        formidb.parse(ctx.req, async (err, fields, files) => {
            if (err) {
                console.log("上传失败" + err.message);
                return false;
            }
            // -----------------------------上传 作品基本信息-----------------------------------
            // 获取用户id
            let userId = fields.userId;
            // 地址
            let src = files.dieltFile0.path;
            let fileName = files.dieltFile0.name;
            // 获取源文件全路径
            let srcNew = path.join(__dirname, src);
            let destName = `dietPhoto_${userId}_${userDate}_${fileName}`;
            // 改名
            let name = path.join(path.parse(srcNew).dir, destName);
            fs.renameSync(srcNew, name);
            let dietlist = {
                id: userId,
                dietMessage: {
                    title: fields.dieltTitle,// 标题
                    introduce: fields.dieltSyon, //简介
                    time: fields.dieltTime,// 制作时间
                    weight: fields.dieltPeo,// 制作分量<人份>
                    releaseTime: dt.toLocaleString().split(' ')[0],// 发布时间
                }, // {}
                dietPhotoPaths: destName,
            };

            // 上传 食材基本信息 ---------------------------------------------
            let foodlist = JSON.parse(fields.foodlist); // []

            //------------------------------------- 上传 步骤信息  -----------------------------------------
            let step = JSON.parse(fields.steplist);

            let stepArray = [];
            for (let i = 0; i < step.length; i++) {
                let photoName = step[i].stepPHName;
                for (let j in files) {
                    if (files[j].name == photoName) {
                        let photoDetail = step[i].stepContent;
                        let src = files[j].path;
                        let fileName = files[j].name;
                        // 获取源文件全路径
                        let srcNew = path.join(__dirname, src);
                        // 设置图片名称
                        let destName = `stepPhoto_${userId}_${userDate}_${fileName}`;
                        // 改名
                        let name = path.join(path.parse(srcNew).dir, destName);
                        fs.renameSync(srcNew, name);

                        let stepString = {
                            steps: j.toString().replace(/[^0-9]/g, ""),
                            stepsName: destName,
                            stepDetail: photoDetail
                        };
                        stepArray.push(stepString);
                    }
                }
            }
            let steplist = {
                stepAll: stepArray
            };
            storageDAO(dietlist, foodlist, steplist);
        });
    }
}

module.exports = new uploadPhoto();