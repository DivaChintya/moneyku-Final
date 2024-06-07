
// routes/transaction.routes.js
const express = require('express');
const router = express.Router();
const  authorization = require('../middleware/authMiddleware');
const transactionController = require('../controllers/transaction.controller');


// Route untuk menambahkan transaksi
router.post('/transactions', authorization, transactionController.addTransaction);

// Route untuk mendapatkan semua transaksi dari user yang terautentikasi
router.get('/transactions', authorization, transactionController.getAllTransactionsByUser);

//Route untuk mendapatkan transaksi berdasarkan kategori
router.get('/transactions/category/:category', authorization, transactionController.getTransactionsByCategory);

// Route untuk memperbarui transaksi berdasarkan ID
router.put('/transactions/:id', authorization, transactionController.updateTransactionById);

// Route untuk menghapus transaksi berdasarkan ID
router.delete('/transactions/no/:no', authorization, transactionController.deleteTransactionById);

//GET BALANCE
router.get('/transactions/balance', authorization, transactionController.getBalance);

module.exports = router;