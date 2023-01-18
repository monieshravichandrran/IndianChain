pragma solidity ^0.4.17;

contract Record {
    uint256 public citizen_count;
    uint256 public educational_institutions_count;
    uint256 public organization_count;
    address public administrator;
    mapping(address => bool) public citizen;
    mapping(address => bool) public educational_institutions;
    mapping(address => bool) public organization;
    mapping(address => mapping(uint256 => uint256[])) government_documents;
    mapping(address => mapping(uint256 => uint256[])) educational_documents;
    mapping(address => mapping(uint256 => uint256[])) organizational_documents;
    mapping(address =>uint) public government_documents_count;
    mapping(address =>uint) public educational_documents_count;
    mapping(address =>uint) public organizational_documents_count;
    mapping(address =>uint) public citizen_chain_view_access;
    mapping(address =>uint) public citizen_chain_write_access;

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
    }

    function removeReadAccess(address req) public payable {
        require(citizen[msg.sender]);
        citizen_chain_read_access[msg.sender][req] = false;    
    }

    function removeWriteAccess(address req) public payable {
        require(citizen[msg.sender]);
        citizen_chain_write_access[msg.sender][req] = false;    
    }

    function addGovernmentDocument(address citi, uint256[] memory doc) public payable {
        require(msg.sender == administrator);
        require(citizen[citi]);
        for (uint256 i = 0; i < doc.length; ++i) {
            government_documents[citi][government_documents_count[citi]].push(doc[i]);
        }
        government_documents_count[citi]++;
    }

    function addEducationalDocument(address citi, uint256[] memory doc) public payable {
        require(educational_institutions[msg.sender]);
        require(citizen[citi]);
        require(citizen_chain_write_access[citi][msg.sender]);
        for (uint256 i = 0; i < doc.length; ++i) {
            educational_documents[citi][educational_documents_count[citi]].push(doc[i]);
        }
        educational_documents_count[citi]++;
    }

    function addOrganizationDocument(address citi, uint256[] memory doc) public payable {
        require(organization[msg.sender]);
        require(citizen[citi]);
        require(citizen_chain_write_access[citi][msg.sender]);
        for (uint256 i = 0; i < doc.length; ++i) {
            organizational_documents[citi][organizational_documents_count[citi]].push(doc[i]);
        }
        organizational_documents_count[citi]++;
    }

    function getGovernmentDocument(address citi) public view returns (uint256[] memory) {
        require(citizen[citi]);
        require(citizen_chain_read_access[citi][msg.sender]);
        uint256[] allGovtDocuments;
        for(int i=0;i<government_documents_count[citi]; ++i){
            for(int j=0;j<government_documents[citi][i].length;++j){
                allGovtDocuments.push(government_documents[citi][i][j])
            }
            allGovtDocuments.push(-1);
        }
        return allGovtDocuments;
    }

    function getEducationalDocument(address citi) public view returns (uint256[] memory) {
        require(citizen[citi]);
        require(citizen_chain_read_access[citi][msg.sender]);
        uint256[] allEduDocuments;
        for(int i=0;i<educational_documents_count[citi];++i){
            for(int j=0;j<educational_documents[citi][i].length;++j){
                allEduDocuments.push(educational_documents[citi][i][j])
            }
            allEduDocuments.push(-1);
        }
        return allEduDocuments;
    }

    function getOrganizationDocument(address citi) public view returns (uint256[] memory) {
        require(citizen[citi]);
        require(citizen_chain_read_access[citi][msg.sender]);
        uint256[] allOrgDocuments;
        for(int i=0;i<organizational_documents_count[citi];++i){
            for(int j=0;j<organizational_documents[citi][i].length;++j){
                allOrgDocuments.push(organizational_documents[citi][i][j])
            }
            allOrgDocuments.push(-1);
        }
        return allOrgDocuments;
    }

}