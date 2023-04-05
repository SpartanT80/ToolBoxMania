import { success } from "../helpers/index.js";
import Query from "../model/query.js";

export const all = async (req, res) => {
    try {
        // const query = "SELECT * FROM tool";
        const query = "SELECT tool.id, tool.category_id, main_title, secondary_title, main_description, image_name, image_alt, avg_vote, vote_count, ref_product, created_at, MIN(price) as price FROM tool JOIN tool_packaging ON tool_packaging.tool_id = tool.id JOIN packaging ON tool_packaging.packaging_id = packaging.id GROUP BY main_title";
        const [tools] = await Query.find(query);
        if (tools.length) {
            const msg = "Fetch of all tools";
            res.status(200).json(success(msg, tools));
        } else {
            const msg = "No tools in DB system";
            res.status(400).json(success(msg));
        }
    } catch (err) {
        throw Error(err);
    }
}


export const one = async (req, res) => {
    try {
        const queryTool = "SELECT * FROM tool WHERE id = ?";
        const queryInfoTool = "SELECT packaging.id as idPackaging, quantity_in_stock, price, type FROM tool_packaging JOIN packaging ON tool_packaging.packaging_id = packaging.id WHERE tool_packaging.tool_id = ?";

        const tool = await Query.findOne(queryTool, req.params.val);
        const toolInfo = await Query.findOne(queryInfoTool, req.params.val);
        const finalTool = { ...tool[0], toolInfo };

        if (!tool.length) {
            const msg = `This tool doesn't exist in the DataBase !!`;
            res.status(200).json(success(msg));
        } else {
            const msg = `Recuperation of ` + tool[0].main_title;
            res.status(200).json(success(msg, finalTool));
        }

    } catch (err) {
        throw Error(err);
    }
}

export const toolsByCategory = async (req, res) => {
    try {
        const queryTool = "SELECT * FROM tool WHERE category_id = ?";
        const queryInfoTool = "SELECT packaging.id as idPackaging, quantity_in_stock, price, type FROM tool_packaging JOIN packaging ON tool_packaging.packaging_id = packaging.id WHERE tool_packaging.tool_id = ?";

        const tools = await Query.findOne(queryTool, req.params.id);

        if (!tools.length) {
            const msg = `No tools found in this category!`;
            res.status(200).json(success(msg));
        } else {
            const toolsWithInfo = await Promise.all(
                tools.map(async (tool) => {
                    const toolInfo = await Query.findOne(queryInfoTool, tool.id);
                    return { ...tool, toolInfo };
                })
            );
            const msg = `Recuperation of ${tools.length} tools from category with ID ${req.params.id}`;
            res.status(200).json(success(msg, toolsWithInfo));
        }

    } catch (err) {
        throw Error(err);
    }
};


export const lastInserted = async (req, res) => {
    try {
        const query = "SELECT id, main_title, secondary_title, main_description, created_at, image_name, image_alt, (SELECT MIN(price) FROM tool_packaging WHERE tool_id = tool.id) AS price FROM tool ORDER BY created_at DESC LIMIT 1";
        const [tool] = await Query.find(query);

        if (!tool) {
            const msg = "No tools found in the database";
            res.status(200).json(success(msg));
        } else {
            const msg = `Retrieved the most recently inserted tool: ${tool.main_title}`;
            res.status(200).json(success(msg, tool));
        }
    } catch (err) {
        throw Error(err);
    }
}


export const add_tool = async (req, res) => {
    try {
        const query = "INSERT INTO tool (main_title, secondary_title, main_description, image_name, image_alt, ref_product, created_at, category_id) VALUES (?, ?, ?, ?, ?, ?, NOW(),  ?)";
        const [result] = await Query.write(query, req.body);

        if (result.affectedRows) {
            const msg = "Tool added";
            const toolId = result.insertId;
            res.json({toolId: toolId});
        } else { throw Error("Probable error in the sentence, tool not added !!!"); }

    } catch (err) {
        throw Error(err);
    }
}


export const add_toolPackaging = async (req, res) => {
    try {
        const query = "INSERT INTO tool_packaging (quantity_in_stock, price, tool_id, packaging_id) VALUES (?, ?, ?, ?)";
        const [result] = await Query.write(query, req.body);

        if (result.affectedRows) {
            const msg = "Information of tool : packaging and price added";
            res.json(success(msg));

        } else throw Error("Probable error in the sentence, packaging and price not added !!!");

    } catch (err) {
        throw Error(err);
    }
}


export const update = async (req, res) => {
    try {

        const query = "UPDATE tool SET main_title = ?, secondary_title = ?, main_description = ?, image_name = ?, image_alt = ?, ref_product = ? WHERE id = ?";
        const [result] = await Query.write(query, req.body);

        if (result.affectedRows) {
            const msg = "Tool modified.";
            res.json(success(msg));

        } else throw Error("Probable error in the sentence, tool not modified !!!");

    } catch (err) {
        throw Error(err);
    }
}

export const remove = async (req, res) => {
    try {
        const query = "DELETE FROM tool WHERE id = ?";
        const [result] = await Query.remove(query, req.params.id);
        if (result.affectedRows) {
            const msg = "Tool deleted.";
            res.json(success(msg));

        } else throw Error("Probable error in the sentence, tool not  deleted!!!");

    } catch (err) {
        throw Error(err);
    }
}