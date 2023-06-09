const crypto = require('crypto');

const contacts = [];

function getContacts() {
  return contacts;
}

function addContact({ name, email }) {
  const id = crypto.randomUUID();
  contacts.push({ id, name, email });
  return id;
}

function deleteContact(id) {
  const index = contacts.findIndex((item) => item.id === id);

  if (index === -1) {
    return false;
  }

  contacts.splice(index, 1);
  return true;
}

module.exports = {
  getContacts,
  addContact,
  deleteContact,
};
