//

// name: Ziad Mohamed Hussain SE2

// this is a simple BlockChain code.

// PACKAGE used => crypto-js

// The code implements a basic blockchain in JavaScript with two classes: Block and Blockchain.
//  It defines how blocks are created, linked, and validated. The script mines two blocks, checks the blockchain's validity if it is true,
//  simulates tampering by modifying block data, and then rechecks validity (resulting in false due to tampering).

//

const SHA256 = require("crypto-js/sha256"); // this is built in increption packege inside node js

class Block {
  constructor(index, timestamp, data, previousHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    // this here is the hashing
    return SHA256(
      this.index +
        this.timestamp +
        JSON.stringify(this.data) +
        this.previousHash
    ).toString();
  }
}

class Blockchain {
  // blockChain class
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, "01/01/2022", "Genesis Block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }
}

// Usage
const myBlockchain = new Blockchain();

console.log("Mining block 1...");
myBlockchain.addBlock(new Block(1, "02/01/2022", { amount: 4 }));

console.log("Mining block 2...");
myBlockchain.addBlock(new Block(2, "03/01/2022", { amount: 8 }));

// Check if the blockchain is valid
console.log("blockchain valid? " + myBlockchain.isChainValid());

myBlockchain.chain[1].data = { amount: 100 };

console.log("blockchain valid after tampering? " + myBlockchain.isChainValid());
