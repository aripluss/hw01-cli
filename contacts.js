const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

console.log("__dirname", __dirname);
const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  const contactsData = await fs.readFile(contactsPath);
  return JSON.parse(contactsData);
}

async function getContactById(contactId) {
  const allContacts = await listContacts();
  const foundContact = allContacts.find((contact) => contact.id === contactId);
  return foundContact || null;
}

async function removeContact(contactId) {
  const allContacts = await listContacts();
  const removedContactIdx = allContacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (removedContactIdx === -1) return null;
  const newContacts = allContacts.filter((_, idx) => idx !== removedContactIdx);
  await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
  return allContacts[removedContactIdx];
}

async function addContact(name, email, phone) {
  const allContacts = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  allContacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
