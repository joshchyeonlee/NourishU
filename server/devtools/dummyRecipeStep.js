const checkTable = `
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

const recipe2step1 = `INSERT INTO RECIPE_STEP(RecipeID, StepNo, StepDescription) 
                VALUES(2, 1, "In a large pot boil beans");`;

const recipe2step2 = `INSERT INTO RECIPE_STEP(RecipeID, StepNo, StepDescription) 
                VALUES(2, 2, "Drain water after boiling beans then combine tomatoes and cheese");`;

const recipe2step3 = `INSERT INTO RECIPE_STEP(RecipeID, StepNo, StepDescription) 
                VALUES(2, 3, "Stir until cheese melts then enjoy!");`;

const recipe4step1 = `INSERT INTO RECIPE_STEP(RecipeID, StepNo, StepDescription) 
                VALUES(4, 1, "Boil pasta noodles in a pot of water for 15 minutes or until noodle is soft");`;

const recipe4step2 = `INSERT INTO RECIPE_STEP(RecipeID, StepNo, StepDescription) 
                VALUES(4, 2, "Cook meat balls (the beef balls) in the oven at 350 degrees F for 20 minutes");`;

const recipe4step3 = `INSERT INTO RECIPE_STEP(RecipeID, StepNo, StepDescription) 
                VALUES(4, 3, "Mix cheese with the pasta noodles until cheese is melted");`;

const recipe4step4 = `INSERT INTO RECIPE_STEP(RecipeID, StepNo, StepDescription) 
                VALUES(4, 4, "Put mixed pasta onto a plate and meatballs on top and add tomato sauce on it, and enjoy!");`;

const recipe5step1 = `INSERT INTO RECIPE_STEP(RecipeID, StepNo, StepDescription) 
                VALUES(5, 1, "Take out 2 slices of bread and spread tuna on both sides");`;

const recipe5step2 = `INSERT INTO RECIPE_STEP(RecipeID, StepNo, StepDescription) 
                VALUES(5, 2, "Use mayo sauce and use spread that on and put together the sandwich and enjoy!");`;

const recipe6step1 = `INSERT INTO RECIPE_STEP(RecipeID, StepNo, StepDescription) 
                VALUES(6, 1, "Use a rice cooker to cook rice. Fry chicken in pan until cooked then transfer to plate");`;

const recipe6step2 = `INSERT INTO RECIPE_STEP(RecipeID, StepNo, StepDescription) 
                VALUES(6, 2, "Using the same pan cook caroots, mushrooms, red peppers, and green peppers for 2-3 minutes until tender");`;

const recipe6step3 = `INSERT INTO RECIPE_STEP(RecipeID, StepNo, StepDescription) 
                VALUES(6, 3, "Serve over rice topped with sesame seeds and enjoy!");`;

const recipe7step1 = `INSERT INTO RECIPE_STEP(RecipeID, StepNo, StepDescription) 
                VALUES(7, 1, "Place pasta in boiling hot water until soft");`;

const recipe7step2 = `INSERT INTO RECIPE_STEP(RecipeID, StepNo, StepDescription) 
                VALUES(7, 2, "Drain water and add cheese until melted. Serve and enjoy!");`;

const recipe8step1 = `INSERT INTO RECIPE_STEP(RecipeID, StepNo, StepDescription) 
                VALUES(8, 1, "Chop strawberries and bananas, and put yogurt into blender. Serve immediately");`;

const data = [recipe1step1, recipe1step2, recipe1step3, recipe2step1, recipe2step2, recipe2step3, recipe4step1, recipe4step2, recipe4step3, recipe4step4, recipe5step1, recipe5step2, recipe6step1, recipe6step2, recipe6step3,
    recipe7step1, recipe7step2, recipe8step1];

module.exports = { checkTable, createTable, data };