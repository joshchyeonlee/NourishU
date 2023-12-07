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

const admin1 = `INSERT INTO ADMIN(AdminID, AdminName, AdminEmail, AdminPassword) VALUES(0, "Josh", "josh@nourishu.com", "b3fa55f98fcfcaf6a15a7c4eb7cdd1b593693d3fef2fb7aec3b6768fd7c6a4ce")`
const admin2 = `INSERT INTO ADMIN(AdminID, AdminName, AdminEmail, AdminPassword) VALUES(1, "Samantha", "samantha@nourishu.com", "b3fa55f98fcfcaf6a15a7c4eb7cdd1b593693d3fef2fb7aec3b6768fd7c6a4ce")`
const admin3 = `INSERT INTO ADMIN(AdminID, AdminName, AdminEmail, AdminPassword) VALUES(2, "Akansha", "akansha@nourishu.com", "b3fa55f98fcfcaf6a15a7c4eb7cdd1b593693d3fef2fb7aec3b6768fd7c6a4ce")`

const data = [admin1, admin2, admin3];

module.exports = { checkTable, createTable, data };