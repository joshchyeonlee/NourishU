//check table based off of:
//https://stackoverflow.com/questions/8829102/check-if-mysql-table-exists-without-using-select-from-syntax
const checkTable =
`SELECT * 
FROM information_schema.tables
WHERE table_schema = 'nourishudb' 
    AND table_name = 'GOAL'
LIMIT 1;`;

const createTable =`
CREATE TABLE GOAL (
UserID		            INT			NOT NULL,
GoalID			        INT			NOT NULL,
InitialCaloricIntake    INT         NOT NULL,
CalculatedCaloricIntake INT         NOT NULL,
PRIMARY KEY(UserID, GoalID),
FOREIGN KEY(UserID) REFERENCES USER(UserID) ON UPDATE CASCADE);`;

const user0Goal = `
INSERT INTO GOAL(UserID, GoalID, InitialCaloricIntake, CalculatedCaloricIntake)
VALUES(0, 0, 2000, 2500);`;
const user1Goal = `
INSERT INTO GOAL(UserID, GoalID, InitialCaloricIntake, CalculatedCaloricIntake)
VALUES(1, 1, 2500, 2000);`;
const user2Goal = `
INSERT INTO GOAL(UserID, GoalID, InitialCaloricIntake, CalculatedCaloricIntake)
VALUES(2, 2, 2000, 1500);`;
const user3Goal = `
INSERT INTO GOAL(UserID, GoalID, InitialCaloricIntake, CalculatedCaloricIntake)
VALUES(3, 3, 2000, 2500);`;
const user4Goal = `
INSERT INTO GOAL(UserID, GoalID, InitialCaloricIntake, CalculatedCaloricIntake)
VALUES(4, 4, 2000, 1500);`;
const user4Goal1 = `
INSERT INTO GOAL(UserID, GoalID, InitialCaloricIntake, CalculatedCaloricIntake)
VALUES(4, 5, 2500, 3000);`;

const data = [user0Goal, user1Goal, user2Goal, user3Goal, user4Goal, user4Goal1];

module.exports = { checkTable, createTable, data };