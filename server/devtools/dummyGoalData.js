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
UserID		        INT			NOT NULL,
GoalMilestone		INT			NOT NULL,
GoalID			    INT			NOT NULL,
GoalName	    	VARCHAR(50)	NOT NULL,
GoalDuration		INT			NOT NULL,
GoalProgress		VARCHAR(50)	NOT NULL,
PRIMARY KEY(UserID, GoalID),
FOREIGN KEY(UserID) REFERENCES USER(UserID) ON UPDATE CASCADE);`;

const user0Goal = `
INSERT INTO GOAL(UserID, GoalMilestone, GoalID, GoalName, GoalDuration, GoalProgress)
VALUES(0, 1, 0, "gain muscle", 10, "In Progress");`;
const user1Goal = `
INSERT INTO GOAL(UserID, GoalMilestone, GoalID, GoalName, GoalDuration, GoalProgress)
VALUES(1, 1, 1, "get leaner", 1, "In Progress");`;
const user2Goal = `
INSERT INTO GOAL(UserID, GoalMilestone, GoalID, GoalName, GoalDuration, GoalProgress)
VALUES(2, 1, 2, "eat more", 3, "In Progress");`;
const user3Goal = `
INSERT INTO GOAL(UserID, GoalMilestone, GoalID, GoalName, GoalDuration, GoalProgress)
VALUES(3, 1, 3, "eat more proteins", 4, "In Progress");`;
const user4Goal = `
INSERT INTO GOAL(UserID, GoalMilestone, GoalID, GoalName, GoalDuration, GoalProgress)
VALUES(4, 1, 4, "eat less carbs", 20, "In Progress");`;
const user4Goal1 = `
INSERT INTO GOAL(UserID, GoalMilestone, GoalID, GoalName, GoalDuration, GoalProgress)
VALUES(4, 1, 5, "lose weight", 10, "Completed");`;

const data = [user0Goal, user1Goal, user2Goal, user3Goal, user4Goal, user4Goal1];

module.exports = { checkTable, createTable, data };