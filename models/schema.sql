DROP DATABASE IF EXISTS blobber_db;

CREATE DATABASE blobber_db;
USE blobber_db;

CREATE TABLE players(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  wins INT default 0,
  losses INT default 0,
  PRIMARY KEY (id)
);
