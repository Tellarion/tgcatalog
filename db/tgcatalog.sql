-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Хост: localhost:3306
-- Время создания: Окт 08 2023 г., 14:04
-- Версия сервера: 5.7.31-0ubuntu0.18.04.1
-- Версия PHP: 7.4.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `tgcatalog`
--

-- --------------------------------------------------------

--
-- Структура таблицы `catalog`
--

CREATE TABLE `catalog` (
  `id` int(11) NOT NULL,
  `title` varchar(128) NOT NULL DEFAULT 'Unknown',
  `titleT` varchar(64) NOT NULL,
  `username` varchar(64) DEFAULT NULL,
  `photo` varchar(128) DEFAULT NULL,
  `about` varchar(1024) DEFAULT NULL,
  `verified` tinyint(1) NOT NULL DEFAULT '0',
  `broadcast` tinyint(1) NOT NULL DEFAULT '0',
  `megagroup` tinyint(1) NOT NULL DEFAULT '0',
  `restricted` tinyint(1) NOT NULL DEFAULT '0',
  `min` tinyint(1) NOT NULL DEFAULT '0',
  `scam` tinyint(1) NOT NULL DEFAULT '0',
  `slowmodeEnabled` tinyint(1) NOT NULL DEFAULT '0',
  `gigagroup` tinyint(1) NOT NULL DEFAULT '0',
  `fake` tinyint(1) NOT NULL DEFAULT '0',
  `noforwards` tinyint(1) NOT NULL DEFAULT '0',
  `blocked` tinyint(1) NOT NULL DEFAULT '0',
  `participants` int(11) NOT NULL DEFAULT '0',
  `categoryId` int(11) NOT NULL DEFAULT '-1',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Структура таблицы `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `country` int(11) NOT NULL DEFAULT '1',
  `name` varchar(64) NOT NULL DEFAULT 'N/A',
  `nameT` varchar(64) NOT NULL,
  `rating` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `category`
--

INSERT INTO `category` (`id`, `country`, `name`, `nameT`, `rating`) VALUES
(2, 1, 'Авто и мото', 'autoandmoto', 7),
(3, 1, 'Авторские блоги', 'author', 2),
(4, 1, 'Бизнес и стартапы', 'business', 12),
(5, 1, 'Видеоигры', 'games', 8),
(6, 1, 'В мире животных', 'animals', 8),
(7, 1, 'Дети и родители', 'family', 4),
(8, 1, 'Еда и кулинария', 'food', 2),
(9, 1, 'Здоровье и медицина', 'health', 4),
(10, 1, 'Знаменитости', 'notability', 3),
(11, 1, 'Инвестиции', 'investments', 5),
(12, 1, 'Иностранные языки', 'languages', 13),
(13, 1, 'Интернет технологии', 'it', 37),
(14, 1, 'Искусство и дизайн', 'desing', 3),
(15, 1, 'История', 'history', 3),
(16, 1, 'Книги, Аудиокниги и Подкасты', 'booksaudiocasts', 5),
(17, 1, 'Красота и уход', 'beauty', 6),
(18, 1, 'Криптовалюты', 'crypto', 17),
(19, 1, 'Культура и события', 'culture', 4),
(20, 1, 'Маркетинг и PR', 'marketing', 7),
(21, 1, 'Мода и стиль', 'style', 3),
(22, 1, 'Мотивация и саморазвитие', 'development', 6),
(23, 1, 'Музыка', 'music', 15),
(24, 1, 'Наука и технологии', 'science', 3),
(25, 1, 'Недвижимость', 'state', 4),
(26, 1, 'Новости и СМИ', 'media', 6),
(27, 1, 'Образование', 'education', 12),
(28, 1, 'Отдых и развлечения', 'chill', 21),
(29, 1, 'Психология и отношения', 'psychology', 7),
(30, 1, 'Путешествия и туризм', 'travel', 2),
(31, 1, 'Работа и вакансии', 'job', 25),
(32, 1, 'Региональные', 'regional', 36),
(33, 1, 'Религия и духовность', 'religion', 2),
(34, 1, 'Скидки и акции', 'discounts', 18),
(35, 1, 'Спорт', 'sport', 10),
(36, 1, 'Строительство и ремонт', 'builder', 6),
(37, 1, 'Трейдинг', 'trading', 51),
(38, 1, 'Фитнес', 'fitness', 3),
(39, 1, 'Хобби', 'hobby', 6),
(40, 1, 'Экономика и Финансы', 'finances', 4),
(41, 1, 'Юмор и мемы', 'humor', 4),
(42, 1, 'Юриспруденция', 'jurisprudence', 4),
(43, 1, 'Для взрослых 18+', 'adult', 620),
(44, 2, 'All', 'all', 0),
(45, 1, 'Знакомства и отношения', 'relations', 275),
(46, 1, 'Прочее', 'others', 17);

-- --------------------------------------------------------

--
-- Структура таблицы `country`
--

CREATE TABLE `country` (
  `id` int(11) NOT NULL,
  `name` varchar(64) CHARACTER SET utf8 DEFAULT NULL,
  `fullName` varchar(64) DEFAULT NULL,
  `flag` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `country`
--

INSERT INTO `country` (`id`, `name`, `fullName`, `flag`) VALUES
(1, 'ru', 'Россия', NULL),
(2, 'en', 'English', NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `parser`
--

CREATE TABLE `parser` (
  `id` int(11) NOT NULL,
  `username` varchar(32) NOT NULL,
  `inbase` int(11) NOT NULL,
  `limiter` int(11) NOT NULL DEFAULT '10000',
  `upd` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `parser`
--

INSERT INTO `parser` (`id`, `username`, `inbase`, `limiter`, `upd`) VALUES
(1, 'tgcatalogparse', 0, 10000, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `types`
--

CREATE TABLE `types` (
  `id` int(11) NOT NULL,
  `country` int(11) NOT NULL DEFAULT '1',
  `name` varchar(64) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `types`
--

INSERT INTO `types` (`id`, `country`, `name`) VALUES
(1, 1, 'Каналы'),
(2, 1, 'Боты'),
(3, 1, 'Чаты'),
(4, 2, 'Channels'),
(5, 2, 'Bots'),
(6, 2, 'Chats');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `catalog`
--
ALTER TABLE `catalog`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Индексы таблицы `country`
--
ALTER TABLE `country`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Индексы таблицы `parser`
--
ALTER TABLE `parser`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `types`
--
ALTER TABLE `types`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `catalog`
--
ALTER TABLE `catalog`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=308;
--
-- AUTO_INCREMENT для таблицы `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;
--
-- AUTO_INCREMENT для таблицы `country`
--
ALTER TABLE `country`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT для таблицы `parser`
--
ALTER TABLE `parser`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT для таблицы `types`
--
ALTER TABLE `types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
