const path = require("path");
const fs = require("fs");
const solc = require("solc");

const filePath = path.resolve(__dirname,"contracts","base.sol");
const source = fs.readFileSync(filePath,"utf-8");

var input = {
    language: 'Solidity',
    sources: {
        'base.sol' : {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
};

var output = JSON.parse(solc.compile(JSON.stringify(input)));

console.log(output);