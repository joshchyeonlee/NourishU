//check table based off of:
//https://stackoverflow.com/questions/8829102/check-if-mysql-table-exists-without-using-select-from-syntax
const checkTable =
`SELECT * 
FROM information_schema.tables
WHERE table_schema = 'nourishudb' 
    AND table_name = 'ACHIEVEMENT'
LIMIT 1;`;

//removed time earned - should be in achievements earned
const createTable =
`CREATE TABLE ACHIEVEMENT (
AchievementID	INT			NOT NULL,
Name			VARCHAR(50)	NOT NULL,
Description		VARCHAR(50)	NOT NULL,
PRIMARY KEY(AchievementID));
`;

const accountCreated =`
INSERT INTO ACHIEVEMENT(AchievementID, Name, Description)
VALUES (0, "Account Created", "That took so much work honestly")`;
const firstMealLogged = `
INSERT INTO ACHIEVEMENT(AchievementID, Name, Description)
VALUES (1, "First meal logged", "Congrats, you ate!")`;
const firstGoalAchieved = `
INSERT INTO ACHIEVEMENT(AchievementID, Name, Description)
VALUES (2, "First goal completed", "You did it!")`;
const firstRecipeCreated =`
INSERT INTO ACHIEVEMENT(AchievementID, Name, Description)
VALUES (3, "First Recipe Created", "Who let them cook?")`;
const firstReviewDeletedByAdmin = `
INSERT INTO ACHIEVEMENT(AchievementID, Name, Description)
VALUES (4, "First Review Deleted By Admin", "Your review got deleted!")`;
const firstReviewCreated = `
INSERT INTO ACHIEVEMENT(AchievementID, Name, Description)
VALUES (5, "First Review Created", "Got something to say?")`;

const data = [accountCreated, firstMealLogged, firstGoalAchieved, firstRecipeCreated, firstReviewDeletedByAdmin, firstReviewCreated];

module.exports = { checkTable, createTable, data };