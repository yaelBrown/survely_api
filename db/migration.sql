CREATE TABLE `users` (
  `id` int unsigned PRIMARY KEY,
  `email` varchar(255) UNIQUE NOT NULL,
  `name` varchar(255),
  `password` varchar(255) NOT NULL,
  `last_login` datetime,
);

CREATE TABLE `users_meta` (
  `id` int PRIMARY KEY,
  `user_id` int NOT NULL UNIQUE,
  `last_login` datetime,
  `created_date` datetime,
  `service_level` enum NOT NULl, -- set default service_level here 
  `surveys_created_count` int DEFAULT 0,
  `groups_created_count` int DEFAULT 0
);

CREATE TABLE `users_groups` (
  `id` int PRIMARY KEY,
  `user_id` int NOT NULL,
  `groups_id` int NOT NULL,
  `can_read` boolean NOT NULL,
  `can_create` boolean NOT NULL,
  `can_delete` boolean NOT NULL,
  `can_edit` boolean NOT NULL,
  `can_add_people` boolean NOT NULL,
  `can_rem_people` boolean NOT NULL,
  `can_edit_people` boolean NOT NULL
);

CREATE TABLE `groups` (
  `id` int PRIMARY KEY,
  `name` varchar(255) NOT NULL,
  `admin_id` int NOT NULL
);

CREATE TABLE `groups_meta` (
  `id` int PRIMARY KEY,
  `groups_id` int NOT NULL,
  `created_date` datetime
);

CREATE TABLE `surveys` (
  `id` int PRIMARY KEY,
  `surveyor_user_id` int,
  `surveyor_group_id` int,
  `survey_name` varchar(255) NOT NULL,
  `survey_date` datetime,
  `survey_is_active` boolean DEFAULT false,
  `surveyee_text` json,
  `surveyee_whatsapp` json,
  `surveyee_email` json,
  `survey_questions` json
);

CREATE TABLE `survey_responses` (
  `id` int PRIMARY KEY,
  `survey_id` int NOT NULL,
  `surveyee_id` varchar(255),
  `question_id` varchar(255) NOT NULL,
  `response` varchar(255) NOT NULL,
  `responded_date` datetime
);

CREATE TABLE `surveyee_list` (
  `id` int PRIMARY KEY,
  `surveyor_user_id` int NOT NULL,
  `surveyor_group_id` int,
  `surveyee_text` json,
  `surveyee_whatsapp` json,
  `surveyee_email` json
);

ALTER TABLE `users_groups` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `users_meta` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `surveyee_list` ADD FOREIGN KEY (`surveyor_user_id`) REFERENCES `users` (`id`);

ALTER TABLE `groups` ADD FOREIGN KEY (`id`) REFERENCES `users_groups` (`groups_id`);

ALTER TABLE `surveys` ADD FOREIGN KEY (`surveyor_user_id`) REFERENCES `users` (`id`);

ALTER TABLE `surveys` ADD FOREIGN KEY (`surveyor_group_id`) REFERENCES `groups` (`id`);

ALTER TABLE `groups_meta` ADD FOREIGN KEY (`groups_id`) REFERENCES `groups` (`id`);

ALTER TABLE `surveyee_list` ADD FOREIGN KEY (`surveyor_group_id`) REFERENCES `groups` (`id`);

ALTER TABLE `survey_responses` ADD FOREIGN KEY (`survey_id`) REFERENCES `surveys` (`id`);
