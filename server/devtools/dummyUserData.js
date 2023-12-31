//based off of:
//https://stackoverflow.com/questions/8829102/check-if-mysql-table-exists-without-using-select-from-syntax
const checkTable =
`SELECT * 
FROM information_schema.tables
WHERE table_schema = 'nourishudb' 
    AND table_name = 'user'
LIMIT 1;`

const removeUsersFromUser = 
`DELETE FROM User`

const createTable =
`CREATE TABLE USER (
UserID              INT         NOT NULL    AUTO_INCREMENT,
UserName            VARCHAR(25) NOT NULL,
UserEmail           VARCHAR(50) NOT NULL,
UserBirthdate       DATE        NOT NULL,
UserHeight          INT         NOT NULL,
UserWeight          INT         NOT NULL,
UserAge             INT         NOT NULL,
DietName            VARCHAR(50) NOT NULL,
DietDescription     VARCHAR(50) NOT NULL,
CookingConfidence   INT         NOT NULL,
UserPassword        VARCHAR(64) NOT NULL,
PRIMARY KEY(UserID),
UNIQUE (UserName),
UNIQUE (UserEmail));`;

const addUser0 = `
INSERT INTO USER(UserName, UserEmail, UserBirthdate, UserHeight, UserWeight, UserAge, DietName, DietDescription, CookingConfidence, UserPassword)
VALUES("josh", "josh@nourishu.com", '1997-02-01', 170, 70, 73, "Bean Eater", "Eat the bean", 5, "b3fa55f98fcfcaf6a15a7c4eb7cdd1b593693d3fef2fb7aec3b6768fd7c6a4ce");`;
const addUser1 = `
INSERT INTO USER(UserName, UserEmail, UserBirthdate, UserHeight, UserWeight, UserAge, DietName, DietDescription, CookingConfidence, UserPassword)
VALUES("notJosh", "notjosh@nourishu.com", '1965-03-15', 190, 83, 13, "Carnivore", "Dude eat some veggies", 3, "b3fa55f98fcfcaf6a15a7c4eb7cdd1b593693d3fef2fb7aec3b6768fd7c6a4ce");`;
const addUser2 = `
INSERT INTO USER(UserName, UserEmail, UserBirthdate, UserHeight, UserWeight, UserAge, DietName, DietDescription, CookingConfidence, UserPassword)
VALUES("definitelynotjosh", "whodis@nourishu.com", '1995-12-31', 154, 49, 28, "Vegetarian", "No meat, only bean", 5, "b3fa55f98fcfcaf6a15a7c4eb7cdd1b593693d3fef2fb7aec3b6768fd7c6a4ce");`;
const addUser3 = `
INSERT INTO USER(UserName, UserEmail, UserBirthdate, UserHeight, UserWeight, UserAge, DietName, DietDescription, CookingConfidence, UserPassword)
VALUES("therealjosh", "josh4realz@nourishu.com", '1998-04-29', 169, 69, 25, "Carnivore", "No bean", 1, "b3fa55f98fcfcaf6a15a7c4eb7cdd1b593693d3fef2fb7aec3b6768fd7c6a4ce");`;
const addUser4 = `
INSERT INTO USER(UserName, UserEmail, UserBirthdate, UserHeight, UserWeight, UserAge, DietName, DietDescription, CookingConfidence, UserPassword)
VALUES("beanman3000", "bean@nourishu.com", '1832-02-01', 300, 300, 420, "Bean Eater", "Eat the bean", 3, "b3fa55f98fcfcaf6a15a7c4eb7cdd1b593693d3fef2fb7aec3b6768fd7c6a4ce");`;

const data = [addUser0, addUser1, addUser2, addUser3, addUser4];

module.exports = { checkTable, createTable, data };