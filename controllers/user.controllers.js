// user.controllers
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');//menghasilkan token setelah login
const bcrypt = require('bcrypt');

// REGISTRASI
async function registerUser(req, res) {
  const { name, email, password } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error('Email has already been used.');
    }
    const newPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({ data: { name, email, password: newPassword } });
    console.log('User registered successfully:', user);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error('Error registering user:', error.message);
    res.status(500).json({ error: 'Failed to register user', message: error.message });
  }
}

// LOGIN USER
async function loginUser(req, res) {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error('Email atau password salah'); //respon ERROR apabilas email untuk login tidak sesuai
    }

    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) {
      throw new Error('Email atau password salah');
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: '6h',
    });

    return res.cookie('token', token, { signed: true }).status(200).json({
      message: 'User berhasil login',
      token,
    });

  
  } catch (error) {
    console.error('Error logging in user:', error.message);
    res.status(500).json({ error: 'Failed to login user ;((( ;(((', message: error.message });
  }
}

//LOGOUT
// async function logoutUser(req, res) {
//   try {
//     res.cookie('token', { expires: new Date(0) });
//     res.clearCookie('token')
//     return res.status(200).json({
//       message: 'Success',
//     })
  
//   } catch (error) {
//     console.error('Error logging in user:', error.message);
//     res.status(500).json({ error: 'Failed to login user ;((( ;(((', message: error.message });
//   }
// }




module.exports = { registerUser, loginUser };





