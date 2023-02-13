import * as xlsx from 'https://cdn.sheetjs.com/xlsx-0.19.2/package/xlsx.mjs';

const rows = [];
rows.push({ name: 'Pikachu', type: 'Electric' });
rows.push({ name: 'Squirtle', type: 'Water' });
rows.push({ name: 'Charmander', type: 'Fire' });

const worksheet = xlsx.utils.json_to_sheet(rows);
const workbook  = xlsx.utils.book_new();
xlsx.utils.book_append_sheet(workbook, worksheet, "pokemons");
const buffer = xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' });

const fs = require("uxp").storage.localFileSystem;
const file = await fs.getFileForSaving("pokemons.xlsx");
await file.write(buffer);
