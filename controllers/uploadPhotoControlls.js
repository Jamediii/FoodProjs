const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const userDAO = require('../model/userSelectInfo');
const storageDAO = require('../model/storageDAO');

let formidb = new formidable.IncomingForm();


class uploadPhoto {
    // 上传 头像 + 背景图片
    upPhotoWall(ctx) {
        formidb.parse(ctx.req, async (err, fields, files) => {
            var users = {};
            formidb.uploadDir = '../public/userPhoto'; // 设置文件下载路径
            if (err) {
                console.log("上传失败" + err.message);
                return false;
            }
            if (files.settingWall) {
                // 获取传入的路径与名字
                let src = files.settingWall.path;
                let fileName = files.settingWall.name;
                // 获取源文件全路径
                let srcNew = path.join(__dirname, files.settingWall.path);
                let destName = `WallPhoto_${path.basename(fileName, path.extname(fileName))}${path.extname(fileName)}`;
                let name = path.join(path.parse(srcNew).dir, destName);
                fs.renameSync(srcNew, path.join(path.parse(srcNew).dir, destName));
                users = {
                    id: ctx.request.body.userId,
                    settingWall: destName
                };
                userDAO.uploadUserWallPhoto(users);
            } else {
                let src = files.headPhoto.path;
                let fileName = files.headPhoto.name;
                // 获取源文件全路径
                let srcNew = path.join(__dirname, files.headPhoto.path);
                let destName = `headPhoto_${path.basename(fileName, path.extname(fileName))}${path.extname(fileName)}`;
                // 改名
                let name = path.join(path.parse(srcNew).dir, destName);
                fs.renameSync(srcNew, name);
                users = {
                    id: ctx.request.body.userId,
                    headPhoto: destName
                };
                userDAO.uploadUserPhoto(users);
            }
        });
    }

    // 上传 作品基本信息
    upContent(ctx) {
        formidb.uploadDir = '../public/dietPhoto'; // 设置文件下载路径
        // 获取当前时间
        let date = new Date().toLocaleString();
        // 获取用户id
        let userId = ctx.request.body.userId;

        formidb.parse(ctx.req, async (err, fields, files) => {
            if (err) {
                console.log("上传失败" + err.message);
                return false;
            }
            // -----------------------------上传 作品基本信息-----------------------------------
            let src = files.dieltFile0.path;
            let fileName = files.dieltFile0.name;
            // 获取源文件全路径
            let srcNew = path.join(__dirname, src);
            let destName = `dietPhoto_${userId}_${fileName}`;
            // 改名
            let name = path.join(path.parse(srcNew).dir, destName);
            fs.renameSync(srcNew, name);
            let dietlist = {
                id: userId,
                dietMessage: {
                    title: fields.dieltTitle,// 标题
                    introduce: fields.dieltSyon, //简介
                    time: fields.dieltTime,// 制作时间
                    weight: fields.dieltWeight,// 制作分量<人份>
                    releaseTime: date,// 发布时间
                }, // {}
                dietPhotoPaths: destName,
            };

            // 上传 食材基本信息 ---------------------------------------------
            let foodlist =  JSON.parse(fields.foodlist); // []

            //------------------------------------- 上传 步骤信息  -----------------------------------------
            let step = JSON.parse(fields.steplist);

            let stepArray = [];
            for (let i = 0; i < step.length; i++) {
                let photoName = step[i].stepPhoto;
                for (let j in files) {
                    if (files[j].name == photoName) {
                        let photoDetail = step[i].stepContent;
                        let src = files[j].path;
                        let fileName = files[j].name;
                        // 获取源文件全路径
                        let srcNew = path.join(__dirname, src);
                        let destName = `stepPhoto_${userId}_${fileName}`;
                        // 改名
                        let name = path.join(path.parse(srcNew).dir, destName);
                        fs.renameSync(srcNew, name);

                        let stepString = {
                            steps: j.toString().replace(/[^0-9]/g,""),
                            stepsName:destName,
                            stepDetail:photoDetail
                        };
                        stepArray.push(stepString);
                    }
                }
            }
            let steplist = {
                stepAll: stepArray
            };
            storageDAO(dietlist,foodlist,steplist);
        });
    }
}

module.exports = new uploadPhoto();