const axios = require("axios");

exports.getExternalData = async (req, res) => {
  const response = await axios.get("https://jsonplaceholder.typicode.com/users?_limit=5");
  res.json(response.data);
};
