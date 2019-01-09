//Third Party Module
const express = require('express');

//Node Module
const path = require('path')

const publicPath = path.join(__dirname, '../public');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(publicPath));

app.listen(PORT, () => {
  console.log(`Server run at port ${PORT}`);
});