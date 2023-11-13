//check table based off of:
//https://stackoverflow.com/questions/8829102/check-if-mysql-table-exists-without-using-select-from-syntax
const checkTable =
`SELECT * 
FROM information_schema.tables
WHERE table_schema = 'nourishudb' 
    AND table_name = 'FOLLOWS'
LIMIT 1;`;

const createTable =`
CREATE TABLE FOLLOWS (
FollowerUserID  INT NOT NULL,
FolloweeUserID  INT NOT NULL,
PRIMARY KEY(FollowerUserID, FolloweeUserID),
FOREIGN KEY(FollowerUserID) REFERENCES USER(UserID) ON UPDATE CASCADE,
FOREIGN KEY(FolloweeUserID) REFERENCES USER(UserID) ON UPDATE CASCADE);`;

const addFollower0 = `INSERT INTO FOLLOWS(FollowerUserID, FolloweeUserID) VALUES (0,1);`;
const addFollower1 = `INSERT INTO FOLLOWS(FollowerUserID, FolloweeUserID) VALUES (0,2);`;
const addFollower2 = `INSERT INTO FOLLOWS(FollowerUserID, FolloweeUserID) VALUES (0,3);`;
const addFollower3 = `INSERT INTO FOLLOWS(FollowerUserID, FolloweeUserID) VALUES (1,0);`;
const addFollower4 = `INSERT INTO FOLLOWS(FollowerUserID, FolloweeUserID) VALUES (3,0);`;
const addFollower5 = `INSERT INTO FOLLOWS(FollowerUserID, FolloweeUserID) VALUES (2,1);`;
const addFollower6 = `INSERT INTO FOLLOWS(FollowerUserID, FolloweeUserID) VALUES (1,3);`;

const data = [addFollower0, addFollower1, addFollower2, addFollower3, addFollower4, addFollower5, addFollower6];

module.exports = { checkTable, createTable, data };