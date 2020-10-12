import {
    getModalDomElements,
    getNavigationButtons,
    getPlanetsTableBody,
    getResidentStatisticsButton,
    getResidentTableBody,
    getResidentTableHeaders,
    getVoteButtons,
    getVoteStaticticsNavItem
} from "./get-dom-elements.js";
import {
    changeButtonAfterFailedVote,
    changeButtonAfterSuccessfulVote,
    createPlanetsTable,
    createVotingStatisticsTable,
    insertRowData
} from "./dom-manipulation.js";
import {setButtonUrl} from "./change-pages.js";

export function loadSwApi(planetPage = "https://swapi.dev/api/planets") {
    let voteStaticticsButton = getVoteStaticticsNavItem();
    voteStaticticsButton.addEventListener('click', () => ajaxDisplayVote());

    getSwApi(planetPage);
}

let addVoteEvent = function () {
    let voteButtons = getVoteButtons();
    for (let button of voteButtons) {
        button.addEventListener('click', () => ajaxVote(button))
    }
};

let ajaxDisplayVote = function () {
    fetch('/vote')
        .then(response => response.json())
        .then(data => createVotingStatisticsTable(data))
        .catch(err => console.log(err))
};

let ajaxVote = function (button) {
    let buttons = getVoteButtons();
    let planetNamesArray = [];
    for (let b of buttons) {
        planetNamesArray.push(b.dataset.planetName)
    }
    let voteUrlParams = {
        planetId: button.dataset.planetId,
        planetName: button.dataset.planetName,
        planetNameList: JSON.stringify(planetNamesArray,)
    };
    console.log(voteUrlParams.planetId);
    console.log(voteUrlParams.planetName);

    let url = '/Home/VoteToPlanet?' + 'planetId=' + voteUrlParams.planetId + '&planetName=' + voteUrlParams.planetName;

    fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => {
            if (response.status === 200)
                changeButtonAfterSuccessfulVote(response, button);
            else
                changeButtonAfterFailedVote(response, button)
        })
};

let downloadPlanetApiData = function (planetPage) {
    sessionStorage.removeItem(planetPage);

    fetch(planetPage, {mode: 'cors'})
        .then(response => response.json())
        .then(data => sessionStorage.setItem(planetPage, JSON.stringify(data)))
        .catch(err => console.log(err));
};

let fetchPlanetData = async function (planetPage, buttons) {
    let isLogged = await isUserLogged();
    console.log(isLogged)
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    fetch(proxyurl + planetPage)
        .then((response) => response.json())
        .then(data => {
            sessionStorage.setItem(planetPage, JSON.stringify(data));

            setButtonUrl(buttons, data);

            data.results.forEach(function (output) {
                let tableBody = getPlanetsTableBody();
                tableBody.insertAdjacentHTML('beforeend', createPlanetsTable(output, isLogged.status))
            });
            addEventListenersToResidentButton()
        })
        .then(() => enableNavigationButtons(buttons))
        .then(() => addVoteEvent())
        .then(() => downloadNeighboringPagesApi(buttons))
        .catch(err => console.log(err));
};

let downloadNeighboringPagesApi = function (buttons) {
    if (buttons.nextButton.dataset.nextPage != 'null') {
        downloadPlanetApiData(buttons.nextButton.dataset.nextPage.replace("http://", "https://"));
    }
    if (buttons.previousButton.dataset.previousPage != 'null') {
        downloadPlanetApiData(buttons.previousButton.dataset.previousPage.replace("http://", "https://"));
    }
};

let isUserLogged = async function () {
    return await fetch('/Home/IsUserLogged', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'GET',
    });
}

let getSwApi = async function (planetPage) {
    let isLogged = await isUserLogged();
    console.log(isLogged)

    let buttons = getNavigationButtons();
    disableNavigationButtons(buttons);

    if (sessionStorage.getItem(planetPage)) {
        let data = JSON.parse(sessionStorage.getItem(planetPage));

        setButtonUrl(buttons, data);

        data.results.forEach(function (output) {
            let tableBody = getPlanetsTableBody();
            tableBody.insertAdjacentHTML('beforeend', createPlanetsTable(output, isLogged.status))
        });
        addEventListenersToResidentButton();
        addVoteEvent();
        enableNavigationButtons(buttons);
        downloadNeighboringPagesApi(buttons);
    } else {
        fetchPlanetData(planetPage, buttons);
    }
};

let disableNavigationButtons = function (buttons) {
    buttons.nextButton.disabled = true;
    buttons.previousButton.disabled = true;
};

let enableNavigationButtons = function (buttons) {
    if (buttons.nextButton.dataset.nextPage != 'null') {
        buttons.nextButton.disabled = false;
    }
    if (buttons.previousButton.dataset.previousPage != 'null') {
        buttons.previousButton.disabled = false;
    }
};

let addEventListenersToResidentButton = function () {
    let resident_buttons = getResidentStatisticsButton();
    for (let button of resident_buttons) {
        button.addEventListener('click', () => loadResidentApi(button))
    }
};

let loadResidentTableHeaders = function (modalForm) {
    modalForm.modalText.innerHTML = `<table class="table table-bordered resident-data"><tr class="resident-headers"></tr></table>`;
    const headers = ['Name', 'Height', 'Mass', 'Hair color', 'Skin color', 'Eye color', 'Birth year', 'Gender'];
    let tableHeader = getResidentTableHeaders();
    headers.forEach(function (header) {
        tableHeader.innerHTML += `<th>${header}</th>`
    });
};

let loadResidentApi = function (button) {
    let modalForm = getModalDomElements();
    loadResidentTableHeaders(modalForm);


    let planetName = button.dataset.residents;
    modalForm.modalConfirm.style.visibility = "hidden";
    modalForm.modalTitle.innerHTML = 'Residents of ' + planetName;

    fetch(`https://swapi.dev/api/planets/?search=${planetName}`, {mode: 'cors'})
        .then((response) => response.json())
        .then((data) => createResidentTable(data, planetName))
};

let createResidentTable = function (data, planetName) {
    let residentUrl = data.results[0].residents;
    fetchResidentsData(planetName, residentUrl)
};

let fetchResidentsData = function (planetName, residentsUrl) {
    let residentsArray = [];

    if (planetName in sessionStorage) {
        let residents = JSON.parse(sessionStorage[planetName]);
        for (let resident of residents) {
            insertResidentDataToTable(resident)
        }
    } else {
        for (let resident of residentsUrl) {
            fetch(resident, {mode: 'cors'})
                .then((response) => response.json())
                .then(data => {
                    residentsArray.push(data);
                    insertResidentDataToTable(data);
                })
                .then(() => {
                    sessionStorage.setItem(planetName, JSON.stringify(residentsArray));
                })
        }
    }
};

let insertResidentDataToTable = function (data) {
    let residentTableBody = getResidentTableBody();
    residentTableBody.innerHTML += insertRowData(data);
};
