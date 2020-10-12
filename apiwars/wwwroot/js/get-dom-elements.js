export let getModalDomElements = function(){
    return {
        modalText : document.querySelector(".modal-body"),
        modalTitle : document.querySelector(".modal-title"),
    };
};

export let getNavigationButtons = function () {
    return {
        nextButton : document.querySelector('#next'),
        previousButton : document.querySelector('#previous'),
    };
};

export let getPlanetsTable = function () {
    return document.querySelector('.planets-table');
};

export let getVoteButtons = function () {
    return document.querySelectorAll('.votebutton');
};

export let getUserSystemButtons = function () {
    return {registerButton : document.querySelector('#register-button'),
        loginButton : document.querySelector('#login-button')
    };
};

export let getPlanetsTableBody = function () {
    return document.querySelector(".planet-table-body");
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
