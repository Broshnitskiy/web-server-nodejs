const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");
const contactsPath = path.join(__dirname, "models/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  const allContacts = JSON.parse(data);
  return allContacts;
};

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const result = allContacts.find((contact) => contact.id === contactId);
  if (!result) {
    return null;
  }
  return result;
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts();

  const idx = allContacts.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  const newContacts = allContacts.filter((_, index) => index !== idx);
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));
  return allContacts[idx];
};

const addContact = async (body) => {
  const allContacts = await listContacts();
  const newContact = { ...body, id: v4() };
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts));

  return newContact;
};

const updateContact = async (contactId, body) => {
  const allContacts = await listContacts();
  const idx = allContacts.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  allContacts[idx] = { ...body, contactId };
  await fs.writeFile(contactsPath, JSON.stringify(allContacts));
  return allContacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
