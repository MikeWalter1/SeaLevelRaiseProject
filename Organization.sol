// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

enum OrganizationState {
    Onboarding,
    OnboardingFailed,
    Onboarded,
    OngoingProject
}

struct OrganizationData {
    address payable walletAddress;
    string organizationName;
    string organisationDescription;
}

contract Organization {
/*    address payable public walletAddress;
    string public organizationName;
    string public organisationDescription;
     string public city;
    string public streetAddress;
    string public postalCode;
    string public country;
    string public urlLegalDocuments;
    string public taxNumber;
    string public website;
    string public phoneNumber;
    string public email;
    string public responsiblePerson;
    OrganizationState public state; */

    address public dao;
    mapping (address => OrganizationData) public organizations;
    
    modifier onlyOwner() {
        require(msg.sender == dao, "Can only be called from the SLR DAO");
        _;
    }

/*     constructor(address payable _walletAddress, string memory _organizationName, string memory _organisationDescription,  string memory _city, string memory _streetAddress, string memory _postalCode, string memory _country, string memory _urlLegalDocuments, string memory _taxNumber, string memory _website, string memory _phoneNumber, string memory _email, string memory _responsiblePerson) {
        walletAddress = _walletAddress;
        organizationName = _organizationName;
        organisationDescription = _organisationDescription;
        city = _city;
        streetAddress = _streetAddress;
        postalCode = _postalCode;
        country = _country;
        urlLegalDocuments = _urlLegalDocuments;
        taxNumber = _taxNumber;
        website = _website;
        phoneNumber = _phoneNumber;
        email = _email;
        responsiblePerson = _responsiblePerson;
        state = OrganizationState.Onboarding;
    } */

    constructor(address _dao) {
        dao = _dao;
    }

    function createOrganizationData(address payable _walletAddress, string memory _organizationName, string memory _organisationDescription) external onlyOwner {
        organizations[_walletAddress] = OrganizationData(_walletAddress, _organizationName, _organisationDescription);
    }

/*     function setOrganizationState(OrganizationState _state) public onlyOwner {
        state = _state;
    }

    function getOrganizationState() public view returns(OrganizationState) {
        return state;
    }

    function changeDescription(string memory _description) public onlyOwner {
        organisationDescription = _description;
    }

    function changeResponsiblePerson(string memory _responsiblePerson) public onlyOwner {
        responsiblePerson = _responsiblePerson;
    } */

/*     function changeAddress(string memory _city, string memory _streetAddress, string memory _postalCode, string memory _country) public onlyOwner {
        city = _city;
        streetAddress = _streetAddress;
        postalCode = _postalCode;
        country = _country;
    }

    function changeContactDetails(string memory _urlLegalDocuments, string memory _website, string memory _phoneNumber, string memory _email) public onlyOwner {
        urlLegalDocuments = _urlLegalDocuments;
        website = _website;
        phoneNumber = _phoneNumber;
        email = _email;
    }

    function changeEmail(string memory _email) public onlyOwner {
        email = _email;
    }

    function changePhoneNumber(string memory _phoneNumber) public onlyOwner {
        phoneNumber = _phoneNumber;
    }

    function changeWebsite(string memory _website) public onlyOwner {
        website = _website;
    }    */
}
