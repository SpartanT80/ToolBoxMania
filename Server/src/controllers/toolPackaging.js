import { success } from "../helpers/index.js";
import Query from "../model/query.js";

export const all = async (req, res) => {
    try {
        const query = "SELECT *  FROM tool_packaging";
        const [tool_packaging] = await Query.find(query);

        if(tool_packaging.length){
            const msg = "Recuperation of all tool_packaging";
            res.status(200).json(success(msg, tool_packaging));
        } else {
            const msg = "No tool_packaging in the Data Base yet";
            res.status(200).json(success(msg));
        }
    } catch (err) {
        throw Error(err);
    }
}

export const one = async (req, res) => {
    try {
        const query = "SELECT * FROM tool_packaging WHERE id = ?";
        const tool_packaging   = await Query.findOne(query, req.params.id);
        
        if(!tool_packaging){
            const msg = "This tool_packaging doesn't exist in the Data Base";
            res.status(200).json(success(msg));
        } else {
            const msg = "Recuperation of tool_packaging" + tool_packaging.title;
            res.status(200).json(success(msg, tool_packaging));
        }
    } catch (err) {
        throw Error(err);
    }
}

export const add = async (req,res) => {
    try {
            const query = "INSERT INTO tool_packaging (price, quantity_in_stock, tool_id, packaging_id) VALUES (?,?,?,?)";
            const [result] = await Query.write(query, req.body);
            
            if(result.affectedRows){
            const msg = "tool_packaging added";
            res.json(success(msg, result));
        } else throw Error("tool_packaging not added, probable error in the sentence !!!")
    
    } catch (err) {
        throw Error(err);
    }
}

export const update = async (req,res) => {
    try {
            const query = "UPDATE tool_packaging SET price = ?, quantity_in_stock = ?, packaging_id = ?, tool_id = ? WHERE id = ?";
            const [result] = await Query.write(query, req.body);
            
            if(result.affectedRows){
                const msg = "tool_packaging modified.";
                res.json(success(msg));
                
            } else throw Error("tool_packaging not modified, probable error in the sentence.");
        
    } catch (err) {
        throw Error(err);
    }
}

export const remove = async (req,res) => {
    try {
            const query = "DELETE FROM tool_packaging WHERE id = ?";
            const [result] = await Query.remove(query, req.body.id);
            
            if(result.affectedRows){
                const msg = "tool_packaging deleted.";
                res.json(success(msg));
                
            } else throw Error("tool_packaging not deleted, probable error in the sentence.");
        
            
    } catch (err) {
        throw Error(err);
    }
}