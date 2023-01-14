drop database if exists survely;
create database survely; 
use survely;

CREATE TABLE `users` (
  `id` int unsigned AUTO_INCREMENT PRIMARY KEY,
  `email` varchar(255) UNIQUE NOT NULL,
  `name` varchar(255),
  `password` varchar(255) NOT NULL,
  `last_login` datetime
);

CREATE TABLE `users_meta` (
  `id` int unsigned AUTO_INCREMENT PRIMARY KEY,
  `user_id` int unsigned NOT NULL UNIQUE,
  `last_login` datetime,
  `created_date` datetime,
  `service_level` enum('zero', 'one', 'two', 'admin') NOT NULL,
  `surveys_created_count` int DEFAULT 0,
  `groups_created_count` int DEFAULT 0
);

CREATE TABLE `users_groups` (
  `id` int unsigned AUTO_INCREMENT PRIMARY KEY,
  `user_id` int unsigned NOT NULL,
  `groups_id` int unsigned NOT NULL,
  `can_read` boolean NOT NULL,
  `can_create` boolean NOT NULL,
  `can_delete` boolean NOT NULL,
  `can_edit` boolean NOT NULL,
  `can_add_people` boolean NOT NULL,
  `can_rem_people` boolean NOT NULL,
  `can_edit_people` boolean NOT NULL
);

CREATE TABLE `groups` (
  `id` int unsigned AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(255) NOT NULL,
  `admin_id` int NOT NULL
);

CREATE TABLE `groups_meta` (
  `id` int unsigned AUTO_INCREMENT PRIMARY KEY,
  `groups_id` int unsigned NOT NULL,
  `created_date` datetime
);

CREATE TABLE `surveys` (
  `id` int unsigned AUTO_INCREMENT PRIMARY KEY,
  `surveyor_user_id` int unsigned,
  `surveyor_group_id` int unsigned,
  `survey_name` varchar(255) NOT NULL,
  `survey_date` datetime,
  `survey_is_active` boolean DEFAULT false
);

CREATE TABLE `survey_questions` (
  `id` int unsigned AUTO_INCREMENT PRIMARY KEY,
  `survey_id` int unsigned,
  `question` longtext NOT NULL,
  `question_order` int NOT NULL
);

CREATE TABLE `survey_responses` (
  `id` int unsigned AUTO_INCREMENT PRIMARY KEY,
  `survey_id` int unsigned NOT NULL,
  `surveyee_id` int unsigned,
  `question_id` varchar(255) NOT NULL,
  `response` varchar(255) NOT NULL,
  `responded_date` datetime
);

CREATE TABLE `surveyees` (
  `id` int unsigned AUTO_INCREMENT PRIMARY KEY,
  `path` varchar(50) NOT NULL, 
  `survey_id` int unsigned NOT NULL,
  `surveyee_mobile` int,
  `surveyee_whatsapp` int,
  `surveyee_email` int
);

CREATE TABLE `surveyee_lists` (
  `id` int unsigned AUTO_INCREMENT PRIMARY KEY,
  `surveyor_user_id` int unsigned NOT NULL,
  `surveyor_group_id` int unsigned,
  `surveyee_text` json,
  `surveyee_whatsapp` json,
  `surveyee_email` json
);

ALTER TABLE `users_groups` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `users_meta` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `surveyee_lists` ADD FOREIGN KEY (`surveyor_user_id`) REFERENCES `users` (`id`);

ALTER TABLE `users_groups` ADD FOREIGN KEY (`groups_id`) REFERENCES `groups` (`id`);

ALTER TABLE `surveys` ADD FOREIGN KEY (`surveyor_user_id`) REFERENCES `users` (`id`);

ALTER TABLE `surveys` ADD FOREIGN KEY (`surveyor_group_id`) REFERENCES `groups` (`id`);

ALTER TABLE `groups_meta` ADD FOREIGN KEY (`groups_id`) REFERENCES `groups` (`id`);

ALTER TABLE `surveyees` ADD FOREIGN KEY (`survey_id`) REFERENCES `surveys` (`id`);

ALTER TABLE `surveyee_lists` ADD FOREIGN KEY (`surveyor_group_id`) REFERENCES `groups` (`id`);

ALTER TABLE `survey_responses` ADD FOREIGN KEY (`survey_id`) REFERENCES `surveys` (`id`);

ALTER TABLE `survey_responses` ADD FOREIGN KEY (`surveyee_id`) REFERENCES `surveyees` (`id`);

ALTER TABLE `survey_questions` ADD FOREIGN KEY (`survey_id`) REFERENCES `surveys` (`id`);
