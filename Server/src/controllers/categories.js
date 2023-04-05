import { success } from "../helpers/index.js";
import Query from "../model/query.js";

export const all = async (req, res) => {
    try {
        const query = "SELECT *  FROM category";
        const [categories] = await Query.find(query);

        if(categories.length){
            const msg = "Recuperation of all categories";
            res.status(200).json(success(msg, categories));
        } else {
            const msg = "No categories in the Data Base yet";
            res.status(200).json(success(msg));
        }
    } catch (err) {
        throw Error(err);
    }
}

export const one = async (req, res) => {
    try {
        const query = "SELECT * FROM category WHERE id = ?";
        const category   = await Query.findOne(query, req.params.id);
        
        if(!category){
            const msg = "This category doesn't exist in the Data Base";
            res.status(200).json(success(msg));
        } else {
            const msg = "Recuperation of category" + category.title;
            res.status(200).json(success(msg, category));
        }
    } catch (err) {
        throw Error(err);
    }
}

export const add = async (req,res) => {
    try {
        const query = "INSERT INTO category (title, description, image_name, image_alt) VALUES (?,?,?,?)";
        const result = await Query.write(query, req.body);
        
        if(result.affectedRows){
            const msg = "Category added";
            res.json(success(msg, result));
        } else throw Error("Category not added, probable error in the sentence !!!")
    } catch (err) {
        throw Error(err);
    }
}

export const update = async (req,res) => {
    try {

        const query = "UPDATE category SET title = ?, description = ?, image_name = ?, image_alt = ? WHERE id = ?";
        const [result] = await Query.write(query, req.body);

        if(result.affectedRows){
            const msg = "Category modified.";
            res.json(success(msg));

        } else throw Error("Category not modified, probable error in the sentence.");
        
    } catch (err) {
        throw Error(err);
    }
}

export const remove = async (req,res) => {
    try {
        const query = "DELETE FROM category WHERE id = ?";
        const [result] = await Query.remove(query, req.body.id);
        
        if(result.affectedRows){
            const msg = "Category deleted.";
            res.json(success(msg));

        } else throw Error("Category not deleted, probable error in the sentence.");

    } catch (err) {
        throw Error(err);
    }
}