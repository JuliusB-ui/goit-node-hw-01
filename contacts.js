import fs from "fs/promises";   
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.join("db", 'contacts.json');

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
  } catch (error) {
    console.error("Error reading contacts:", error.message);
  }
}

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const result = contacts.find((contact) => contact.id === contactId)
    return result || null;
  } catch (error) {
    console.error(error.message);
  }
}
const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id===contactId)
    if(index === -1) {
      return null;
    }
    const deletedContact = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    return deletedContact
  } catch (error) {
    console.error(error.message);
  }
}

const addContact = async ({name, email, phone}) => {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      name: name,
      email: email,
      phone: phone,
    };
    const newContacts = [...contacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(newContacts,null,2))
    return newContact;
  
  } catch (error) {
    console.error(error.message)
  }
}

export { listContacts, getContactById, removeContact, addContact };