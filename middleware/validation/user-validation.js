// user-validation
const Joi = require('joi');

function validateRegisterData(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/).required(),
    password: Joi.string().min(8).required(),//ubah
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}

function validateLoginData(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().email().pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/).required(),
    password: Joi.string().min(8).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}

module.exports = { 
  validateRegisterData, 
  validateLoginData
};

// // Validator untuk memeriksa apakah email valid
// function isValidEmail(email) {
// 	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// 	return emailRegex.test(email);
// }

// // Validator untuk memeriksa apakah nomor telepon valid
// function isValidPhone(phone) {
// 	const phoneRegex = /^\d{10}$/; // 10 nomor minimal
// 	return phoneRegex.test(phone);
// }

// module.exports = { isValidEmail, isValidPhone };


