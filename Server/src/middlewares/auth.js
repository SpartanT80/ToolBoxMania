import jwt from 'jsonwebtoken';

const { TOKEN_SECRET } = process.env;

export const auth = (req, res, next) => {
    const TOKEN = req.headers['x-access-token'];
    if (TOKEN === undefined || TOKEN === "null") {
        res.status(404).json({ msg: "token not found" });
        return;
    } else {
        jwt.verify(TOKEN, TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).json({ status: 401, msg: "token invalid" });
                return;
            } else {
                req.user = {id: decoded.id};
                next();
            }
        });
    }
}

export const isAdmin = (req, res, next) => {
    const TOKEN = req.headers['x-access-token'];

    if (TOKEN === undefined || TOKEN === "null") {
        res.status(404).json({ msg: "token not found" });
        return;
    } else {
        jwt.verify(TOKEN, TOKEN_SECRET, (err, decoded) => {
            
            if (err) {
                res.status(401).json({ status: 401, msg: "token invalid" });
                return;
            } else {
                req.user = { id: decoded.id, isAdmin: decoded.isAdmin };
                if (req.user.isAdmin === 1) {
                    next(); 
                } else {
                    res.status(403).json({ status: 403, msg: "not authorized as admin" });
                }
            }
        });
    }
};

