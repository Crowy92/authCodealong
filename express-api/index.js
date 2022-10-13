const dotenv = require('dotenv');
dotenv.config();
const app = require('./api');

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Express just departed from port ${port}!`))