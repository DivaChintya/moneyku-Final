//transaction.controllers 
// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();
const prismaMid = require ('../middleware/prismaMiddleware');


//Fungsi untuk menambahkan Transaksi berdasarkan token yang diberikan yang mengandung id dari User
async function addTransaction(req, res) {
    try {
      const { Name, Status, Category, Amount, Date } = req.body; 
      const userId = req.user.id; // Menarik ID pengguna dengan benar

      const transaction = await prismaMid.transaction.create({
        data: {
          UserId: userId, // Menetapkan userId langsung
          Name,
          Status,
          Category,
          Amount,
          Date
        }
      });
  
      // Mengembalikan respons sukses jika transaksi berhasil ditambahkan
      res.status(201).json({ message: 'Transaction added successfully ;)', transaction });
    } catch (error) {
      // Mengembalikan respons gagal jika terjadi kesalahan
      console.error('Error adding transaction:', error.message);
      res.status(500).json({ error: 'Failed to add transaction', message: error.message });
    }
  }

  //Funsi untuk GET semua data transaksi user berdasarkan token dari login yang berisi id User
  async function getAllTransactionsByUser(req, res) {
    try {
        const userId = req.user.id; // Assuming you have user information attached to the request
        const transactions = await prismaMid.transaction.findMany({ where: { UserId: userId }, orderBy: {No: 'asc'} });
        res.status(200).json({ transactions });

    } catch (error) {
        next(error); // Continue to error handling middleware
    }
}

//Fungsi GET BY  KATEGORI
async function getTransactionsByCategory(req, res) {
    try {
        const userId = req.user.id; // Menarik ID pengguna dari token login
        const { category } = req.params; // Menarik kategori dari parameter URL
        const transactions = await prismaMid.transaction.findMany({ 
            where: { 
                UserId: userId,
                Category: category 
            },
            orderBy: { No: 'asc' } 
        });
        res.status(200).json({ transactions });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve transactions by category', message: error.message });
    }
}

//Funsi UPDATE transaksi berdasarkan id transaksi dari user tersebut
async function updateTransactionById(req, res, next) {
    try {
        const { id } = req.params;
        const { Name, Status, Category, Amount, Date } = req.body;
        const updatedTransaction = await prismaMid.transaction.update({
            where: { id: parseInt(id) },
            data: { Name, Status, Category, Amount, Date }
        });
        res.status(200).json({ message: 'Transaction updated successfully', data: updatedTransaction });
    } catch (error) {
        next(error); 
    }
}


// Fungsi DELETE transaksi berdasarkan No transaksi dari user tersebut
async function deleteTransactionById(req, res) {
    try {
        const { no } = req.params;
        const userId = req.user.id; // Menarik ID pengguna dari token login

        const transactionToDelete = await prismaMid.transaction.findFirst({
            where: { UserId: userId, No: parseInt(no) }
        });

        if (!transactionToDelete) {
            return res.status(404).json({ error: 'Transaction not found' });
        }

        await prismaMid.transaction.delete({
            where: { id: transactionToDelete.id }
        });

        const userTransactions = await prismaMid.transaction.findMany({
            where: { UserId: userId },
            orderBy: { No: 'asc' },
        });

        await Promise.all(
            userTransactions.map((transaction, index) =>
                prismaMid.transaction.update({
                    where: { id: transaction.id },
                    data: { No: index + 1 },
                })
            )
        );

        res.status(200).json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete transaction', message: error.message });
    }
}

// Fungsi untuk mendapatkan balance user
async function getBalance(req, res) {
    try {
        const userId = req.user.id;
        const transactions = await prismaMid.transaction.findMany({ where: { UserId: userId } });

        let income = 0;
        let expense = 0;

        transactions.forEach(transaction => {
            if (transaction.Status === 'INCOME') {
                income += transaction.Amount;
            } else if (transaction.Status === 'EXPENSE') {
                expense += transaction.Amount;
            }
        });

        res.status(200).json({ income, expense, balance: income - expense });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve balance', message: error.message });
    }
}

module.exports = { 
    addTransaction,
    getAllTransactionsByUser,
    updateTransactionById,
    deleteTransactionById,
    getTransactionsByCategory,
    getBalance
};


