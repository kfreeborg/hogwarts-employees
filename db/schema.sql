DROP DATABASE IF EXISTS hogwarts_db;

CREATE DATABASE hogwarts_db;

USE hogwarts_db;

CREATE TABLE department (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(30) NULL
);

CREATE TABLE role (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary DECIMAL NOT NULL,
  department_id INT
);

CREATE TABLE employee (
  id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INT,
  manager_id INT
);