import Part from "../models/part.model.js";
import { partsService } from "../services/parts.services.js";

//vistas
export const getMain = async( req, res ) => {
    try {
        const [ parts ] = await partsService.getParts();
        return res.status(200).render("home", { parts });
    } catch (error) {
        console.log(error);
        return res.status(500).render("home", { error: error.message }); 
    }
}

export const getPart = async ( req, res ) => {
    const { id } = req.params;
    try {
        const [[ part ]] = await partsService.getPartById(id);
        if(!part) return res.status(404).render("part", { error: "Part not found", layout:'main' });
        console.log(part);
        return res.status(200).render("edit", { part, layout:'main' });
    } catch (error) {
        console.log(error);
        return res.status(500).render("edit", { error: error.message, layout:'main' });
    }
}

export const createPartView = ( req, res ) => {
    return res.render("create");
};


//acciones
export const createPart = async ( req, res ) => {
    const { name, description, price } = req.body;
    const part = new Part( null, name, description, price );
    try {
        await partsService.create(part);
        return res.status(201).json({ message: "Part created successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).render("create", { error: error.message, layout:'main' });
    }
}

export const updatePart = async ( req, res ) => {
    const { id } = req.params;
    const { name, description, price } = req.body;
    try {
        const [[ oldPart ]] = await partsService.getPartById( id );
        if (!oldPart || oldPart === null) return res.status(404).render("edit", { error: "Part not found", layout:'main' });

        const part = new Part( oldPart.idParte, name, description, price );

        const re =await partsService.update(part);

        return res.status(200).json({ message: "Part updated successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).render("edit", { error: error.message, layout:'main' });
    }
}

export const deletePart = async( req, res ) => {
    const { id } = req.params;
    try {
        await partsService.remove(id);
        return res.status(200).json({ message: "Part deleted successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).render("edit", { error: error.message, layout:'main' });
    }
}

