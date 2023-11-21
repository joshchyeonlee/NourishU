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
ReviewID		INT			NOT NULL,
PRIMARY KEY(ReviewID),
FOREIGN KEY(WrittenBy) REFERENCES USER(UserID) ON UPDATE CASCADE,
FOREIGN KEY(RecipeID) REFERENCES RECIPE(RecipeID) ON UPDATE CASCADE);`;

const review1 = `
INSERT INTO REVIEW(WrittenBy, RecipeID, RDifficulty, RComment, ReviewID)
VALUES(0, 1, 3, "This was really good!", 0);`;
const review2 = `
INSERT INTO REVIEW(WrittenBy, RecipeID, RDifficulty, RComment, ReviewID)
VALUES(2,1,1,"This was fairly good!", 1);`;
const review3 = `
INSERT INTO REVIEW(WrittenBy, RecipeID, RDifficulty, RComment, ReviewID)
VALUES(1,1,4,"I would have this again", 2);`;
const review4 = `
INSERT INTO REVIEW(WrittenBy, RecipeID, RDifficulty, RComment, ReviewID)
VALUES(1,2,5,"Thanks for sharing!", 3);`;
const review5 = `
INSERT INTO REVIEW(WrittenBy, RecipeID, RDifficulty, RComment, ReviewID)
VALUES(1,2,3,"I make this for every single meal!", 4);`;

const data = [review1, review2, review3, review4, review5];

module.exports = { checkTable, createTable, data };
