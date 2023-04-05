import { success, error } from "../helpers/index.js";
import Query from "../model/query.js";
import { hash, compare } from "bcrypt";
import jwt from 'jsonwebtoken';

const { TOKEN_SECRET } = process.env;
const saltRounds = 10;

const checkToken = async (req, res) => {
    try {
        const query = "SELECT * FROM user WHERE id = ?";
        const [user] = await Query.findOne(query, req.params.id);
        if (user) {
            const msg = "Utilisateur récupéré";
            res.status(200).json(success(msg, user));
        } else {
            const msg = "Pas de compte avec ces identifiants";
            res.status(200).json(success(msg));
        }

    } catch (error) {
        throw Error(error);
    }
}

const signup = async (req, res) => {
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

            const query = "INSERT INTO user (email, password, first_name, last_name, address, city, postal_code, country, phone_number, created_at, isAdmin) VALUES (?,?,?,?,?,?,?,?,?,NOW(),0)";
            const result = await Query.write(query, Object.values(data));
            
            res.status(201).json(success("user created !", result));
        }

    } catch (error) {
        throw Error(error);
    }
}

const signin = async (req, res) => {
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
            const TOKEN = jwt.sign({ id: user.id }, TOKEN_SECRET);
            const { email } = user;
            res.status(200).json(success("Connected", { TOKEN, email, first_name: user.first_name, last_name: user.last_name, address: user.address, city: user.city, postal_code: user.postal_code, country: user.country, phone_number: user.phone_number }));
        } else {
            res.status(401).json(error("Identification problem2"));
        }
    } catch (error) {
        throw Error(error);
    }
}

export { checkToken, signup, signin };