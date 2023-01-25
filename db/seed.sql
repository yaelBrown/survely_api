use survely; 

-- users
-- insert into users
insert into users (email, name, password) values ('admin', 'admin1', 'password');

select * from users;

-- Survey 
-- insert into surveys
insert into surveys (surveyor_user_id, survey_name) values (1, 'Demo Survey');

select * from surveys;

-- Surveyee
-- insert into surveyee
insert into surveyees (path, survey_id, surveyee_email) values ('fjedqSQJ', 1, 'yaelrbrowndev@gmail.com');
insert into surveyees (path, survey_id, surveyee_name, surveyee_email) values ('fcmaicIbL', 1, 'Steve', 'test444@mailinator.com');

select * from surveyees where path = 'fjedqSQJ';
SELECT * FROM surveyees WHERE PATH = 'cookies';

select * from surveyees;


