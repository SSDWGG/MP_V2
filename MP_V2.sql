/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80028
 Source Host           : localhost:3306
 Source Schema         : MP_V2

 Target Server Type    : MySQL
 Target Server Version : 80028
 File Encoding         : 65001

 Date: 16/06/2022 16:44:43
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for memo
-- ----------------------------
DROP TABLE IF EXISTS `memo`;
CREATE TABLE `memo` (
  `memoid` bigint NOT NULL COMMENT '主键',
  `userid` bigint NOT NULL COMMENT '用户id',
  `cover` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '图片',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '标题',
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '内容',
  `create_time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '账户创建时间',
  `update_time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '账户修改时间',
  `version` int DEFAULT '1' COMMENT '乐观锁，异步锁',
  `deleted` int DEFAULT '0' COMMENT '逻辑删除',
  PRIMARY KEY (`memoid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of memo
-- ----------------------------
BEGIN;
INSERT INTO `memo` VALUES (1537351488720138242, 1535230334777806849, '/rabbit.jpg', 'ceshi1', 'ceahi1', '2022-06-16 16:28:52', '2022-06-16 16:28:52', 1, 0);
INSERT INTO `memo` VALUES (1537351556554616834, 1535230334777806849, '/rabbit.jpg', '123', '123', '2022-06-16 16:38:59', '2022-06-16 16:38:59', 1, 0);
INSERT INTO `memo` VALUES (1537351567380115457, 1535230334777806849, '/rabbit.jpg', '123', '123', '2022-06-16 16:29:11', '2022-06-16 16:29:11', 1, 0);
INSERT INTO `memo` VALUES (1537351579082223618, 1535230334777806849, '/rabbit.jpg', '123', '123', '2022-06-16 16:29:14', '2022-06-16 16:29:14', 1, 0);
INSERT INTO `memo` VALUES (1537351589320519682, 1535230334777806849, '/rabbit.jpg', '123', '312', '2022-06-16 16:39:05', '2022-06-16 16:39:05', 1, 0);
INSERT INTO `memo` VALUES (1537351599764336641, 1535230334777806849, '/rabbit.jpg', '123', '132', '2022-06-16 16:39:02', '2022-06-16 16:39:03', 1, 0);
COMMIT;

-- ----------------------------
-- Table structure for todo
-- ----------------------------
DROP TABLE IF EXISTS `todo`;
CREATE TABLE `todo` (
  `todoid` bigint NOT NULL AUTO_INCREMENT COMMENT 'todoid',
  `userid` bigint NOT NULL COMMENT '用户id',
  `todotitle` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '标题',
  `tododescribe` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '描述',
  `classify` varchar(255) DEFAULT NULL COMMENT '分类',
  `okflag` int DEFAULT '0' COMMENT '未开始0，进行中1，阻塞2，完成3',
  `wantend_time` datetime DEFAULT NULL COMMENT '任务计划结束时间',
  `begin_time` datetime DEFAULT NULL COMMENT '任务开始时间',
  `infactend_time` datetime DEFAULT NULL COMMENT '任务实际结束时间',
  `schedule` float(255,0) DEFAULT '0' COMMENT '任务进度',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  `create_time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '账户创建时间',
  `update_time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '账户修改时间',
  `version` int DEFAULT '1' COMMENT '乐观锁，异步锁',
  `deleted` int DEFAULT '0' COMMENT '逻辑删除',
  PRIMARY KEY (`todoid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1537320887212318723 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of todo
-- ----------------------------
BEGIN;
INSERT INTO `todo` VALUES (1536569979795709954, 1536532257915809794, '8030LED图片优化', NULL, 'Listing', 3, '2022-06-14 15:00:00', '2022-06-14 13:00:00', '2022-06-15 10:48:18', 100, NULL, '2022-06-14 12:43:26', '2022-06-15 10:48:18', 4, 0);
INSERT INTO `todo` VALUES (1536570277490630657, 1536532257915809794, 'POLY图片优化', '图片English国家优先', 'Listing', 2, '2022-06-16 12:00:00', '2022-06-15 09:00:00', NULL, 1, NULL, '2022-06-14 12:44:37', '2022-06-15 16:47:24', 8, 0);
INSERT INTO `todo` VALUES (1536614720654581761, 1536532257915809794, '欧洲站鼠标垫listing整理', NULL, 'Listing', 3, '2022-06-14 17:00:00', '2022-06-14 16:00:00', '2022-06-15 10:48:22', 100, NULL, '2022-06-14 15:41:13', '2022-06-15 10:48:22', 5, 0);
INSERT INTO `todo` VALUES (1536897583232884738, 1536532257915809794, 'LED欧洲站图片更新', '图片改为各站点语种', 'Listing', 3, '2022-06-16 17:00:00', '2022-06-16 09:00:00', '2022-06-16 16:40:34', 100, NULL, '2022-06-15 10:25:13', '2022-06-16 16:40:35', 6, 0);
INSERT INTO `todo` VALUES (1536898468541407233, 1536532257915809794, '欧洲组VAT第二季度申报', '', 'Summary', 1, '2022-07-02 10:00:00', '2022-07-02 09:00:00', NULL, 1, NULL, '2022-06-15 10:28:44', '2022-06-15 10:43:37', 2, 0);
INSERT INTO `todo` VALUES (1536902611641344002, 1536532257915809794, '家居用品Brand名称确认', '', 'Other', 1, '2022-06-17 17:00:00', '2022-06-10 16:00:00', NULL, 20, NULL, '2022-06-15 10:45:12', '2022-06-15 10:45:12', 1, 0);
INSERT INTO `todo` VALUES (1536996128086597634, 1536532257915809794, '英国站瑜伽垫捆带Listing', '目的：创建捆绑Asin，刺激3.5mm销量。统计库存数量', 'Listing', 1, '2022-06-17 17:00:00', '2022-06-17 09:00:00', NULL, 1, NULL, '2022-06-15 16:56:48', '2022-06-15 16:56:48', 1, 0);
INSERT INTO `todo` VALUES (1536996483117654018, 1536532257915809794, '耳机畅销产品Asin收集', '供国际站客户推广方向', 'Other', 1, NULL, NULL, NULL, 1, NULL, '2022-06-15 16:58:12', '2022-06-15 16:58:12', 1, 0);
INSERT INTO `todo` VALUES (1536996943404769281, 1536532257915809794, '对比德国站VS西班牙站头程的利润', NULL, 'Other', 1, '2022-06-16 17:00:00', '2022-06-16 09:00:00', NULL, 1, NULL, '2022-06-15 17:00:02', '2022-06-15 17:00:02', 1, 0);
COMMIT;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `userid` bigint NOT NULL COMMENT '用户id',
  `username` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户名',
  `password` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户密码',
  `email` varchar(255) NOT NULL COMMENT '邮箱',
  `avatar` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '用户头像',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '头衔',
  `phone` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '电话',
  `gender` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '性别',
  `signature` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '格言',
  `scrolltip` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '滚动格言',
  `geographic` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '省市（使用-隔开）',
  `tags` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '个人标签',
  `todoclassify` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT 'todo分类',
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '地址',
  `admin` int DEFAULT '0' COMMENT '管理员标识',
  `create_time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '账户创建时间',
  `update_time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '账户修改时间',
  `version` int DEFAULT '1' COMMENT '乐观锁，异步锁',
  `deleted` int DEFAULT '0' COMMENT '逻辑删除',
  PRIMARY KEY (`userid`) USING BTREE,
  UNIQUE KEY `username` (`username`) COMMENT '唯一索引'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of users
-- ----------------------------
BEGIN;
INSERT INTO `users` VALUES (1536214568626384898, 'shuangl1', '130cded95567930cfd5d6b4a1c3d3175', 'nosh-z@163.com', '/rabbit.jpg', '初来乍到的新人', '18267426323', NULL, '在醒着的时间里，追求你认为最有意义的~', '成功的道路并不拥挤，因为坚持的人并不多。', NULL, NULL, NULL, NULL, 0, '2022-06-13 13:11:09', '2022-06-13 13:11:09', 1, 0);
INSERT INTO `users` VALUES (1536532257915809794, '七七小超人', 'a4ccbaf63015d5cccca441e1c3d926a0', '670883061@qq.com', '/rabbit.jpg', 'wgg的爸爸', '18758752692', '咩啊', '什么时候能退休啊', '不要摸鱼不要摸鱼不要摸鱼不要摸鱼不要摸鱼不要摸鱼', '浙江省-杭州市', '', 'Advertising-Shipping-Listing-Summary-Other', '不明', 0, '2022-06-15 10:43:03', '2022-06-15 10:43:03', 1, 0);
INSERT INTO `users` VALUES (1536534555404546049, 'ssdwgg', '73e81da9a439cdae1ec48d8aecbb224c', '123@QQ.COM', '/avatar/1536534555404546049avatar.jpg', '初来乍到的新人', '19993748885', '123', '生命就像一盒巧克力，结果往往出人意料。', '成功的道路并不拥挤，因为坚持的人并不多。', '北京市-市辖区', NULL, NULL, NULL, 0, '2022-06-14 11:22:23', '2022-06-14 17:34:14', 2, 0);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
