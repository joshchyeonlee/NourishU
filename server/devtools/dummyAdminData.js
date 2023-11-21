const checkTable =  `
SELECT * 
FROM information_schema.tables
WHERE table_schema = 'nourishudb' 
    AND table_name = 'ADMIN'
LIMIT 1;`;

const createTable = `
CREATE TABLE ADMIN
(AdminID    INT             NOT NULL,
AdminName   VARCHAR(50)     NOT NULL,
AdminEmail  VARCHAR(255)     NOT NULL,
PRIMARY KEY(AdminID),
UNIQUE(AdminEmail));`;

const admin1 = `INSERT INTO ADMIN(AdminID, AdminName, AdminEmail) VALUES(0, "Josh (Admin)", "josh@nourishu.com")`
const admin2 = `INSERT INTO ADMIN(AdminID, AdminName, AdminEmail) VALUES(1, "Josh1 (Admin)", "josh1@nourishu.com")`
const admin3 = `INSERT INTO ADMIN(AdminID, AdminName, AdminEmail) VALUES(2, "Josh2 (Admin)", "josh2@nourishu.com")`

const data = [admin1, admin2, admin3];

module.exports = { checkTable, createTable, data };