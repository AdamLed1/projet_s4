-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mar. 29 mars 2022 à 20:24
-- Version du serveur : 10.4.22-MariaDB
-- Version de PHP : 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `angular_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `administrateur`
--

CREATE TABLE `administrateur` (
  `id_admin` bigint(20) UNSIGNED NOT NULL,
  `login` varchar(25) DEFAULT NULL,
  `mdp` varchar(128) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `administrateur`
--

INSERT INTO `administrateur` (`id_admin`, `login`, `mdp`) VALUES
(3, 'admin', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918');

-- --------------------------------------------------------

--
-- Structure de la table `categorie`
--

CREATE TABLE `categorie` (
  `id_cat` bigint(20) UNSIGNED NOT NULL,
  `intitule` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `categorie`
--

INSERT INTO `categorie` (`id_cat`, `intitule`) VALUES
(1, 'T1'),
(2, 'T2'),
(3, 'T3'),
(4, 'T4');

-- --------------------------------------------------------

--
-- Structure de la table `commune`
--

CREATE TABLE `commune` (
  `id_commune` bigint(20) UNSIGNED NOT NULL,
  `intitule` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `commune`
--

INSERT INTO `commune` (`id_commune`, `intitule`) VALUES
(1, 'Paris'),
(2, 'Lyon'),
(3, 'Marseille');

-- --------------------------------------------------------

--
-- Structure de la table `maison`
--

CREATE TABLE `maison` (
  `id_maison` bigint(20) UNSIGNED NOT NULL,
  `prix` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `surface_hab` smallint(6) DEFAULT NULL,
  `surface_jardin` smallint(6) DEFAULT NULL,
  `voisinage` tinyint(1) DEFAULT NULL,
  `id_commune` int(11) DEFAULT NULL,
  `id_cat` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `maison`
--

INSERT INTO `maison` (`id_maison`, `prix`, `description`, `url`, `surface_hab`, `surface_jardin`, `voisinage`, `id_commune`, `id_cat`) VALUES
(46, 550000, '(Belle maison située à la périphérie de Lyon.)', '(https://images.prismic.io/travauxlib/0e9aa37c-8960-4ff0-8203-bd0a8bf3f068_prix-construction-maison-neuve.jpg?ixlib=gatsbyFP&amp;auto=compress%2Cformat&amp;fit=clip&amp;q=80&amp;rect=0%2C0%2C1950%2C1200&amp;w=750&amp;h=462)', 250, 1500, 0, 2, 4),
(47, 900000, '(Maison moderne à cinq minutes du centre-ville de Marseille.)', '(https://actualite.seloger-construire.com/sites/default/files/edito_migrate/article/image/maison-moderne-formes-atypiques.jpg)', 350, 1000, 0, 3, 4),
(48, 650000, '(Appartement parisien très côté.)', '(https://www.madamedecore.com/sites/default/files/blogger_importer/s1600/5YTM-U0RSFET%252CgTM.png)', 120, 0, 1, 1, 3),
(49, 320000, '(Maison récemment construite en petite couronne parisienne.)', '(https://manager.groupe-bdl.com/web-content/img/modeles/2021/04/modele-de-maison-contemporaine-a-etage-114-facade-avant-7f6a514-1200x820.jpg)', 120, 300, 1, 1, 3),
(50, 250000, '(Petit appartement parisien.)', '(https://d7b3sch6x3cpd.cloudfront.net/annonces/10/f6/a5/67/19/f9/ac/fa/aa/d0/c4/52/03/5d/62/7e/lg.jpeg)', 30, 0, 1, 1, 2),
(51, 200000, '(Maison ancienne non loin de la région Lyonnaise.)', '(https://6nergies.fr/wp-content/uploads/2021/02/ancienne-maison-pompe-a-chaleur.jpg)', 120, 450, 0, 2, 3),
(52, 150000, '(Nouvelle maison dans la banlieue Marseillaise.)', '(https://gib-construction.com/wp-content/uploads/2020/10/faire-construire-pas-cher-devenir-propri%C3%A9taire-maison-neuve-Gironde-Bellebat.jpg)', 90, 250, 1, 3, 3);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `administrateur`
--
ALTER TABLE `administrateur`
  ADD PRIMARY KEY (`id_admin`),
  ADD UNIQUE KEY `id_admin` (`id_admin`);

--
-- Index pour la table `categorie`
--
ALTER TABLE `categorie`
  ADD PRIMARY KEY (`id_cat`),
  ADD UNIQUE KEY `id_cat` (`id_cat`);

--
-- Index pour la table `commune`
--
ALTER TABLE `commune`
  ADD PRIMARY KEY (`id_commune`),
  ADD UNIQUE KEY `id_commune` (`id_commune`);

--
-- Index pour la table `maison`
--
ALTER TABLE `maison`
  ADD PRIMARY KEY (`id_maison`),
  ADD UNIQUE KEY `id_maison` (`id_maison`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `administrateur`
--
ALTER TABLE `administrateur`
  MODIFY `id_admin` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `categorie`
--
ALTER TABLE `categorie`
  MODIFY `id_cat` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `commune`
--
ALTER TABLE `commune`
  MODIFY `id_commune` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `maison`
--
ALTER TABLE `maison`
  MODIFY `id_maison` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
