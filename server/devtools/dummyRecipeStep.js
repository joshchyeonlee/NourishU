const checkTable =  `
SELECT * 
FROM information_schema.tables
WHERE table_schema = 'nourishudb' 
    AND table_name = 'RECIPE_STEP'
LIMIT 1;`;

const createTable = `
CREATE TABLE RECIPE_STEP
(RecipeID           INT			    NOT NULL,
StepNo              INT			    NOT NULL,
StepDescription     VARCHAR(255)	NOT NULL,
PRIMARY KEY(RecipeID, StepNo),
FOREIGN KEY(RecipeID) REFERENCES RECIPE(RECIPEID) ON UPDATE CASCADE);`;

// Modified Recipe from: https://www.chelseasmessyapron.com/triple-chocolate-chunk-brownie-protein-shake/
const recipe1step1 = `INSERT INTO RECIPE_STEP(RecipeID, StepNo, StepDescription) 
                VALUES(1, 1, "Remove the peel from the banana, slice banana into large coins");`; 

const recipe1step2 = `INSERT INTO RECIPE_STEP(RecipeID, StepNo, StepDescription) 
                VALUES(1, 2, "Combine banana coins, chocolate protein powder, and 250ml of milk into blender");`; 

const recipe1step3 = `INSERT INTO RECIPE_STEP(RecipeID, StepNo, StepDescription) 
                VALUES(1, 3, "Blend until smooth. Pour into glass and enjoy!");`;    


const data = [recipe1step1, recipe1step2, recipe1step3];

module.exports = { checkTable, createTable, data };