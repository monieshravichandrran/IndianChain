// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Record {
    uint256 public citizen_count;
    uint256 public educational_institutions_count;
    uint256 public organization_count;
    address public administrator;
    mapping(address => bool) public citizen;
    mapping(address => bool) public educational_institutions;
    mapping(address => bool) public organization;
    mapping(address => uint256[]) government_documents;
    mapping(address => uint256[]) educational_documents;
    mapping(address => uint256[]) organizational_documents;
    mapping(address =>uint) public government_documents_count;
    mapping(address =>uint) public educational_documents_count;
    mapping(address =>uint) public organizational_documents_count;
    mapping(address => mapping(address => bool)) public citizen_chain_read_access;
    mapping(address => mapping(address => bool)) public citizen_chain_write_access;
    uint256 del = 999;

    constructor(){
        administrator = msg.sender;
    }

    function addCitizen(address citi) public payable {
        require(msg.sender == administrator);
        citizen[citi] = true;
        citizen_count++;
    }

    function addEducationalInstitution(address educational) public payable {
        require(msg.sender == administrator);
        educational_institutions[educational] = true;
        educational_institutions_count++;
    }

    function addOrganization(address org) public payable {
        require(msg.sender == administrator);
        organization[org] = true;
        organization_count++;
    }

    function provideReadAccess(address req) public payable {
        require(citizen[msg.sender]);
        citizen_chain_read_access[msg.sender][req] = true;
    }

    function provideWriteAccess(address req) public payable {
        require(citizen[msg.sender]);
        citizen_chain_write_access[msg.sender][req] = true;
        citizen_chain_read_access[msg.sender][req] = true;
    }

    function removeReadAccess(address req) public payable {
        require(citizen[msg.sender]);
        citizen_chain_read_access[msg.sender][req] = false;    
    }

    function removeWriteAccess(address req) public payable {
        require(citizen[msg.sender]);
        citizen_chain_write_access[msg.sender][req] = false;   
        citizen_chain_read_access[msg.sender][req] = false; 
    }

    function addGovernmentDocument(address citi, uint256[] memory doc) public payable {
        require(msg.sender == administrator);
        require(citizen[citi]);
        for (uint256 i = 0; i < doc.length; ++i) {
            government_documents[citi].push(doc[i]);
        }
        government_documents[citi].push(del);
        government_documents_count[citi]++;
    }

    function addEducationalDocument(address citi, uint256[] memory doc) public payable {
        require(educational_institutions[msg.sender]);
        require(citizen[citi]);
        require(citizen_chain_write_access[citi][msg.sender]);
        for (uint256 i = 0; i < doc.length; ++i) {
            educational_documents[citi].push(doc[i]);
        }
        educational_documents[citi].push(del);
        educational_documents_count[citi]++;
    }

    function addOrganizationDocument(address citi, uint256[] memory doc) public payable {
        require(organization[msg.sender]);
        require(citizen[citi]);
        require(citizen_chain_write_access[citi][msg.sender]);
        for (uint256 i = 0; i < doc.length; ++i) {
            organizational_documents[citi].push(doc[i]);
        }
        organizational_documents[citi].push(del);
        organizational_documents_count[citi]++;
    }

    function getGovernmentDocument(address citi) public view returns (uint256[] memory) {
        require(citizen[citi]);
        require(citizen_chain_read_access[citi][msg.sender]);
        return government_documents[citi];
    }

    function getEducationalDocument(address citi) public view returns (uint256[] memory) {
        require(citizen[citi]);
        require(citizen_chain_read_access[citi][msg.sender]);
        return educational_documents[citi];
    }

    function getOrganizationDocument(address citi) public view returns (uint256[] memory) {
        require(citizen[citi]);
        require(citizen_chain_read_access[citi][msg.sender]);
        return organizational_documents[citi];
    }

}