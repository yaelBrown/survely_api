CREATE TABLE `users` (
  `id` int PRIMARY KEY,
  `email` varchar(255),
  `name` varchar(255),
  `password` varchar(255),
  `last_login` datetime,
  `created_date` datetime
);

CREATE TABLE `users_meta` (
  `id` int PRIMARY KEY,
  `user_id` int,
  `last_login` datetime,
  `created_date` datetime,
  `service_level` enum,
  `surveys_created_count` int,
  `groups_created_count` int
);

CREATE TABLE `users_groups` (
  `id` int PRIMARY KEY,
  `user_id` int,
  `groups_id` int,
  `can_read` boolean,
  `can_create` boolean,
  `can_delete` boolean,
  `can_edit` boolean,
  `can_add_people` boolean,
  `can_rem_people` boolean,
  `can_edit_people` boolean
);

CREATE TABLE `groups` (
  `id` int PRIMARY KEY,
  `name` varchar(255),
  `admin_id` int
);

CREATE TABLE `groups_meta` (
  `id` int PRIMARY KEY,
  `groups_id` int,
  `created_date` datetime
);

CREATE TABLE `surveys` (
  `id` int PRIMARY KEY,
  `surveyor_id` int,
  `surveyor_group_id` int,
  `survey_name` varchar(255),
  `survey_date` datetime,
  `survey_is_active` boolean,
  `surveyee_text` json,
  `surveyee_whatsapp` json,
  `surveyee_email` json,
  `survey_questions` json
);

CREATE TABLE `survey_responses` (
  `id` int PRIMARY KEY,
  `survey_id` int,
  `surveyee_id` varchar(255),
  `question_id` varchar(255),
  `response` varchar(255),
  `responded_date` datetime
);

ALTER TABLE `users_groups` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
ALTER TABLE `users_meta` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
ALTER TABLE `groups` ADD FOREIGN KEY (`id`) REFERENCES `users_groups` (`groups_id`);
ALTER TABLE `surveys` ADD FOREIGN KEY (`surveyor_id`) REFERENCES `users` (`id`);
ALTER TABLE `surveys` ADD FOREIGN KEY (`surveyor_group_id`) REFERENCES `groups` (`id`);
ALTER TABLE `groups_meta` ADD FOREIGN KEY (`groups_id`) REFERENCES `groups` (`id`);
ALTER TABLE `survey_responses` ADD FOREIGN KEY (`survey_id`) REFERENCES `surveys` (`id`);
