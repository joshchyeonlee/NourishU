const checkTable =  `
SELECT * 
FROM information_schema.tables
WHERE table_schema = 'nourishudb' 
    AND table_name = 'REVIEW'
LIMIT 1;`;

const createTable = `
CREATE TABLE REVIEW
(WrittenBy		INT			NOT NULL,
RecipeID		INT			NOT NULL,
RDifficulty		INT,
RComment		VARCHAR(255),
ReviewID		INT PRIMARY KEY AUTO_INCREMENT	NOT NULL,
FOREIGN KEY(WrittenBy) REFERENCES USER(UserID) ON UPDATE CASCADE,
FOREIGN KEY(RecipeID) REFERENCES RECIPE(RecipeID) ON UPDATE CASCADE);`;

const review1 = `
INSERT INTO REVIEW(WrittenBy, RecipeID, RDifficulty, RComment)
VALUES(1, 1, 3, "This was really good!");`;
const review2 = `
INSERT INTO REVIEW(WrittenBy, RecipeID, RDifficulty, RComment)
VALUES(2,1,1,"This was fairly good!");`;
const review3 = `
INSERT INTO REVIEW(WrittenBy, RecipeID, RDifficulty, RComment)
VALUES(1,1,4,"I would have this again");`;
const review4 = `
INSERT INTO REVIEW(WrittenBy, RecipeID, RDifficulty, RComment)
VALUES(1,2,5,"Thanks for sharing!");`;
const review5 = `
INSERT INTO REVIEW(WrittenBy, RecipeID, RDifficulty, RComment)
VALUES(1,2,3,"I make this for every single meal!");`;

const data = [review1, review2, review3, review4, review5];

module.exports = { checkTable, createTable, data };
