export let getModalDomElements = function () {
    return {
        residentModalText: document.querySelector(".resident-modal-body"),
        planetModalText: document.querySelector(".planet-modal-body"),
        modalLabel: document.querySelector("#modal-label"),
        modalConfirm: document.querySelector("#modal-confirm"),
        modalTitle: document.querySelector(".modal-title"),
    };
};

export let getNavigationButtons = function () {
    return {
        nextButton: document.querySelector('#next'),
        previousButton: document.querySelector('#previous'),
    };
};

export let getPlanetsTable = function () {
    return document.querySelector('.planets-table');
};

export let getVoteButtons = function () {
    return document.querySelectorAll('.votebutton');
};

export let getUserSystemButtons = function () {
    return {
        registerButton: document.querySelector('#register-button'),
        loginButton: document.querySelector('#login-button')
    };
};

export let getPlanetsTableBody = function () {
    return document.querySelector(".planet-table-body");
};

export let getPlanetsVotingTableBody = function () {
    return document.querySelector(".planet-table-result");
};

export let getResidentStatisticsButton = function () {
    return document.querySelectorAll('.resident-button');
};

export let getResidentTableHeaders = function () {
    return document.querySelector('.resident-headers');
};

export let getResidentTableBody = function () {
    return document.querySelector('.resident-data');
};

export let getVoteStaticticsNavItem = function () {
    return document.querySelector('.voting-statistics-navitem');
};

export let getSpinnerTableRow = function () {
    return document.querySelector('.planet-table-body');
}