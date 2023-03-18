// Băm mật khẩu
const bcrypt = require('bcrypt');
const saltRounds = 10;

const { ObjectId } = require('mongodb');

class AdminsService {
    constructor(client) {
        this.Admins = client.db().collection("admins");
    }

    // Định nghĩa các phương thức truy cập CSDL sử dụng mongodb API
    extractAdminsData(payload) {
        const admins = {
            name: payload.name,
            password: payload.password,
        };

        // destroy undefined fields
        Object.keys(admins).forEach(
            (key) => admins[key] === undefined && delete admins[key]
        );

        return admins;
    }

    // Các phương thức của admin

    a
}