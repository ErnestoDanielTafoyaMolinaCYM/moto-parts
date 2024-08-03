const createPart = `INSERT INTO partes (nombre_parte, descripcion, precio) VALUES (?, ?, ?)`;
const getParts = `SELECT * FROM partes`;
const getPartById = `SELECT * FROM partes WHERE idParte = ?`;
const updatePart = `UPDATE partes SET nombre_parte = ?, descripcion = ?, precio = ? WHERE idParte = ?`;
const deletePart = `DELETE FROM partes WHERE idParte = ?`;

export const parts = {
    createPart,
    getParts,
    getPartById,
    updatePart,
    deletePart
}