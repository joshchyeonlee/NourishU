//check table based off of:
//https://stackoverflow.com/questions/8829102/check-if-mysql-table-exists-without-using-select-from-syntax
const checkTable =`
SELECT * 
FROM information_schema.tables
WHERE table_schema = 'nourishudb' 
    AND table_name = 'ACHIEVEMENTS_EARNED'
LIMIT 1;`;

const createTable = `
CREATE TABLE ACHIEVEMENTS_EARNED (
UserID              INT         NOT NULL,
AchievementID       INT         NOT NULL,
TimeEarned      DATETIME    NOT NULL,
PRIMARY KEY(UserID, AchievementId),
FOREIGN KEY(UserID) REFERENCES USER(UserID) ON UPDATE CASCADE,
FOREIGN KEY(AchievementID) REFERENCES ACHIEVEMENT(AchievementID) ON UPDATE CASCADE);`;

const user0AccountCreated =`
INSERT INTO ACHIEVEMENTS_EARNED(UserID, AchievementID, TimeEarned)
VALUES(5,0,'2023-07-01 13:39:12');`;
const user1AccountCreated =`
INSERT INTO ACHIEVEMENTS_EARNED(UserID, AchievementID, TimeEarned)
VALUES(1,0,'2023-12-23 00:13:42');`;
const user2AccountCreated =`
INSERT INTO ACHIEVEMENTS_EARNED(UserID, AchievementID, TimeEarned)
VALUES(2,0,'2023-02-14 11:11:11');`;
const user3AccountCreated =`
INSERT INTO ACHIEVEMENTS_EARNED(UserID, AchievementID, TimeEarned)
VALUES(3,0,'2023-04-09 16:20:42');`;
const user4AccountCreated =`
INSERT INTO ACHIEVEMENTS_EARNED(UserID, AchievementID, TimeEarned)
VALUES(4,0,'2023-04-09 09:20:14');`;
const user4firstMealLogged = `
INSERT INTO ACHIEVEMENTS_EARNED(UserID, AchievementID, TimeEarned)
VALUES(4,1,'2023-06-09 13:00:37');`;
const user4firstGoalAchieved = `
INSERT INTO ACHIEVEMENTS_EARNED(UserID, AchievementID, TimeEarned)
VALUES(4,2,'2023-07-30 09:01:07');`;
const user4firstReviewCreated = `
INSERT INTO ACHIEVEMENTS_EARNED(UserID, AchievementID, TimeEarned)
VALUES(4,3,'2023-08-03 13:00:47');`;

const data = [user0AccountCreated, user1AccountCreated, user2AccountCreated, user3AccountCreated, user4AccountCreated, user4firstGoalAchieved, user4firstMealLogged, user4firstReviewCreated];

module.exports = { checkTable, createTable, data };
