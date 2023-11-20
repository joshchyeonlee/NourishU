const checkTable =  `
SELECT * 
FROM information_schema.tables
WHERE table_schema = 'nourishudb' 
    AND table_name = 'ADMIN_REVIEW'
LIMIT 1;`;

const createTable = `
CREATE TABLE ADMIN_REVIEW
(AdminID        INT     NOT NULL,
ReviewID        INT     NOT NULL,
ReviewFlagged   BIT     NOT NULL,
PRIMARY KEY(AdminID, ReviewID),
FOREIGN KEY(AdminID) REFERENCES ADMIN(AdminID) ON UPDATE CASCADE,
FOREIGN KEY(ReviewID) REFERENCES REVIEW(ReviewID) ON UPDATE CASCADE);`


//repopulate this data with data from Admin and Review
const data1 = `INSERT INTO TABLE ADMIN_REVIEW(AdminID, ReviewID, ReviewFlagged) VALUES (0, 0, 0)`;
const data2 = `INSERT INTO TABLE ADMIN_REVIEW(AdminID, ReviewID, ReviewFlagged) VALUES (0, 0, 0)`;
const data3 = `INSERT INTO TABLE ADMIN_REVIEW(AdminID, ReviewID, ReviewFlagged) VALUES (0, 0, 0)`;

const data = [data1, data2, data3];

module.exports = { checkTable, createTable, data };