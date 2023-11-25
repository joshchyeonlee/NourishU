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
UserID              INT         NOT NULL,
UserName            VARCHAR(50) NOT NULL,
UserEmail           VARCHAR(50) NOT NULL,
UserBirthdate       DATE        NOT NULL,
UserHeight          INT         NOT NULL,
UserWeight          INT         NOT NULL,
UserAge             INT         NOT NULL,
DietName            VARCHAR(50) NOT NULL,
DietDescription     VARCHAR(50) NOT NULL,
CookingConfidence   INT         NOT NULL,
PRIMARY KEY(UserID),
UNIQUE (UserName),
UNIQUE (UserEmail));`;

const addUser0 = `
INSERT INTO USER(UserId, UserName, UserEmail, UserBirthdate, UserHeight, UserWeight, UserAge, DietName, DietDescription, CookingConfidence)
VALUES(0, "steve37", "steve@notnourishu.com", '1997-02-01', 170, 70, 73, "None", "N/A", 5);`;
const addUser1 = `
INSERT INTO USER(UserId, UserName, UserEmail, UserBirthdate, UserHeight, UserWeight, UserAge, DietName, DietDescription, CookingConfidence)
VALUES(1, "nelson!", "nelson!@nourishu.com", '1965-03-15', 190, 83, 58, "Carnivore", "Only meat consumed", 3);`;
const addUser2 = `
INSERT INTO USER(UserId, UserName, UserEmail, UserBirthdate, UserHeight, UserWeight, UserAge, DietName, DietDescription, CookingConfidence)
VALUES(2, "nothisispatrick", "isthisthe@krusty.krab", '1995-12-31', 154, 49, 28, "Vegetarian", "No meat, only vegetables", 5);`;
const addUser3 = `
INSERT INTO USER(UserId, UserName, UserEmail, UserBirthdate, UserHeight, UserWeight, UserAge, DietName, DietDescription, CookingConfidence)
VALUES(3, "therealbob", "bob@burger.com", '1998-04-29', 169, 72, 25, "None", "N/A", 1);`;
const addUser4 = `
INSERT INTO USER(UserId, UserName, UserEmail, UserBirthdate, UserHeight, UserWeight, UserAge, DietName, DietDescription, CookingConfidence)
VALUES(4, "geneman3000", "gene@nourishu.com", '2002-02-01', 148, 40, 21, "Vegan", "No animal products", 3);`;

const data = [addUser0, addUser1, addUser2, addUser3, addUser4];

module.exports = { checkTable, createTable, data };