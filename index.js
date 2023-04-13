const contacts = require("./contacts");
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactsList = await contacts.listContacts();
      console.log("contactsList", contactsList);
      break;

    case "get":
      const foundContact = await contacts.getContactById(id);
      if (!foundContact) throw newError(`Contact with ${id} not found!`);
      console.log("foundContact", foundContact);
      break;

    case "add":
      const newContact = await contacts.addContact(name, email, phone);
      console.log("newContact", newContact);
      break;

    case "remove":
      const removedContact = await contacts.removeContact(id);
      console.log("removedContact", removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

const arr = hideBin(process.argv);
const { argv } = yargs(arr);

invokeAction(argv);
