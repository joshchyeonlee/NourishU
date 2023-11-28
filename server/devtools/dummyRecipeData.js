const checkTable =  `
SELECT * 
FROM information_schema.tables
WHERE table_schema = 'nourishudb' 
    AND table_name = 'RECIPE'
LIMIT 1;`;

const createTable = `
CREATE TABLE RECIPE
(RecipeID           INT			    NOT NULL    AUTO_INCREMENT,
UserID              INT			    NOT NULL,
RDifficulty         INT			    NOT NULL,
CookTime            INT			    NOT NULL,
RecipeTitle         VARCHAR(50)	    NOT NULL,
RecipeDescription   VARCHAR(300)    NOT NULL,
ServingSize         INT			    NOT NULL,
PRIMARY KEY(RecipeID),
FOREIGN KEY(UserID) REFERENCES USER(UserID) ON UPDATE CASCADE);`;

// Need to put easter egg of fave recipe 
// const recipe0 = `INSERT INTO RECIPE(RecipeID, UserID, RDifficulty, CookTime, RecipeTitle, RecipeDescription, ServingSize) 
//                 VALUES(0, 0, 1, 60, ");`;

const recipe1 = `INSERT INTO RECIPE(UserID, RDifficulty, CookTime, RecipeTitle, RecipeDescription, ServingSize) 
                VALUES(2, 1, 5, "Chocolate Protein Shake", "Create a chocolate-y shake that has a great source of protein!", 1);`;            

const recipe2 = `INSERT INTO RECIPE(UserID, RDifficulty, CookTime, RecipeTitle, RecipeDescription, ServingSize) 
                VALUES(4, 2, 30, "Bean Chilli", "Create a delicious bean chili with only beans, tomatoes, and cheese!", 4);`;  

const recipe3 = `INSERT INTO RECIPE(UserID, RDifficulty, CookTime, RecipeTitle, RecipeDescription, ServingSize) 
                VALUES(3, 5, 60, "Steak", "Create hearty steak with a mushroom wine reduction", 2);`; 

const data = [recipe1, recipe2, recipe3];

module.exports = { checkTable, createTable, data };