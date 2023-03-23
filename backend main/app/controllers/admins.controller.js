const ApiError = require("../api-error");
const MongoDB = require("../utils/mongodb.util");
const AdminsService = require("../services/admins.service");

// Băm mật khẩu
const bcrypt = require("bcrypt");
const saltRounds = 10;

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