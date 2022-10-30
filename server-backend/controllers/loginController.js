const loginController = (req, res) => {
  const { username, password } = req.body;
  console.log(username);
  console.log(password);
  res.send({ username, password });
};

module.exports = loginController;
