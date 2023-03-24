const ApiError = require("../api-error");
const MongoDB = require("../utils/mongodb.util");
const AdminsService = require("../services/admins.service");

// Băm mật khẩu
const bcrypt = require("bcrypt");
const saltRounds = 10;

// create admin
exports.create = async (req, res, next) => {
    if (!req.body?.name) {
        return next(new ApiError(400, "Name can not be empty"));
    }
    try {
        const adminsService = new AdminsService(MongoDB.client);
        const document = await adminsService.create(req.body);
        if (document === undefined) {
            return res.send(false);
        }
        return res.send(document);
    }
    catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the admins")
        );
    }
};

// login admin
exports.login = async (req, res, next) => {
    try {
        const adminsService = new AdminsService(MongoDB.client);
        const document = await adminsService.nameCheck(req.body);
        if (document) {
            // Load hash from your password DB.
            if (bcrypt.compareSync(req.body.password, document.password)) {
                // Tạo đối tượng admin
                let admin = {
                    name: document.name,
                    _id: document._id,
                    roles: 'admin'
                }
                // Tạo cookies lưu thông tin admin
                res.cookie('admin', JSON.stringify(admin), {
                    // domain: 'http://localhost:3000/cookies/',
                    // encode
                    // expires
                    httpOnly: true,
                    maxAge: 1000 * 60 * 60 * 24 * 7, // Sau 1 tuần cookie sẽ hết hạng
                    // path
                    // priority
                    secure: false, // Không sử dụng trong sản xuất 
                    // signed
                    sameSite: 'lax' // default là lax 
                })
                return res.send(req.cookies.admin)
            }
        }
        return res.send("Error name or password incorrect")
    }
    catch (error) {
        return next(
            new ApiError(500, "Error name or password incorrect")
        );
    }
};

exports.logout = async (req, res, next) => {
    // Xoá thông tin người dùng từ cookies
    res.clearCookie('admin');
    // Chuyển đến HomePage
    res.redirect('/');
}