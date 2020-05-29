CREATE DATABASE rodeo;

USE rodeo;

CREATE TABLE events (
    id INT AUTO_INCREMENT NOT NULL,
    event_name VARCHAR(255) NOT NULL,
    tier_id INT NOT NULL,
    year INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE tiers (
    id INT AUTO_INCREMENT NOT NULL,
    tier_name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE people (
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    org_name VARCHAR(255) NOT NULL,
    team_id INT NOT NULL,
    tier_id INT NOT NULL,
    year INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE teams (
    id INT AUTO_INCREMENT NOT NULL,
    team_name VARCHAR(255) NOT NULL,
    tier_id INT NOT NULL,
    year INT NOT NULL,
    coop BOOLEAN NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE scores (
    id INT AUTO_INCREMENT NOT NULL,
    event_id INT NOT NULL,
    team_id INT NOT NULL,
    score INT NOT NULL,
    time_min INT NOT NULL,
    time_sec INT NOT NULL,
    PRIMARY KEY (id)
);