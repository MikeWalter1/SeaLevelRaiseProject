// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

enum OrganizationState {
    Onboarding,
    OnboardingFailed,
    Onboarded,
    OngoingProject
}

struct Organization {
    uint organizationId;
    address payable walletAddress;
    string organizationName;
    string organisationDescription;
    OrganizationState state;
}

contract OrganizationManager {
    mapping (address => Organization) public organizations;
    uint public numberOfOrganizations;

    function createOrganization(address payable _walletAddress, string memory _organizationName, string memory _organisationDescription) internal  {
        organizations[_walletAddress] = Organization(numberOfOrganizations, _walletAddress, _organizationName, _organisationDescription, OrganizationState.Onboarding);
        numberOfOrganizations++;
    }

    function getOrganization(address _walletAddress) public view returns(Organization memory) {
        return organizations[_walletAddress];
    }

    function setOrganizationState(address _walletAddress, OrganizationState _state) internal  {
        organizations[_walletAddress].state = _state;
    }

    function getOrganizationState(address _walletAddress) public view returns(OrganizationState) {
        return organizations[_walletAddress].state;
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
