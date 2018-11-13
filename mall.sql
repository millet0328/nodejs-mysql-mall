/*
 Navicat Premium Data Transfer

 Source Server         : app
 Source Server Type    : MySQL
 Source Server Version : 50553
 Source Host           : localhost:3306
 Source Schema         : mall

 Target Server Type    : MySQL
 Target Server Version : 50553
 File Encoding         : 65001

 Date: 14/11/2018 01:07:07
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for addresses
-- ----------------------------
DROP TABLE IF EXISTS `addresses`;
CREATE TABLE `addresses`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL COMMENT '用户id',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '姓名',
  `tel` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '手机号',
  `province` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '省',
  `city` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '市',
  `area` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '区',
  `street` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '街道',
  `code` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '邮编',
  `isDefault` int(3) NULL DEFAULT 1 COMMENT '是否默认',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 20 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for categories
-- ----------------------------
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '名称',
  `pId` int(11) NOT NULL COMMENT '父级id',
  `level` int(11) NULL DEFAULT NULL COMMENT '层级',
  `img` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 84 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of categories
-- ----------------------------
INSERT INTO `categories` VALUES (1, '全部分类', 0, 1, '');
INSERT INTO `categories` VALUES (2, '家居家纺', 1, 2, '');
INSERT INTO `categories` VALUES (30, '灯具', 2, 3, '');
INSERT INTO `categories` VALUES (8, '家用电器', 1, 2, '');
INSERT INTO `categories` VALUES (12, '智能家庭', 1, 2, '');
INSERT INTO `categories` VALUES (13, '餐具厨房', 1, 2, '');
INSERT INTO `categories` VALUES (18, '服饰配饰', 1, 2, '');
INSERT INTO `categories` VALUES (29, '床垫', 2, 3, '');
INSERT INTO `categories` VALUES (19, '鞋靴箱包', 1, 2, '');
INSERT INTO `categories` VALUES (20, '手机电脑', 1, 2, '');
INSERT INTO `categories` VALUES (21, '电视影音', 1, 2, '');
INSERT INTO `categories` VALUES (22, '运动健康', 1, 2, '');
INSERT INTO `categories` VALUES (23, '出行户外', 1, 2, '');
INSERT INTO `categories` VALUES (24, '洗护美妆', 1, 2, '');
INSERT INTO `categories` VALUES (25, '日杂文创', 1, 2, '');
INSERT INTO `categories` VALUES (26, '母婴亲子', 1, 2, '');
INSERT INTO `categories` VALUES (27, '饮食酒水', 1, 2, '');
INSERT INTO `categories` VALUES (28, '数码配件', 1, 2, '');
INSERT INTO `categories` VALUES (31, '家具', 2, 3, '');
INSERT INTO `categories` VALUES (32, '被子', 2, 3, '');
INSERT INTO `categories` VALUES (33, '枕头', 2, 3, '');
INSERT INTO `categories` VALUES (34, '床品件套', 2, 3, '');
INSERT INTO `categories` VALUES (35, '家居收纳', 2, 3, '');
INSERT INTO `categories` VALUES (36, '厨房卫浴', 2, 3, '');
INSERT INTO `categories` VALUES (37, '家饰花卉', 2, 3, '');
INSERT INTO `categories` VALUES (38, '布艺软装', 2, 3, '');
INSERT INTO `categories` VALUES (39, '清洁电器', 8, 3, '');
INSERT INTO `categories` VALUES (40, '生活电器', 8, 3, '');
INSERT INTO `categories` VALUES (41, '洗衣机', 8, 3, '');
INSERT INTO `categories` VALUES (42, '冰箱', 8, 3, '');
INSERT INTO `categories` VALUES (43, '净水器', 8, 3, '');
INSERT INTO `categories` VALUES (44, '安防', 12, 3, '');
INSERT INTO `categories` VALUES (45, '路由器', 12, 3, '');
INSERT INTO `categories` VALUES (46, '开关插座', 12, 3, '');
INSERT INTO `categories` VALUES (47, '相机', 12, 3, '');
INSERT INTO `categories` VALUES (48, '羽绒服', 18, 3, '');
INSERT INTO `categories` VALUES (49, '外套', 18, 3, '');
INSERT INTO `categories` VALUES (50, '裤装', 18, 3, '');
INSERT INTO `categories` VALUES (51, '卫衣', 18, 3, '');
INSERT INTO `categories` VALUES (52, 'T恤', 18, 3, '');
INSERT INTO `categories` VALUES (53, '衬衫', 18, 3, '');
INSERT INTO `categories` VALUES (54, '针织毛衫', 18, 3, '');
INSERT INTO `categories` VALUES (55, '时尚女装', 18, 3, '');
INSERT INTO `categories` VALUES (56, '运动装', 18, 3, '');
INSERT INTO `categories` VALUES (57, '运动/户外鞋', 19, 3, '');
INSERT INTO `categories` VALUES (58, '凉鞋/拖鞋', 19, 3, '');
INSERT INTO `categories` VALUES (59, '男鞋', 19, 3, '');
INSERT INTO `categories` VALUES (60, '女鞋', 19, 3, '');
INSERT INTO `categories` VALUES (61, '小米系列', 20, 3, '');
INSERT INTO `categories` VALUES (62, '红米系列', 20, 3, '');
INSERT INTO `categories` VALUES (63, '游戏本15.6\"', 20, 3, '');
INSERT INTO `categories` VALUES (64, '笔记本12.5\"', 20, 3, '');
INSERT INTO `categories` VALUES (65, '笔记本15.6\"', 20, 3, '');
INSERT INTO `categories` VALUES (66, '鼠标键盘', 20, 3, '');
INSERT INTO `categories` VALUES (67, '保健器械', 22, 3, '');
INSERT INTO `categories` VALUES (68, '康体监护', 22, 3, '');
INSERT INTO `categories` VALUES (69, '运动健身', 22, 3, '');
INSERT INTO `categories` VALUES (70, '泳衣泳具', 22, 3, '');
INSERT INTO `categories` VALUES (71, '护理护具', 22, 3, '');
INSERT INTO `categories` VALUES (72, '骑行', 23, 3, '');
INSERT INTO `categories` VALUES (73, '平衡车/滑板车', 23, 3, '');
INSERT INTO `categories` VALUES (74, '汽车用品', 23, 3, '');
INSERT INTO `categories` VALUES (75, '户外装备', 23, 3, '');
INSERT INTO `categories` VALUES (76, '户外烧烤', 23, 3, '');
INSERT INTO `categories` VALUES (77, '口腔清洁', 24, 3, '');
INSERT INTO `categories` VALUES (78, '洗护用具', 24, 3, '');
INSERT INTO `categories` VALUES (79, '毛巾浴巾', 24, 3, '');
INSERT INTO `categories` VALUES (80, '基础护肤', 24, 3, '');
INSERT INTO `categories` VALUES (81, '身体护理', 24, 3, '');
INSERT INTO `categories` VALUES (82, '彩妆香氛', 24, 3, '');
INSERT INTO `categories` VALUES (83, '居家清洁', 24, 3, '');

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cate_1st` int(11) NOT NULL COMMENT '一级分类id',
  `cate_2nd` int(11) NOT NULL COMMENT '二级分类id',
  `cate_3rd` int(11) NULL DEFAULT NULL COMMENT '三级分类id',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '商品名称',
  `hotPoint` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品热点描述',
  `price` decimal(10, 2) NOT NULL COMMENT '商品价格',
  `marketPrice` decimal(10, 2) NOT NULL COMMENT '市场价',
  `cost` decimal(10, 2) NOT NULL COMMENT '成本价',
  `discount` decimal(10, 0) NULL DEFAULT NULL COMMENT '折扣',
  `inventory` int(11) NOT NULL COMMENT '库存',
  `articleNo` int(20) NOT NULL COMMENT '货号',
  `img_lg` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '商品主图-720',
  `img_md` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '商品主图-360',
  `slider` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '商品轮播图片',
  `brand` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品品牌',
  `detail` varchar(5000) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '商品详情',
  `freight` decimal(10, 0) NULL DEFAULT 0 COMMENT '商品运费',
  `create_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 15 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户名',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密码',
  `nickname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '昵称',
  `sex` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '男' COMMENT '性别',
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT './images/avatar/default.jpg' COMMENT '头像',
  `tel` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '手机号码',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
