const hapi = require('@hapi/hapi');
const { addContact, getContacts, deleteContact } = require('./data');

const PORT = 3000;

async function start() {
  const server = hapi.server({
    port: PORT,
    routes: {
      cors: true,
    },
  });

  server.route([
    {
      method: 'GET',
      path: '/',
      handler: () => ({ success: true, data: { message: 'Hello World!' } }),
    },
    {
      method: 'POST',
      path: '/contacts',
      handler: (request, h) => {
        const { name, email } = request.payload;
        const id = addContact({ name, email });
        return h.response({ success: true, data: { id } }).code(201);
      },
    },
    {
      method: 'GET',
      path: '/contacts',
      handler: () => {
        const contacts = getContacts();
        return { success: true, data: { contacts } };
      },
    },
    {
      method: 'DELETE',
      path: '/contacts/{id}',
      handler: (request, h) => {
        const { id } = request.params;
        const deleted = deleteContact(id);

        if (deleted) {
          return { success: true, data: { id } };
        }

        return h.response({ success: false, error: 'Contact not found' }).code(404);
      },
    },
  ]);

  await server.start();
  console.log(`Server listening on port http://localhost:${PORT}`);
}

start();
