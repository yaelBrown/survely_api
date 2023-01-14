
use survely; 

-- users
-- insert into users
insert into users (email, name, password) values ('admin', 'admin1', 'password');





select * from users;




CREATE TABLE `surveys` (
  `id` int unsigned AUTO_INCREMENT PRIMARY KEY,
  `surveyor_user_id` int unsigned,
  `surveyor_group_id` int unsigned,
  `survey_name` varchar(255) NOT NULL,
  `survey_date` datetime,
  `survey_is_active` boolean DEFAULT false,
  `surveyee_text` json,
  `surveyee_whatsapp` json,
  `surveyee_email` json,
  `survey_questions` json
);



CREATE TABLE `users` (
  `id` int unsigned PRIMARY KEY,
  `email` varchar(255) UNIQUE NOT NULL,
  `name` varchar(255),
  `password` varchar(255) NOT NULL,
  `last_login` datetime
);