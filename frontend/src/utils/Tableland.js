import { Database } from "@tableland/sdk";

const db = new Database();
const tableName = "my_hardhat_table_31337_2";

export const getProjectsFromTableland = async () => {
  try {
    const { results } = await db.prepare(`SELECT * FROM ${tableName};`).all();
    return results;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export const getProjectsByTagFromTableland = async (tag) => {
  try {
    const { results } = await db.prepare(`SELECT * FROM ${tableName} WHERE tag LIKE '%${tag}%';`).all();
    return results;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export const getProjectsByTitleFromTableland = async (title) => {
  try {
    const { results } = await db.prepare(`SELECT * FROM ${tableName} WHERE title LIKE '%${title}%';`).all();
    return results;
  } catch (error) {
    console.error(error);
    return [];
  }
}