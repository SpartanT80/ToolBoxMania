import { success, error } from "../helpers/index.js";
import Query from "../model/query.js";
import { hash, compare } from "bcrypt";
import jwt from 'jsonwebtoken';

const { TOKEN_SECRET } = process.env;
const saltRounds = 10;

export const checkToken = async (req, res) => {
    try {
        const token = req.headers["x-access-token"] || req.headers["authorization"];
        if (!token) {
            return res.status(401).json({ error: "Token missing" });
        }

        jwt.verify(token, TOKEN_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: "Token expired" });
            }

            const query = "SELECT email, isAdmin FROM user WHERE id = ?";
            const [user] = await Query.findOne(query, decoded.id);
            if (user) {
                if (user.isAdmin === 1) {
                    const msg = "User recovered";
                    res.status(200).json(success(msg, user));
                } else {
                    const msg = "User is not authorized as admin checktoken";
                    res.status(403).json({ error: msg });
                }
            } else {
                const msg = "User not found with this identifier";
                res.status(200).json(success(msg));
            }
        });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while processing your request." });
    }
};

export const signup = async (req, res) => {
    try {
        const query = "SELECT email, password FROM user WHERE email = ?";
        const [isUserExist] = await Query.findOne(query, req.body.email);

        if (!isUserExist) {
            const hashedPWD = await hash(req.body.password, saltRounds);
            const data = {
                email: req.body.email,
                password: hashedPWD,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                address: req.body.address,
                city: req.body.city,
                postal_code: req.body.postal_code,
                country: req.body.country,
                phone_number: req.body.phone_number,
            };

            const query = "INSERT INTO user (isAdmin, email, password, first_name, last_name, address, city, postal_code, country, phone_number, created_at) VALUES (0,?,?,?,?,?,?,?,?,?,NOW())";
            const result = await Query.write(query, Object.values(data));

            res.status(201).json(success("user created !", result));
        }

    } catch (error) {
        throw Error(error);
    }
}

export const signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const query1 = "SELECT * FROM user WHERE email = ?";
        const [user] = await Query.findOne(query1, email);

        if (!user || (user.email !== req.body.email)) {
            res.status(401).json(error("Identification problem1"));
            return;
        }
        const isSame = await compare(password, user.password);

        if (isSame) {
            const { isAdmin: userIsAdmin, email, first_name, last_name, address, city, postal_code, country, phone_number } = user;

            const TOKEN = jwt.sign({
                id: user.id,
                isAdmin: userIsAdmin,
                email,
                first_name: first_name,
                last_name: last_name,
                address: address,
                city: city,
                postal_code: postal_code,
                country: country,
                phone_number: phone_number
            },
                TOKEN_SECRET,
                { expiresIn: '1d' });

            res.status(200).json(success("Connected", {
                TOKEN,
                isAdmin: userIsAdmin,
                email,
                first_name: first_name,
                last_name: last_name,
                address: address,
                city: city,
                postal_code: postal_code,
                country: country,
                phone_number: phone_number
            }));
            next();
        } else {
            res.status(401).json(error("Identification problem2"));
        }
    } catch (error) {
        throw Error(error);
    }
}

export const update = async (req, res) => {
    try {
        const { id } = req.user;
        const { first_name, last_name, address, city, postal_code, country, phone_number } = req.body; 
        
        const query = "UPDATE user SET first_name = ?, last_name = ?, address = ?, city = ?, postal_code = ?, country = ?, phone_number = ? WHERE id = ?";
        const [result] = await Query.write(query, [first_name, last_name, address, city, postal_code, country, phone_number, id]);

        if (result.affectedRows) {
            const msg = "Account modified.";
            res.json(success(msg));
        } else {
            throw new Error("Probable error in the sentence, account not modified !!!");
        }
    } catch (error) {
        throw new Error(error);
    }
};