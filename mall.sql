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

 Date: 22/11/2018 11:01:16
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
  `street` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '街道',
  `code` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '邮编',
  `isDefault` int(3) DEFAULT 1 COMMENT '是否默认',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 21 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '收货地址' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for carts
-- ----------------------------
DROP TABLE IF EXISTS `carts`;
CREATE TABLE `carts`  (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `uid` int(10) NOT NULL COMMENT '用户id',
  `goods_id` int(10) NOT NULL COMMENT '商品id',
  `goods_num` int(10) NOT NULL COMMENT '商品数量',
  `status` tinyint(4) DEFAULT 1 COMMENT '1-正常，0-禁用，-1-删除',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 22 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '购物车' ROW_FORMAT = Fixed;

-- ----------------------------
-- Table structure for categories
-- ----------------------------
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '名称',
  `pId` int(11) NOT NULL COMMENT '父级id',
  `level` int(11) DEFAULT NULL COMMENT '层级',
  `img` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 85 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '商品分类' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cate_1st` int(11) NOT NULL COMMENT '一级分类id',
  `cate_2nd` int(11) NOT NULL COMMENT '二级分类id',
  `cate_3rd` int(11) DEFAULT NULL COMMENT '三级分类id',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '商品名称',
  `hotPoint` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '商品热点描述',
  `price` decimal(10, 2) NOT NULL COMMENT '商品价格',
  `marketPrice` decimal(10, 2) NOT NULL COMMENT '市场价',
  `cost` decimal(10, 2) NOT NULL COMMENT '成本价',
  `discount` decimal(10, 0) DEFAULT NULL COMMENT '折扣',
  `inventory` int(11) NOT NULL COMMENT '库存',
  `articleNo` int(20) NOT NULL COMMENT '货号',
  `img_lg` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '商品主图-720',
  `img_md` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '商品主图-360',
  `slider` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '商品轮播图片',
  `brand` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '商品品牌',
  `detail` varchar(5000) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '商品详情',
  `freight` decimal(10, 0) DEFAULT 0 COMMENT '商品运费',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 29 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '商品表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for order_addresses
-- ----------------------------
DROP TABLE IF EXISTS `order_addresses`;
CREATE TABLE `order_addresses`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL COMMENT '订单id',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '姓名',
  `tel` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '手机号',
  `province` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '省',
  `city` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '市',
  `area` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '区',
  `street` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '街道',
  `code` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '邮编',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 21 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '收货地址' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for order_goods
-- ----------------------------
DROP TABLE IF EXISTS `order_goods`;
CREATE TABLE `order_goods`  (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `order_id` int(10) NOT NULL COMMENT '订单id',
  `goods_id` int(10) DEFAULT NULL COMMENT '商品id',
  `goods_num` int(10) DEFAULT NULL COMMENT '商品数量',
  `goods_price` double(20, 2) DEFAULT NULL COMMENT '商品价格',
  `status` tinyint(4) DEFAULT 1 COMMENT '0-禁用，1-正常，-1-删除',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 13 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '订单-商品表' ROW_FORMAT = Fixed;

-- ----------------------------
-- Table structure for order_status
-- ----------------------------
DROP TABLE IF EXISTS `order_status`;
CREATE TABLE `order_status`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` tinyint(10) DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `text` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '订单状态-字典表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders`  (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `uid` int(10) NOT NULL COMMENT '用户id',
  `payment` double(20, 2) DEFAULT NULL COMMENT '支付金额',
  `payment_type` tinyint(2) DEFAULT NULL COMMENT '1-在线支付，1-货到付款',
  `pay_time` datetime DEFAULT NULL COMMENT '支付时间',
  `ship_fee` double(20, 2) DEFAULT NULL COMMENT '邮费',
  `ship_time` datetime DEFAULT NULL COMMENT '发货时间',
  `ship_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '快递公司',
  `ship_number` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '快递单号',
  `received_time` datetime DEFAULT NULL COMMENT '收货时间',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `finish_time` datetime DEFAULT NULL COMMENT '交易完成时间',
  `close_time` datetime DEFAULT NULL COMMENT '交易关闭时间',
  `order_state` int(10) DEFAULT 0 COMMENT '状态字典',
  `status` tinyint(4) DEFAULT 1 COMMENT '1-正常，0-禁用，-1-删除',
  `refund_state` tinyint(4) DEFAULT NULL COMMENT '退款状态',
  `comment_state` tinyint(4) DEFAULT NULL COMMENT '评论状态',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '订单表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户名',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密码',
  `nickname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '昵称',
  `sex` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '男' COMMENT '性别',
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT './images/avatar/default.jpg' COMMENT '头像',
  `tel` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '手机号码',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '用户表' ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
