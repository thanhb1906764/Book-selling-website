const ApiError = require("../api-error");
const MongoDB = require("../utils/mongodb.util");
const UsersService = require("../services/users.service");

exports.create = async (req, res, next) => {
    if (!req.body?.name) {
        return next(new ApiError(400, "Name can not be empty"));
    }

    try {
        const usersService = new UsersService(MongoDB.client);
        const document = await usersService.create(req.body);
        if (document === undefined) {
            // return next(new ApiError(400, "phone registered!"));
            return res.send(false);
        }
        return res.send(true);
    }
    catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the users")
        );
    }
};

exports.checkLogin = async (req, res, next) => {
    try {
        const usersService = new UsersService(MongoDB.client);
        const document = await usersService.check(req.body);
        // if(document=== undefined){
        //     return res.send("Successful")
        // }
        return res.send(document);
    }
    catch (error) {
        return next(
            new ApiError(500, "Err name or password incorrect")
        );
    }
};

exports.findAll = async (req, res, next) => {
    let documents = []

    try {
        const usersService = new UsersService(MongoDB.client);
        // const { phone } = req.query;
        documents = await usersService.find({});

        // else{
        //     documents = await usersService.find({})
        // }
    }
    catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the product")
        );
    }
    return res.send(documents);
}

exports.findOne = async (req, res, next) => {
    try {
        const usersService = new UsersService(MongoDB.client);
        const document = await usersService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Product not found"));
        }
        return res.send(document);
    }
    catch (error) {
        return next(
            new ApiError(500, `Error retrieving product with id=${req.parmas.id}`)
        );
    }
}

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }

    try {
        const usersService = new UsersService(MongoDB.client);
        const document = await usersService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Product not found"));
        }
        return res.send({ message: "Product was updated successfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Error updating product with id=${req.params.id}`)
        );
    }
};

exports.delete = async (req, res, next) => {
    try {
        const usersService = new UsersService(MongoDB.client);
        const document = await usersService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Product not found"));
        }
        return res.send({ message: "Product was deleted successfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Could not delete product with id=${req.params.id}`)
        );
    }
};

exports.deleteAll = async (req, res, next) => {
    try {
        const usersService = new UsersService(MongoDB.client);

        if (req.body) {
            const deletedCount = await usersService.deleteAll(req.body);
            return res.send({
                message: `${deletedCount} product were deleted successfully`
            });
        }


    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while removing all product")
        );
    }
};

exports.dropCollection = async (req, res, next) => {
    try {
        const usersService = new UsersService(MongoDB.client, req.params.name);
        const kq = await usersService.drop()
        return res.send(kq)

    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while removing all diary")
        );
    }
};


