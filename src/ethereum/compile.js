const path = require("path");
const fs = require("fs");
const solc = require("solc");

const filePath = path.resolve(__dirname,"contracts","base.sol");
const source = fs.readFileSync(filePath,"utf-8");

var input = {
    language: 'Solidity',
    sources: {
        'Inbox' : {
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

const data = (JSON.parse(solc.compile(JSON.stringify(input)))).contracts["Inbox"];
fs.writeFileSync(path.resolve(__dirname,"build","Record.json"),JSON.stringify(data));

module.exports = data;