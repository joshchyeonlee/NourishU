const checkTable =  `
SELECT * 
FROM information_schema.tables
WHERE table_schema = 'nourishudb' 
    AND table_name = 'MEAL'
LIMIT 1;`;

const createTable = `
CREATE TABLE MEAL
(MealID     INT             NOT NULL    AUTO_INCREMENT,
UserID      INT             NOT NULL,
DateTime    DATETIME        NOT NULL,
MealTitle   VARCHAR(50)    NOT NULL,
PRIMARY KEY(MealID),
FOREIGN KEY (UserID) REFERENCES USER(UserID) ON UPDATE CASCADE );`;

const meal0 = `INSERT INTO MEAL(UserID, DateTime, MealTitle) VALUES(1, '2023-11-20 9:00:00', "Brekkie" );`;
const meal1 = `INSERT INTO MEAL(UserID, DateTime, MealTitle) VALUES(1, '2023-11-20 12:30:00', "Lunch" );`;
const meal2 = `INSERT INTO MEAL(UserID, DateTime, MealTitle) VALUES(1, '2023-11-20 7:00:00', "Dinner" );`;
const meal3 = `INSERT INTO MEAL(UserID, DateTime, MealTitle) VALUES(2, '2023-11-20 9:20:00', "Breakfast" );`;
const meal4 = `INSERT INTO MEAL(UserID, DateTime, MealTitle) VALUES(3, '2023-11-20 9:30:00', "Breakfast" );`;
const meal5 = `INSERT INTO MEAL(UserID, DateTime, MealTitle) VALUES(4, '2023-11-20 9:35:00', "Breakfast" );`;
const meal6 = `INSERT INTO MEAL(UserID, DateTime, MealTitle) VALUES(4, '2023-11-20 11:00:00', "Brunch" );`;

const data = [meal0, meal1, meal2, meal3, meal4, meal5, meal6];

module.exports = { checkTable, createTable, data };