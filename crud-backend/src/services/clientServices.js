import { query } from "../db.js";

export const getClients = async () => {
  try {
    const result = await query("SELECT * FROM clients_tb");
    return result.rows;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const createClient = async (clientData) => {
  try {
    const { name, email, job, rate, isactive } = clientData;

    const result = await query(
      `INSERT INTO clients_tb (name, email, job, rate, isactive)
            VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, email, job, rate, isactive]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error creating client:", error);
    throw error;
  }
};

export const updateClient = async (clientData, clientId) => {
  try {
    const { name, email, job, rate, isactive } = clientData;

    const result = await query(
      `UPDATE clients_tb SET name = $1, email = $2, job = $3, rate = $4, isactive = $5
      WHERE id = $6 RETURNING *`,
      [name, email, job, rate, isactive, clientId]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error creating client:", error);
    throw error;
  }
};

export const deleteClient = async (clientId) => {
  try {
    const result = await query(
      `DELETE FROM clients_tb WHERE id = $1 RETURNING *`,
      [clientId]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error deleting client:", error);
    throw error;
  }
};

export const searchClients = async (searchTerm) => {
  try {
    const result = await query(
      `SELECT * FROM clients_tb WHERE name ILIKE $1 OR email ILIKE $1 OR job ILIKE $1`,
      [`%${searchTerm}%`]
    );
    return result.rows;
  } catch (error) {
    console.error("Error searching clients:", error);
    throw error;
  }
};