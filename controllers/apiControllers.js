
const jwt = require("jsonwebtoken");
const jwtKey = "jsonTempKey";

exports.login = async (req, res) => {
    if (req.body.email) {
        const findData = await db.collection("users").findOne({ email: req.body.email, password: req.body.pass });
        const jToken = jwt.sign({
            email: req.body.email,
            password: req.body.pass,
        }, jwtKey, {
            expiresIn: "5hr",
        });
        const UpdateToken = await db.collection("users").updateOne({ email: req.body.email, password: req.body.pass }, {$set: {accestoken: jToken}});

        if (findData) {
            return res.send({ message: "Login successfully", token: jToken });
        }
        return res.send({ message: "Invalid user" });
    }
}
exports.registration = async (req, res) => {
    if (req.body.email) {
        const findData = await db.collection("users").findOne({ email: req.body.email });
        if (findData) {
            return res.send("This email alrady inserted");
        }

        const qry = {
            email: req.body.email,
            password: req.body.pass,
            name: req.body.name,
            accestoken: "",
        }
        const reg = await db.collection("users").insertOne(qry);
        if(reg.acknowledged){
            return res.send({ message: "Registration successfuly"});
        }
        return res.send({ message: "Data not inserted" })
        
    }

}

exports.products = async (req, res) => {
    const qry = {
        Title: req.body.Title,
        Description: req.body.Description,
        Images: req.body.Images,
        Price: req.body.Price,
        Discount: req.body.Discount
    }
    const productsInsert = await db.collection("products").insertOne(qry);
    if(productsInsert.acknowledged){
        return res.send({ message: "Products inserted successfuly" });
    }
    return res.send({ message: "Products not Inserted" });
}
exports.getProducts = async (req, res) => {
    const fqry = {
        [req.query.filterBy]: new RegExp(req.query.filterText, "i"),
    }
    const sortqry = {
        [req.query.sortBy]: req.query.sortOrder === "min" ? 1 : -1,
    }
    const findData = await db.collection("products").find(fqry).sort(sortqry).toArray();
    if (findData) {
        return res.send({ data: findData });
    }
    return res.send({ message: "Invalid user" });
}

exports.authentication = async (req, res, next) => {
    if (req.headers["authorization"]) {
        const token = req.headers["authorization"].split(" ")[1];
        try {
            const verifyToken = jwt.verify(token, jwtKey);
            req.user = verifyToken;
        } catch (err) {
            console.log("verify token err : ", err);
            return res.send({ message: "Invalid token" });
        }
        return next();
    }
    else {
        return res.send({ message: "Invalid User" });
    }
}
