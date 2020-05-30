USE f53njecxqtofop7z;

DROP TABLE events;
DROP TABLE tiers;
DROP TABLE people;
DROP TABLE scores;
DROP TABLE teams;

CREATE TABLE events (
    id INT AUTO_INCREMENT NOT NULL,
    event_name VARCHAR(255) NOT NULL,
    tier_id INT NOT NULL,
    year INT NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE tiers (
    id INT AUTO_INCREMENT NOT NULL,
    tier_name VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE people (
    id INT AUTO_INCREMENT NOT NULL,
    competitor_number VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    org_name VARCHAR(255) NOT NULL,
    team_id INT NOT NULL,
    tier_id INT NOT NULL,
    year INT NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE teams (
    id INT AUTO_INCREMENT NOT NULL,
    team_name VARCHAR(255) NOT NULL,
    tier_id INT NOT NULL,
    year INT NOT NULL,
    coop BOOLEAN NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE scores (
    id INT AUTO_INCREMENT NOT NULL,
    event_id INT NOT NULL,
    team_id INT NOT NULL,
    score INT NOT NULL,
    time_min INT NOT NULL,
    time_sec INT NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

INSERT INTO events (id, event_name, tier_id, year) VALUES 
(1, "Pole Climb", 1, 2019), 
(2, "Changeout", 1, 2019), 
(3, "Rewire", 1, 2019), 
(4, "Driving", 1, 2019), 
(5, "Written Exam", 1, 2019),
(6, "Driving", 2, 2019), 
(7, "Transformer", 2, 2019), 
(8, "Changeout", 2, 2019), 
(9, "Rewire", 2, 2019), 
(10, "Pole Climb", 2, 2019);

INSERT INTO tiers (id, tier_name) VALUES
(1, "Apprentice"),
(2, "Journeyman");

INSERT INTO people (id, first_name, last_name, org_name, team_id, tier_id, year, competitor_number) VALUES
(1, "Adam", "Alda", "Santee Cooper", 1, 1, 2019, "A101"),
(2, "Brett", "Byers", "Black River Coop", 2, 1, 2019, "A102"),
(3, "Charles", "Cooper", "Santee Cooper", 3, 1, 2019, "A103"),
(4, "David", "Dwight", "Berkeley Electric Coop", 4, 1, 2019, "A104"),
(5, "Ed", "Eden", "Marlboro Coop", 5, 1, 2019, "A105"),
(6, "Fred", "Franks", "Black River Coop", 6, 2, 2019, "A201"),
(7, "Gary", "Green", "Black River Coop", 6, 2, 2019, "A202"),
(8, "Hank", "Henderson", "Black River Coop", 6, 2, 2019, "A203"),
(9, "Isaac", "Ingles", "Black River Coop", 6, 2, 2019, "A204"),
(10, "John", "Johnson", "Santee Cooper", 7, 2, 2019, "A205"),
(11, "Kevin", "Smith", "Santee Cooper", 7, 2, 2019, "A206"),
(12, "Luke", "Smith", "Santee Cooper", 7, 2, 2019, "A207"),
(13, "Matt", "Smith", "Santee Cooper", 7, 2, 2019, "A208");

INSERT INTO teams (id, team_name, tier_id, year, coop) VALUES
(1, "Adam Alda", 1, 2019, false),
(2, "Brett Byers", 1, 2019, true),
(3, "Charles Cooper", 1, 2019, false),
(4, "David Dwight", 1, 2019, true),
(5, "Ed Eden", 1, 2019, true),
(6, "BRC Team 1", 2, 2019, true),
(7, "SC Team 1", 2, 2019, false);

INSERT INTO scores (id, event_id, team_id, score, time_min, time_sec) VALUES
(1, 1, 1, 100, 5, 30),
(2, 2, 1, 100, 5, 30),
(3, 3, 1, 100, 5, 30),
(4, 4, 1, 100, 5, 30),
(5, 5, 1, 100, 5, 30),
(6, 1, 2, 99, 4, 45),
(7, 2, 2, 99, 4, 45),
(8, 3, 2, 99, 4, 45),
(9, 4, 2, 99, 4, 45),
(10, 5, 2, 99, 4, 45),
(11, 1, 3, 98, 4, 59),
(12, 2, 3, 98, 4, 59),
(13, 3, 3, 98, 4, 59),
(14, 4, 3, 98, 4, 59),
(15, 5, 3, 98, 4, 59),
(16, 1, 4, 97, 4, 50),
(17, 2, 4, 97, 4, 50),
(18, 3, 4, 97, 4, 50),
(19, 4, 4, 97, 4, 50),
(20, 5, 4, 97, 4, 50),
(21, 1, 5, 96, 5, 15),
(22, 2, 5, 96, 5, 15),
(23, 3, 5, 96, 5, 15),
(24, 4, 5, 96, 5, 15),
(25, 5, 5, 96, 5, 15),
(26, 6, 6, 95, 6, 25),
(27, 7, 6, 95, 6, 25),
(28, 8, 6, 95, 6, 25),
(29, 9, 6, 95, 6, 25),
(30, 10, 6, 95, 6, 25),
(31, 6, 7, 94, 7, 15),
(32, 7, 7, 94, 7, 15),
(33, 8, 7, 94, 7, 15),
(34, 9, 7, 94, 7, 15),
(35, 10, 7, 94, 7, 15);