   // app.js
   require('dotenv').config();
   const fastify = require('fastify')({ logger: true });
   const mongoose = require('mongoose');

   // Register the MongoDB plugin with the URL from the environment variable
   fastify.register(require('fastify-mongodb'), {
     url: process.env.MONGO_URL,
   });

   // Define a simple route
   fastify.get('/', async (request, reply) => {
     return { message: 'Hello, Fastify with MongoDB!' };
   });

   // Start the server
   const start = async () => {
     try {
       await fastify.listen({ port: process.env.PORT });
       fastify.log.info(`Server is running on http://localhost:${process.env.PORT}`);
     } catch (err) {
       fastify.log.error(err);
       process.exit(1);
     }
   };

   start();