const checkTable =  `
SELECT * 
FROM information_schema.tables
WHERE table_schema = 'nourishudb' 
    AND table_name = 'ADMIN'
LIMIT 1;`;

const createTable = `
CREATE TABLE ADMIN
(AdminID        INT              NOT NULL,
AdminName       VARCHAR(50)      NOT NULL,
AdminEmail      VARCHAR(255)     NOT NULL,
AdminPassword   VARCHAR(255)     NOT NULL,
PRIMARY KEY(AdminID),
UNIQUE(AdminEmail));`;

const admin1 = `INSERT INTO ADMIN(AdminID, AdminName, AdminEmail, AdminPassword) VALUES(0, "Josh", "josh@nourishu.com", "beans")`
const admin2 = `INSERT INTO ADMIN(AdminID, AdminName, AdminEmail, AdminPassword) VALUES(1, "Samantha", "samantha@nourishu.com", "beansprout")`
const admin3 = `INSERT INTO ADMIN(AdminID, AdminName, AdminEmail, AdminPassword) VALUES(2, "Akansha", "akansha@nourishu.com", "beaned")`

const data = [admin1, admin2, admin3];

module.exports = { checkTable, createTable, data };