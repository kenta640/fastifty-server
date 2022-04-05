CREATE DATABASE IF NOT EXISTS socialmedia;
USE socialmedia;

CREATE TABLE IF NOT EXISTS User ( id VARCHAR(30) NOT NULL,
                    name VARCHAR(30) NOT NULL,
                    email VARCHAR(30) NOT NULL,
                    password VARCHAR(30) NOT NULL,
                    role ENUM('admin', 'user'),
                    PRIMARY KEY(id));


CREATE TABLE IF NOT EXISTS Novel ( id VARCHAR(30) NOT NULL,
                     userid VARCHAR(30) NOT NULL,
                     title VARCHAR(30) NOT NULL,
                     published_date DATE,
                     PRIMARY KEY(id);
                     FOREIGN KEY(userid));

CREATE TABLE IF NOT EXISTS Episode( id VARCHAR(30) NOT NULL,
                     novelid VARCHAR(30)
                     published_date DATE,
                     PRIMARY KEY(id),
                     FOREIGN KEY(novelid));

--CREATE TABLE Post ( id VARCHAR(30) NOT NULL,)

INSERT INTO USER (id, name, email, password, role)
VALUES ("00001", "admin", "admin@example.com", "admin", "admin");

INSERT INTO Novel ( id, userid, title)
VALUES ("000001", "00001", "Suck it");