-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mer. 05 avr. 2023 à 15:32
-- Version du serveur : 8.0.31
-- Version de PHP : 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `toolboxmania`
--

-- --------------------------------------------------------

--
-- Structure de la table `category`
--

DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `image_name` varchar(255) NOT NULL,
  `image_alt` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `category`
--

INSERT INTO `category` (`id`, `title`, `description`, `image_name`, `image_alt`) VALUES
(1, 'Powered tools', 'The best of the powered tools the world can offer to you', 'power_tool.avif', 'power tool'),
(2, 'Manual tool', 'Because when the apocalypse will come, you will always need some manual job to be done', 'manual_tool.png', 'manual tool'),
(3, 'Jardinage', 'Pour aller dans le jardin', 'jardinage.avif', 'Outils de jardinage');

-- --------------------------------------------------------

--
-- Structure de la table `customer_order`
--

DROP TABLE IF EXISTS `customer_order`;
CREATE TABLE IF NOT EXISTS `customer_order` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `total_price` decimal(8,2) NOT NULL,
  `is_payed` tinyint NOT NULL,
  `user_id` int UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `customer_order_ibfk_1` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `order_tool`
--

DROP TABLE IF EXISTS `order_tool`;
CREATE TABLE IF NOT EXISTS `order_tool` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `quantity` tinyint NOT NULL,
  `total_itemPrice` decimal(8,2) NOT NULL,
  `order_id` int UNSIGNED NOT NULL,
  `tool_id` int UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `order_tool_ibfk_1` (`tool_id`),
  KEY `order_tool_ibfk_2` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `packaging`
--

DROP TABLE IF EXISTS `packaging`;
CREATE TABLE IF NOT EXISTS `packaging` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `packaging`
--

INSERT INTO `packaging` (`id`, `type`) VALUES
(1, '100gr'),
(2, '500gr'),
(3, '1kg'),
(4, '1 piece'),
(5, '100 pieces'),
(6, '500 ml'),
(7, '1 Liter'),
(8, '10 Liter'),
(9, 'No battery'),
(10, 'Batterie 4.0 Ah'),
(11, 'battery 8.0 Ah');

-- --------------------------------------------------------

--
-- Structure de la table `tool`
--

DROP TABLE IF EXISTS `tool`;
CREATE TABLE IF NOT EXISTS `tool` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `main_title` varchar(100) NOT NULL,
  `secondary_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `main_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `image_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `image_alt` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `avg_vote` tinyint DEFAULT NULL,
  `vote_count` smallint DEFAULT NULL,
  `ref_product` varchar(50) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `category_id` int UNSIGNED DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `tool`
--

INSERT INTO `tool` (`id`, `main_title`, `secondary_title`, `main_description`, `image_name`, `image_alt`, `avg_vote`, `vote_count`, `ref_product`, `created_at`, `category_id`) VALUES
(1, 'Tournevis', 'Pour tourner les vis', 'Utile pour visser', 'tournevis.avif', 'tournevis', 0, 0, '100', '2023-03-07 12:06:06', 2),
(2, 'marteau', 'pour marteler', 'fait pour taper', 'marteau.avif', 'marteau', 0, 0, '101', '2023-03-07 21:38:52', 2),
(10, 'visseuse', 'visseuse electrique', 'Pour visser sans effort', 'visseuse.avif', 'une visseuse met une vis dans du bois', 0, 0, '103', '2023-03-18 12:38:04', 1),
(11, 'scie', 'scie a bois', 'avec toute ses dents', 'scie.avif', 'une scie', 0, 0, '104', '2023-03-18 12:45:16', 2),
(36, 'aaaaa', 'ergvstrbgdtrb', 'dftbhdfybn', NULL, NULL, NULL, NULL, '65432', '2023-04-04 16:05:11', 3),
(37, 'aaaaaaaaa', 'qqqqqqqqq', 'qqqqqqqqqq', NULL, NULL, NULL, NULL, 'sdtbsfgb', '2023-04-04 16:41:26', 3),
(38, 'qqqqqqqq', 'qqqqqqqqq', 'qqqqqqqqqq', NULL, NULL, NULL, NULL, '', '2023-04-04 16:41:52', 3);

-- --------------------------------------------------------

--
-- Structure de la table `tool_packaging`
--

DROP TABLE IF EXISTS `tool_packaging`;
CREATE TABLE IF NOT EXISTS `tool_packaging` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `quantity_in_stock` smallint NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `tool_id` int UNSIGNED NOT NULL,
  `packaging_id` int UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tool_packaging_ibfk_1` (`packaging_id`),
  KEY `tool_packaging_ibfk_2` (`tool_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `tool_packaging`
--

INSERT INTO `tool_packaging` (`id`, `quantity_in_stock`, `price`, `tool_id`, `packaging_id`) VALUES
(1, 50, '8.00', 1, 4),
(2, 24, '17.00', 2, 4),
(6, 12, '120.00', 10, 4),
(7, 20, '15.00', 11, 4),
(11, 20, '3.00', 1, 4),
(21, 345, '3.00', 36, 3),
(22, 12, '1090.00', 37, 4),
(23, 12, '1090.00', 38, 4);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(50) NOT NULL,
  `postal_code` varchar(10) NOT NULL,
  `country` varchar(50) NOT NULL,
  `phone_number` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `isAdmin` tinyint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `first_name`, `last_name`, `address`, `city`, `postal_code`, `country`, `phone_number`, `created_at`, `isAdmin`) VALUES
(6, 'test2@test.com', '$2b$10$IqXOQVfgBVnv8MFBid5I..hiFIWJ6hSXT45JjUxWQuzkTo4vabgh.', 'Jtestn', 'Doe', '123 Main St', 'Anytown', '12345', 'USA', '555-1234', '2023-03-10 08:49:34', 0),
(8, 'test@test.com', '$2b$10$268CW7djqQNGmdFM2Ti7tuVcVVbn1Ex4LErUePAbB1.SvlT5ZC8j.', 'test', 'test', 'test', '12345', 'test', 'test', '0987654321', '2023-03-27 19:56:23', 1),
(9, 'test9@test.com', '$2b$10$l54qojq2b6jDBAFdNMuiPuq2Q6maiddRhtmYq85AykpNm6s.xQrJC', 'flo', 'lo', 'ici', 'ams', '21345', 'far', '1234567890', '2023-03-29 10:08:19', 0);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `customer_order`
--
ALTER TABLE `customer_order`
  ADD CONSTRAINT `customer_order_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Contraintes pour la table `order_tool`
--
ALTER TABLE `order_tool`
  ADD CONSTRAINT `order_tool_ibfk_1` FOREIGN KEY (`tool_id`) REFERENCES `tool` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  ADD CONSTRAINT `order_tool_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `customer_order` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `tool`
--
ALTER TABLE `tool`
  ADD CONSTRAINT `tool_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `tool_packaging`
--
ALTER TABLE `tool_packaging`
  ADD CONSTRAINT `tool_packaging_ibfk_1` FOREIGN KEY (`packaging_id`) REFERENCES `packaging` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tool_packaging_ibfk_2` FOREIGN KEY (`tool_id`) REFERENCES `tool` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
