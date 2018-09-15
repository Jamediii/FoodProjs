-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`myadmin`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`myadmin` (
  `myadminId` INT(11) NOT NULL AUTO_INCREMENT COMMENT '管理员登录表ID',
  `workNum` INT(11) NULL DEFAULT NULL COMMENT '管理员工号',
  `adminPwd` VARCHAR(45) NULL DEFAULT NULL COMMENT '管理员密码',
  PRIMARY KEY (`myadminId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COMMENT = '管理员登录表';


-- -----------------------------------------------------
-- Table `mydb`.`activitydetails`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`activitydetails` (
  `activityId` INT(11) NOT NULL AUTO_INCREMENT,
  `activityState` VARCHAR(45) NOT NULL COMMENT '活动状态',
  `activityName` VARCHAR(45) NULL DEFAULT NULL COMMENT '活动名称',
  `activitySTime` DATE NULL DEFAULT NULL COMMENT '开始时间',
  `activityETime` DATE NULL DEFAULT NULL COMMENT '结束时间',
  `activityContent` VARCHAR(45) NULL DEFAULT NULL COMMENT '活动内容',
  `myadmin_myadminId` INT(11) NOT NULL,
  PRIMARY KEY (`activityId`),
  INDEX `fk_activityDetails_myadmin1_idx` (`myadmin_myadminId` ASC) VISIBLE,
  CONSTRAINT `fk_activityDetails_myadmin1`
    FOREIGN KEY (`myadmin_myadminId`)
    REFERENCES `mydb`.`myadmin` (`myadminId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COMMENT = '活动详情表';


-- -----------------------------------------------------
-- Table `mydb`.`partinact`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`partinact` (
  `partInActId` INT(11) NOT NULL AUTO_INCREMENT COMMENT '参赛表ID',
  `userId` INT(11) NULL DEFAULT NULL COMMENT '用户名（参赛人）',
  `dietId` INT(11) NULL DEFAULT NULL COMMENT '参赛作品',
  `activityDetails_activityId` INT(11) NOT NULL,
  PRIMARY KEY (`partInActId`),
  INDEX `fk_partInAct_activityDetails1_idx` (`activityDetails_activityId` ASC) VISIBLE,
  CONSTRAINT `fk_partInAct_activityDetails1`
    FOREIGN KEY (`activityDetails_activityId`)
    REFERENCES `mydb`.`activitydetails` (`activityId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COMMENT = '参赛表';


-- -----------------------------------------------------
-- Table `mydb`.`activityresult`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`activityresult` (
  `activityResultId` INT(11) NOT NULL AUTO_INCREMENT COMMENT '活动结果表ID',
  `dietId` INT(11) NULL DEFAULT NULL COMMENT '获奖菜谱Id',
  `partInAct_partInActId` INT(11) NOT NULL,
  PRIMARY KEY (`activityResultId`),
  INDEX `fk_activityResult_partInAct1_idx` (`partInAct_partInActId` ASC) VISIBLE,
  CONSTRAINT `fk_activityResult_partInAct1`
    FOREIGN KEY (`partInAct_partInActId`)
    REFERENCES `mydb`.`partinact` (`partInActId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COMMENT = '活动结果表';


-- -----------------------------------------------------
-- Table `mydb`.`articauthor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`articauthor` (
  `authorId` INT(11) NOT NULL,
  `authorName` VARCHAR(45) NOT NULL,
  `authorBrief` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`authorId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COMMENT = '文章作者';


-- -----------------------------------------------------
-- Table `mydb`.`classify`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`classify` (
  `classifyId` INT(11) NOT NULL,
  `classifName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`classifyId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COMMENT = '文章分类';


-- -----------------------------------------------------
-- Table `mydb`.`artic`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`artic` (
  `articId` INT(11) NOT NULL AUTO_INCREMENT,
  `articName` VARCHAR(45) NOT NULL,
  `articTime` DATE NOT NULL,
  `articContent` VARCHAR(45) NOT NULL,
  `articPicBig` VARCHAR(45) NOT NULL,
  `articPicSmall` VARCHAR(45) NULL,
  `articPraiseNum` INT(11) NULL,
  `authorId` INT(11) NOT NULL,
  `articBrief` VARCHAR(45) NOT NULL,
  `classifyId` INT(11) NOT NULL,
  PRIMARY KEY (`articId`),
  INDEX `fk_artic_author1_idx` (`authorId` ASC) VISIBLE,
  INDEX `fk_artic_classify1_idx` (`classifyId` ASC) VISIBLE,
  CONSTRAINT `fk_artic_author1`
    FOREIGN KEY (`authorId`)
    REFERENCES `mydb`.`articauthor` (`authorId`),
  CONSTRAINT `fk_artic_classify1`
    FOREIGN KEY (`classifyId`)
    REFERENCES `mydb`.`classify` (`classifyId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COMMENT = '文章';


-- -----------------------------------------------------
-- Table `mydb`.`menuDetails`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`menuDetails` (
  `detailsId` INT(11) NOT NULL AUTO_INCREMENT,
  `recipeName` VARCHAR(45) NOT NULL,
  `recipeBrief` VARCHAR(45) NOT NULL,
  `recipeImage` VARCHAR(45) NOT NULL,
  `authorid` VARCHAR(45) NOT NULL,
  `praPraiseNum` INT NULL COMMENT '菜谱点赞量',
  `videoContent` VARCHAR(45) NULL,
  PRIMARY KEY (`detailsId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COMMENT = '菜谱详情';


-- -----------------------------------------------------
-- Table `mydb`.`levellist`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`levellist` (
  `levelId` INT(11) NOT NULL AUTO_INCREMENT COMMENT '等级编号',
  `experLow` INT(11) NOT NULL COMMENT '经验值<低>',
  `experHei` INT(11) NOT NULL,
  `levelHead` VARCHAR(45) NOT NULL COMMENT '\'\'等级头衔\'\'',
  PRIMARY KEY (`levelId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci
COMMENT = '等级升级表';


-- -----------------------------------------------------
-- Table `mydb`.`userinfo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`userinfo` (
  `userId` INT(11) NOT NULL AUTO_INCREMENT COMMENT '用户编号',
  `accountName` VARCHAR(45) NOT NULL COMMENT '\'\'账号名\'\'',
  `sex` CHAR(4) NOT NULL COMMENT '\'\'性别\'\'',
  `phoneNo` CHAR(11) NOT NULL COMMENT '\'\'手机号\'\'',
  `password` VARCHAR(20) NOT NULL COMMENT '\'\'密码\'\'',
  `levelId` INT(11) NOT NULL DEFAULT 1 COMMENT '等级头衔ID',
  `expValue` INT(11) NOT NULL DEFAULT 0 COMMENT '经验值',
  PRIMARY KEY (`userId`),
  INDEX `fk_userInfo_levelList_idx` (`levelId` ASC) VISIBLE,
  CONSTRAINT `userinfo_ibfk_1`
    FOREIGN KEY (`levelId`)
    REFERENCES `mydb`.`levellist` (`levelId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci
COMMENT = '用户信息表';


-- -----------------------------------------------------
-- Table `mydb`.`comment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`comment` (
  `commentId` INT(11) NOT NULL AUTO_INCREMENT,
  `userId` INT NOT NULL,
  `userComment` VARCHAR(45) NOT NULL,
  `myadminId` INT NULL,
  `detailsId` INT NULL,
  PRIMARY KEY (`commentId`),
  INDEX `fk_details_comment_idx` (`detailsId` ASC) VISIBLE,
  INDEX `fk_userInfo_commment_idx` (`userId` ASC) VISIBLE,
  INDEX `fk_myadmin_comment_idx` (`myadminId` ASC) VISIBLE,
  CONSTRAINT `fk_details_comment`
    FOREIGN KEY (`detailsId`)
    REFERENCES `mydb`.`menuDetails` (`detailsId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_userInfo_commment`
    FOREIGN KEY (`userId`)
    REFERENCES `mydb`.`userinfo` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_myadmin_comment`
    FOREIGN KEY (`myadminId`)
    REFERENCES `mydb`.`myadmin` (`myadminId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COMMENT = '评论表';


-- -----------------------------------------------------
-- Table `mydb`.`dietlist`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`dietlist` (
  `dietId` INT(11) NOT NULL AUTO_INCREMENT COMMENT '制作食谱编号',
  `dietTitle` VARCHAR(45) NOT NULL COMMENT '\'\'作品标题\'\'',
  `dietPhoto` BINARY(1) NOT NULL COMMENT '作品图片',
  `dietTime` DATE NOT NULL COMMENT '制作时间<用户填入>',
  `dietWeigh` INT(11) NOT NULL COMMENT '制作份量<用户选择>',
  `dietIntroduce` VARCHAR(120) NOT NULL COMMENT '\'\'制作简介\'\'',
  `releaseTime` DATE NOT NULL COMMENT '发布时间<我们设定>',
  `userId` INT(11) NOT NULL COMMENT '用户编号',
  `productState` VARCHAR(45) NULL DEFAULT '未审核',
  PRIMARY KEY (`dietId`),
  INDEX `fk_dietList_userInfo_idx` (`userId` ASC) VISIBLE,
  CONSTRAINT `dietlist_ibfk_1`
    FOREIGN KEY (`userId`)
    REFERENCES `mydb`.`userinfo` (`userId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci
COMMENT = '未完成的作品表';


-- -----------------------------------------------------
-- Table `mydb`.`food`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`food` (
  `foodId` INT(11) NOT NULL AUTO_INCREMENT,
  `foodName` VARCHAR(45) NOT NULL,
  `foodNum` VARCHAR(45) NOT NULL,
  `detailsId` INT(11) NOT NULL,
  PRIMARY KEY (`foodId`),
  INDEX `fk_food_details1_idx` (`detailsId` ASC) VISIBLE,
  CONSTRAINT `fk_food_details1`
    FOREIGN KEY (`detailsId`)
    REFERENCES `mydb`.`menuDetails` (`detailsId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COMMENT = '菜谱食材';


-- -----------------------------------------------------
-- Table `mydb`.`foodlist`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`foodlist` (
  `foodId` INT(11) NOT NULL AUTO_INCREMENT COMMENT '食材编号',
  `foodNum` INT(11) NOT NULL COMMENT '食材数量',
  `foodName` VARCHAR(45) NOT NULL COMMENT '\'\'食材名称\'\'',
  `dietId` INT(11) NOT NULL COMMENT '作品编号<外>',
  PRIMARY KEY (`foodId`),
  INDEX `fk_foodList_dietList_idx` (`dietId` ASC) VISIBLE,
  CONSTRAINT `foodlist_ibfk_1`
    FOREIGN KEY (`dietId`)
    REFERENCES `mydb`.`dietlist` (`dietId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci
COMMENT = '食材表';


-- -----------------------------------------------------
-- Table `mydb`.`practice`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`practice` (
  `practiceId` INT(11) NOT NULL AUTO_INCREMENT,
  `practiceIntroduce` VARCHAR(45) NOT NULL,
  `practiceImage` VARCHAR(45) NOT NULL,
  `detailsId` INT(11) NOT NULL,
  PRIMARY KEY (`practiceId`),
  INDEX `fk_practice_details1_idx` (`detailsId` ASC) VISIBLE,
  CONSTRAINT `fk_practice_details1`
    FOREIGN KEY (`detailsId`)
    REFERENCES `mydb`.`menuDetails` (`detailsId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COMMENT = '菜谱步骤';


-- -----------------------------------------------------
-- Table `mydb`.`stepslist`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`stepslist` (
  `Id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '步骤ID',
  `stepId` INT(11) NOT NULL COMMENT '步骤ID',
  `stepPhoto` BINARY(1) NOT NULL COMMENT '步骤图片',
  `stepDetail` VARCHAR(45) NOT NULL COMMENT '\'\'步骤详细描述\'\'',
  `dietId` INT(11) NOT NULL COMMENT '未完成作品ID',
  PRIMARY KEY (`Id`),
  INDEX `fk_stepsList_dietList_idx` (`dietId` ASC) VISIBLE,
  CONSTRAINT `stepslist_ibfk_1`
    FOREIGN KEY (`dietId`)
    REFERENCES `mydb`.`dietlist` (`dietId`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci
COMMENT = '制作步骤表';


-- -----------------------------------------------------
-- Table `mydb`.`fans`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`fans` (
  `listId` INT NOT NULL AUTO_INCREMENT COMMENT '自增数字',
  `userId` INT NOT NULL,
  `fansId` INT NOT NULL,
  PRIMARY KEY (`listId`),
  INDEX `fk_fans_userinfo_idx` (`userId` ASC) VISIBLE,
  INDEX `fk_fansId_userinfo_idx` (`fansId` ASC) VISIBLE,
  CONSTRAINT `fk_userId_userinfo`
    FOREIGN KEY (`userId`)
    REFERENCES `mydb`.`userinfo` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_fansId_userinfo`
    FOREIGN KEY (`fansId`)
    REFERENCES `mydb`.`userinfo` (`userId`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
COMMENT = '粉丝表';


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
