const express = require("express");
const cors = require("cors");

const booksRouter = require("./app/routes/books.route");
const genresRouter = require("./app/routes/genres.route");
const tagsRouter = require("./app/routes/tags.route");
const shipFeeRouter = require("./app/routes/shipFee.route");
const addressesRouter = require("./app/routes/addresses.route");
const usersRouter = require("./app/routes/users.route");
const cartsRouter = require("./app/routes/carts.route");
const commentsRouter = require("./app/routes/comments.route");
const ordersRouter = require("./app/routes/orders.route");
const promotionsRouter = require("./app/routes/promotions.route");
const suppliersRouter = require("./app/routes/suppliers.route");
const receiptsRouter = require("./app/routes/receipts.route");
const imagesRouter = require('./app/routes/images.route');
const ApiError = require("./app/api-error");
const multer = require('multer')
const app = express();
var fs = require('fs');
const { db } = require("./app/config");
const { client } = require("./app/utils/mongodb.util");


app.use(cors());
app.use(express.json());
app.use("/api/Books", booksRouter);
app.use("/api/Carts", cartsRouter);
app.use("/api/Comments", commentsRouter);
app.use("/api/Addresses", addressesRouter);
app.use("/api/Genres", genresRouter);
app.use("/api/Tags", tagsRouter);
app.use("/api/Orders", ordersRouter);
app.use("/api/Users", usersRouter);
app.use("/api/Promotions", promotionsRouter);
app.use("/api/Receipts", receiptsRouter);
app.use("/api/Suppliers", suppliersRouter);
app.use("/api/Images", imagesRouter);
app.use("/api/ShipFee", shipFeeRouter);
app.use('/uploads', express.static('uploads'))


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.png'
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage: storage })
// app.post('/api/uploads', upload.single('uploadsImg'), function (req, res) {
//     // req.file is the name of your file in the form above, here 'uploaded_file'
//     // req.body will hold the text fields, if there were any 
//     console.log(req.file)

// });

app.post('/api/uploads', upload.array('uploadsImg'), async function (req, res, next) {
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
    // let files = req.body.uploadsImg
    const obj = JSON.parse(JSON.stringify(req.body))
    // console.log(obj)
    console.log(req.files)
    var imgs = []
    for (let index of req.files) {
        var pathImg = "http://127.0.0.1:3000/uploads/" + index.filename
        imgs.push({ nameImage: index.filename, linkImage: pathImg, _idBook: null })
        console.log(pathImg)
    }

    return res.send(imgs)
})

app.post('/api/removeImg', (req, res) => {

    const { name } = req.body
    var filePath = "C:\\Users\\Thanh_2z\\Desktop\\Nien_Luan_Nganh\\Back_End\\uploads\\" + name;
    console.log(name)
    // console.log(filePath)
    fs.unlinkSync(filePath);
    // return res.send(filePath)
})

app.get("/", (req, res) => {
    res.json({ message: "Welcome to BooksStore." });
});

app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({ message: err.message || "Internal Server Error" });
});



module.exports = app;