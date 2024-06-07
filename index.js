
const express = require('express');
const cookieParser = require('cookie-parser');
const router = require('./routers') //index SAMBUNGAN ROUTER  IMPORT
const NotFoundMiddleware = require('./middleware/not-found')
const ErrorHandlerMiddleware = require('./middleware/error-handler')



const app = express();
const port = 3005;

app.use(express.json());
app.use(cookieParser(process.env.SECRET_KEY));
app.use('/api', router); 

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.use(NotFoundMiddleware);// handle apabila URL tidak ditemukan atau salah
app.use(ErrorHandlerMiddleware);//handle Internal Server Error

app.listen(port, () => {
  console.log(`Port Sedang Berjalan di ${port}`);
});



