import Part from "../models/part.model.js";
import pool from "../database/connection.js";
import { parts } from "../database/queries.js";

const create = async( part ) => {
    if (!(part instanceof Part)) {
        throw new Error('Invalid part');
    }
    const { name, description, price } = part;
    try {
        const rs = await pool.query(parts.createPart, [name, description, price]);
        return rs;
    } catch (error) {
        console.error("Algo salio mal creando la parte: ",error);
        throw new Error(error);
    }
}

const getParts = async() => {
    try {
        const rs = await pool.query(parts.getParts);
        return rs;
    } catch (error) {
        console.error("Algo salio mal obteniendo las partes: ",error);
        throw new Error(error);
    }
}

const getPartById = async( id ) => {
    try {
        const rs = await pool.query(parts.getPartById, [id]);
        return rs;
    } catch (error) {
        console.error("Algo salio mal obteniendo la parte: ",error);
        throw new Error(error);
    }
}

const update = async( part ) => {
    if (!(part instanceof Part)) {
        throw new Error('Invalid part');
    }
    try {
        const { name, description, price, id } = part;
        const rs = await pool.query(parts.updatePart, [name, description, price, id]);
        return rs;
    } catch (error) {   
        console.error("Algo salio mal actualizando la parte: ",error);
        throw new Error(error);
    }
}

const remove = async( id ) => {
    try {
        const rs = await pool.query(parts.deletePart, [id]);
        return rs;
    } catch (error) {
        console.error("Algo salio mal eliminando la parte: ",error);
        throw new Error(error);
    }
}

export const partsService = {
    create,
    getParts,
    getPartById,
    update,
    remove
}