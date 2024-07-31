
const app = require('./src/app.js');
const { conn } = require('./src/db.js');


// Syncing all the models at once.sdfxsdss
 
conn.sync({ force: false }).then(() => {
  app.listen(3001, () => {
    console.log('is listening at 3001');
  });
});

