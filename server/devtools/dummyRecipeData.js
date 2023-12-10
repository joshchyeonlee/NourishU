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

const recipe1 = `INSERT INTO RECIPE(UserID, RDifficulty, CookTime, RecipeTitle, RecipeDescription, ServingSize) 
                VALUES(2, 1, 5, "Chocolate Protein Shake", "Create a chocolate-y shake that has a great source of protein!", 1);`;            

const recipe2 = `INSERT INTO RECIPE(UserID, RDifficulty, CookTime, RecipeTitle, RecipeDescription, ServingSize) 
                VALUES(4, 2, 30, "Bean Chilli", "Create a delicious bean chili with only beans, tomatoes, and cheese!", 4);`;  

const recipe3 = `INSERT INTO RECIPE(UserID, RDifficulty, CookTime, RecipeTitle, RecipeDescription, ServingSize) 
                VALUES(3, 5, 60, "Steak", "Create hearty steak with a mushroom wine reduction", 2);`; 

const recipe4 = `INSERT INTO RECIPE(UserID, RDifficulty, CookTime, RecipeTitle, RecipeDescription, ServingSize) 
                VALUES(2, 3, 30, "Pasta", "Create a classic delicious pasta dish with tomato sauce, pasta, and cheese", 1);`;

const recipe5 = `INSERT INTO RECIPE(UserID, RDifficulty, CookTime, RecipeTitle, RecipeDescription, ServingSize) 
                VALUES(4, 2, 30, "Tuna Sandwich", "Create a quick and easy tuna sandwich!", 1);`;

const recipe6 = `INSERT INTO RECIPE(UserID, RDifficulty, CookTime, RecipeTitle, RecipeDescription, ServingSize) 
                VALUES(4, 5, 30, "Chicken and Veggies Stir Fry", "Create a delicious dish with meat and veggies", 3);`;

const recipe7 = `INSERT INTO RECIPE(UserID, RDifficulty, CookTime, RecipeTitle, RecipeDescription, ServingSize) 
VALUES(3, 2, 20, "Mac and Cheese", "Create a quick and easy on the go mac and cheese dish!", 1);`;

const recipe8 = `INSERT INTO RECIPE(UserID, RDifficulty, CookTime, RecipeTitle, RecipeDescription, ServingSize) 
VALUES(2, 1, 10, "Strawberry Banana Smoothie", "Create a quick and easy on the go smoothie!", 1);`;

const data = [recipe1, recipe2, recipe3, recipe4, recipe5, recipe6, recipe7, recipe8];

module.exports = { checkTable, createTable, data };