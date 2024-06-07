// not-found pada middleware digunakan untuk menghadle apabila url yang dimasukkan tidak sesuai
const notFound = (req, res) => {
    res.status(404).json({
        message: 'Url Not Found'
    })
}

module.exports = notFound



