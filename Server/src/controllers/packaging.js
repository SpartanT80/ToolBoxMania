import { success } from "../helpers/index.js";
import Query from "../model/query.js";


export const all = async (req, res) => {
    try {
        const query = "SELECT *  FROM packaging";
        const [packagings] = await Query.find(query);

        if(packagings.length){
            const msg = "Recuperation of all packagings";
            res.status(200).json(success(msg, packagings));
        } else {
            const msg = "No packagings in the Data Base yet";
            res.status(200).json(success(msg));
        }
    } catch (err) {
        throw Error(err);
    }
}

export const one = async (req, res) => {
    try {
        const query = "SELECT * FROM packaging WHERE id = ?";
        const packaging   = await Query.findOne(query, req.params.id);
        
        if(!packaging){
            const msg = "This packaging doesn't exist in the Data Base";
            res.status(200).json(success(msg));
        } else {
            const msg = "Recuperation of packaging" + packaging.title;
            res.status(200).json(success(msg, packaging));
        }
    } catch (err) {
        throw Error(err);
    }
}

export const add = async (req,res) => {
    try {
        const query = "INSERT INTO packaging (title, description, image_name, image_alt) VALUES (?,?,?,?)";
        const result = await Query.write(query, req.body);
        
        if(result.affectedRows){
            const msg = "Packaging added";
            res.json(success(msg, result));
        } else throw Error("Packaging not added, probable error in the sentence !!!")
    } catch (err) {
        throw Error(err);
    }
}

export const update = async (req,res) => {
    try {

        const query = "UPDATE packaging SET title = ?, description = ?, image_name = ?, image_alt = ? WHERE id = ?";
        const [result] = await Query.write(query, req.body);

        if(result.affectedRows){
            const msg = "Packaging modified.";
            res.json(success(msg));

        } else throw Error("Packaging not modified, probable error in the sentence.");
        
    } catch (err) {
        throw Error(err);
    }
}

export const remove = async (req,res) => {
    try {
        const query = "DELETE FROM packaging WHERE id = ?";
        const [result] = await Query.remove(query, req.body.id);
        
        if(result.affectedRows){
            const msg = "Packaging deleted.";
            res.json(success(msg));

        } else throw Error("Packaging not deleted, probable error in the sentence.");

    } catch (err) {
        throw Error(err);
    }
}