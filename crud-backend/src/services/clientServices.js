import { query } from "../db.js";

export const getClients = async () => {
    try {
        const result = await query("SELECT * FROM clients_tb");
        return result.rows; // PostgreSQL returns results in a 'rows' property
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; // Re-throw the error so the controller can handle it
    }
}

export const createClient = async (clientData) => {
    try {
        const { name, email, job, rate, isActive } = clientData;

        const result = await query(
            `INSERT INTO clients_tb (name, email, job, rate, isActive)
            VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [name, email, job, rate, isActive]
        );
        
        return result.rows[0]; // Return the newly created client
    } catch (error) {
        console.error("Error creating client:", error);
        throw error; // Re-throw the error so the controller can handle it
    }
}