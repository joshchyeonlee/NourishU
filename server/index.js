const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const db = require('./models');

// routers
const ingredientRouter = require('./routes/Ingredients')
app.use("/ingredients", ingredientRouter)

db.sequelize.sync().then(()=> {
    app.listen(3001, () => {
        console.log("Server running on port 3001");
    });
});

