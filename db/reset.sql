USE rodeo_db;

DROP TABLE tiers;
DROP TABLE events;
DROP TABLE organizations;
DROP TABLE competitors;
DROP TABLE years;
DROP TABLE scores;

CREATE TABLE tiers (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(255) NOT NULL,
    team BOOLEAN NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE events (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE organizations (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(255) NOT NULL,
    coop BOOLEAN NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE competitors (
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(255) NULL,
    last_name VARCHAR(255) NULL,
    team_name VARCHAR(255) NULL,
    group_names VARCHAR(255) NULL,
    org_id INT NOT NULL,
    tier_id INT NOT NULL,
    year_id INT NOT NULL,
    comp_number VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE scores (
    id INT AUTO_INCREMENT NOT NULL,
    year_id INT NOT NULL,
    competitor_id INT NOT NULL,
    event_id INT NOT NULL,
    score INT NULL,
    time_minutes INT NULL,
    time_seconds INT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE years (
    id INT AUTO_INCREMENT NOT NULL,
    value INT NULL,
    type VARCHAR(255) NOT NULL,
    tier_id INT NULL,
    event_id INT NULL,
    year_id INT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

INSERT INTO tiers (id, name, team) VALUES 
(1, "Apprentice", false),
(2, "Journeyman", true);

INSERT INTO organizations (id, name, coop) VALUES
(1, "Santee Cooper", false),
(2, "Berkeley Electric Cooperative", true),
(3, "Horry Electric Cooperative", true),
(4, "Palmetto Electric Cooperative", true),
(5, "Blue Ridge Electric Cooperative", true),
(6, "York Electric Cooperative", true),
(7, "Mid-Carolina Electric Cooperative", true),
(8, "Broad River Electric Cooperative", true),
(9, "Black River Electric Cooperative", true),
(10, "Pee Dee Electric Cooperative", true),
(11, "Tri-County Electric Cooperative", true),
(12, "Newberry Electric Cooperative", true),
(13, "Marlboro Electric Cooperative", true),
(14, "Lynches River Electric Cooperative", true);

INSERT INTO events (id, name) VALUES
(1, "Written Test"),
(2, "Hurtman Rescue"),
(3, "Cutout Change"),
(4, "Backyard Light Change Out"),
(5, "Obstacle Course"),
(6, "Down Primary"),
(7, "Knot Tying"),
(8, "Insulator Change"),
(9, "Dead End Bell Change"),
(10, "600A Switch Change"),
(11, "Crossarm Change"),
(12, "Knots and Crossarm Lift"),
(13, "Knot and Phase Tying"),
(14, "Double Cutout Change"),
(15, "Fuse Replacement");

INSERT INTO years (id, value, type, tier_id, event_id, year_id) VALUES
(1, 2017, "year", null, null, null),
(2, 2018, "year", null, null, null),
(3, 2019, "year", null, null, null),
-- 2017 tiers
(4, null, "tier", 1, null, 1),
(5, null, "tier", 2, null, 1),
-- 2017 tiers
(6, null, "tier", 1, null, 2),
(7, null, "tier", 2, null, 2),
-- 2017 tiers
(8, null, "tier", 1, null, 3),
(9, null, "tier", 2, null, 3),
-- 2017 events
(10, null, "event", 1, 1, 1),
(11, null, "event", 1, 2, 1),
(12, null, "event", 1, 13, 1),
(13, null, "event", 1, 4, 1),
(14, null, "event", 1, 15, 1),
(15, null, "event", 2, 2, 1),
(16, null, "event", 2, 13, 1),
(17, null, "event", 2, 14, 1),
(18, null, "event", 2, 11, 1),
(19, null, "event", 2, 6, 1),
-- 2018 events
(20, null, "event", 1, 1, 2),
(21, null, "event", 1, 2, 2),
(22, null, "event", 1, 9, 2),
(23, null, "event", 1, 5, 2),
(24, null, "event", 1, 12, 2),
(25, null, "event", 2, 2, 2),
(26, null, "event", 2, 5, 2),
(27, null, "event", 2, 10, 2),
(28, null, "event", 2, 11, 2),
(29, null, "event", 2, 12, 2),
-- 2019 events
(30, null, "event", 1, 1, 3),
(31, null, "event", 1, 2, 3),
(32, null, "event", 1, 4, 3),
(33, null, "event", 1, 5, 3),
(34, null, "event", 1, 7, 3),
(35, null, "event", 2, 2, 3),
(36, null, "event", 2, 3, 3),
(37, null, "event", 2, 6, 3),
(38, null, "event", 2, 7, 3),
(39, null, "event", 2, 8, 3);

-- 2017 competitors
INSERT INTO competitors (id, first_name, last_name, team_name, group_names, org_id, tier_id, year_id, comp_number) VALUES
(1, "Logan", "Pope", null, null, 6, 1, 1, "103"),
(2, "Lucas", "Elston", null, null, 6, 1, 1, "104"),
(3, "Zack", "Hopper", null, null, 6, 1, 1, "105"), 
(4, "Caleb", "Traenkner", null, null, 6, 1, 1, "106"), 
(5, "Bruce", "Cunupp", null, null, 6, 1, 1, "107"),
(6, "Zack", "Childers", null, null, 6, 1, 1, "108"),
(7, "Jeremy", "Garrett", null, null, 1, 1, 1, "109"),
(8, "DJ", "Roper", null, null, 5, 1, 1, "110"),
(9, "Michael", "Sims", null, null, 5, 1, 1, "111"),
(10, "Jake", "Steward", null, null, 5, 1, 1, "112"),
(11, "Corey", "Thomas", null, null, 2, 1, 1, "113"),
(12, "Henry", "Owens", null, null, 2, 1, 1, "114"),
(13, "Wyman", "Boatwright, Jr", null, null, 3, 1, 1, "115"),
(14, "Chase", "Cox", null, null, 3, 1, 1, "116"),
(15, "Ethan", "Avant", null, null, 3, 1, 1, "117"),
(16, "Aaron", "Hughes", null, null, 1, 1, 1, "118"),
(17, "Jacob", "Rostad", null, null, 1, 1, 1, "119"),
(18, "Joseph", "Shillinglaw", null, null, 1, 1, 1, "120"),
(19, "Drew", "Boatwright, Jr", null, null, 1, 1, 1, "121"),
(20, "Will", "Brown", null, null, 1, 1, 1, "122"),
(21, "Josh", "Sawyer", null, null, 1, 1, 1, "123"),
(22, "Reggie", "Graves", null, null, 1, 1, 1, "124"),
(23, "Josh", "Ham", null, null, 1, 1, 1, "125"),
(24, "JT", "Windham", null, null, 1, 1, 1, "126"),
(25, "Michael", "Powell", null, null, 1, 1, 1, "127"),
(26, "Wilson", "Mishoe", null, null, 1, 1, 1, "128"),
(27, "Hunter", "Melton", null, null, 1, 1, 1, "129"),
(28, "Jamie", "Anderson", null, null, 1, 1, 1, "130"),
(29, "Peter", "Strong", null, null, 4, 1, 1, "131"),
(30, "Jose", "Bello", null, null, 4, 1, 1, "132"),
(31, "Randall", "McAlhaney", null, null, 4, 1, 1, "133"),
(32, "Matthew", "Martin", null, null, 1, 1, 1, "134"),
(33, null, null, "Santee Cooper 1", "Tommy Reece, Nick Brown, Coby Martin, Bryant Geathers", 1, 2, 1, "201"),
(34, null, null, "Blue Ridge 1", "Chad Davidson, Jay Bagwell, Clay Crawford, Anson Perry", 5, 2, 1, "202"),
(35, null, null, "BEC 1", "William Burbage, Mark Milovich, Wesley Mason", 2, 2, 1, "203"),
(36, null, null, "BEC 2", "Will Mills, Cody Carter, Tim Whigham", 2, 2, 1, "204"),
(37, null, null, "Santee Cooper 2", "Jay Ayers, Johnny Brinson, Kevin Rhode", 1, 2, 1, "205"),
(38, null, null, "Santee Cooper 3", "Chad Williams, Dow Hardee, Joe Sawyer", 1, 2, 1, "206"),
(39, null, null, "Santee Cooper 4", "Jake Murray, Tyler Davison, Travis Wiggins", 1, 2, 1, "207"),
(40, null, null, "PEC 1", "Tarl Graham, Thomas Scaachi, David White", 4, 2, 1, "208"),
(41, null, null, "Santee Cooper 5", "Sport Rabon, Chris Osha, McKenzie Johnson", 1, 2, 1, "209");
-- 2018 competitors