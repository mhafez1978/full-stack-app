const registerController = (req, res) => {
  const {
    fname,
    lname,
    username,
    password,
    dob,
    email,
    phone,
    address_1,
    address_2,
    city,
    state,
    zip,
    country,
  } = req.body;

  res.json({
    username,
    email,
    phone,
    dob,
    zip
  });
};

module.exports = registerController;
