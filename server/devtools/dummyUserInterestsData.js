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
UserID		    INT     NOT NULL,
InterestID		INT 	NOT NULL,
PRIMARY KEY(UserID, InterestID),
FOREIGN KEY(UserID) REFERENCES USER(UserID) ON UPDATE CASCADE,
FOREIGN KEY(InterestID) REFERENCES INTERESTS(InterestID) ON UPDATE CASCADE);`;

const user0Interest0 = `
INSERT INTO USER_INTERESTS (UserID, InterestID)
VALUES (1, 0);`
const user1Interest0 = `
INSERT INTO USER_INTERESTS (UserID, InterestID)
VALUES (2, 5);`
const user2Interest0 = `
INSERT INTO USER_INTERESTS (UserID, InterestID)
VALUES (3, 7);`
const user3Interest0 = `
INSERT INTO USER_INTERESTS (UserID, InterestID)
VALUES (4, 4);`
const user4Interest0 = `
INSERT INTO USER_INTERESTS (UserID, InterestID)
VALUES (5, 10);`

const data = [user0Interest0, user1Interest0, user2Interest0, user3Interest0, user4Interest0];

module.exports = { checkTable, createTable, data };