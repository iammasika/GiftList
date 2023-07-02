const axios = require('axios');

const serverUrl = 'http://localhost:1225';
// creating server
const server = axios.create({
  baseURL: "http://localhost:3042",
});

async function main() {
  // TODO: how do we prove to the server we're on the nice list? 
  const name= "Jenna Barton";
  //encoding our name 
  const encoded = Buffer.from(name).toString('hex');
  console.log("Encoded: ",encoded);

  const { data: gift } = await server.post(`${serverUrl}/gift`, {
  // TODO: add request body parameters here!
   encoded
   
  });
  console.log({ gift });
}

main();