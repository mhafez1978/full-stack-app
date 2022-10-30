const registerController = (req, res) => {
  const {
    fname,
    lname,
    username,
    password,
    dob,
    email,
    address_1,
    address_2,
    city,
    state,
    zip,
    country,
  } = req.body;
  console.log(username);
  console.log(password);
  res.send({ username, password });
};

module.exports = registerController;
