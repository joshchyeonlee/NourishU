//check table based off of:
//https://stackoverflow.com/questions/8829102/check-if-mysql-table-exists-without-using-select-from-syntax
const checkTable =`
SELECT * 
FROM information_schema.tables
WHERE table_schema = 'nourishudb' 
    AND table_name = 'USER_INTERESTS'
LIMIT 1;`;

const createTable=`
CREATE TABLE USER_INTERESTS (
UserID		        INT			    NOT NULL,
UserInterests		VARCHAR(50) 	NOT NULL,
PRIMARY KEY(UserID),
FOREIGN KEY(UserID) REFERENCES USER(UserID) ON UPDATE CASCADE);`;

const user0Interest0 = `
INSERT INTO USER_INTERESTS (UserID, userInterests)
VALUES (1, "Italian cuisine");`
const user1Interest0 = `
INSERT INTO USER_INTERESTS (UserID, userInterests)
VALUES (2, "Brunch items");`
const user2Interest0 = `
INSERT INTO USER_INTERESTS (UserID, userInterests)
VALUES (3, "Cheese");`
const user3Interest0 = `
INSERT INTO USER_INTERESTS (UserID, userInterests)
VALUES (4, "Gourmet Burgers");`
const user4Interest0 = `
INSERT INTO USER_INTERESTS (UserID, userInterests)
VALUES (5, "Tofu recipes");`
// const user0Interest1 = `
// INSERT INTO USER_INTERESTS (UserID, userInterests)
// VALUES (0, "did I mention beans??");`
// const user0Interest2 = `
// INSERT INTO USER_INTERESTS (UserID, userInterests)
// VALUES (0, "o and beans");`

const data = [user0Interest0, user1Interest0, user2Interest0, user3Interest0, user4Interest0];

module.exports = { checkTable, createTable, data };