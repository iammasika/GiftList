const express = require('express');
const MerkleTree = require('../utils/MerkleTree');
const niceList = require('../utils/niceList');
const verifyProof = require('../utils/verifyProof');
const port = 1225;
const app = express();
app.use(express.json());



// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
app.post('/gift', (req, res) => {

  // grab the parameters from the front-end here
 const {encoded} = req.body;
 
 //importing our merkelTree  model
  const merkleTree = new MerkleTree(niceList);
  const MERKLE_ROOT =  merkleTree.getRoot();

  const decoded = Buffer.from(encoded, 'hex').toString();
 
  //cheking if our name is in nicelistJson
  const index = niceList.findIndex(n => n === decoded);
  const proof = merkleTree.getProof(index);

  // TODO: prove that a name is in the list 
  let verify= verifyProof(proof, decoded, MERKLE_ROOT);
 // console.log(verify);
  const isInTheList=  verify;
  
  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
