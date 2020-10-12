import {getPlanetsTable, getUserSystemButtons, getModalDomElements} from "./get-dom-elements.js";

export let insertRowData = function (data) {
    let {name, height, mass, hair_color, skin_color, eye_color, birth_year, gender} = data;
    return `<tr>
        <td class="residenta-name">${name}</td>
        <td>${height}</td>
        <td>${mass}</td>
        <td>${hair_color}</td>
        <td>${skin_color}</td>
        <td>${eye_color}</td>
        <td>${birth_year}</td>
        <td>${gender}</td>
    </tr>`
};

export let createVotingStatisticsTable = function (voteStatictics) {
    let modal = getModalDomElements();
    modal.modalText.innerHTML = `
        <table class="table table-bordered table-responsive planets-voting-table">
          <thead>
            <tr>
              <th scope="col">Planet name</th>
              <th scope="col">Vote count</th>
            </tr>
          </thead>
          <tbody class="planet-table-body">
            ${insertVotingStatictisToTable(voteStatictics)}
          </tbody>
        </table>
    `;
    modal.modalTitle.innerHTML = 'Voting statistics';
};

let insertVotingStatictisToTable = function (voteStatictics) {
    let tableRow = '';
    for (let [key, value] of Object.entries(voteStatictics)) {
        tableRow += `<tr>
                      <td>${key}</td>
                      <td>${value}</td>
                    </tr>`
    }
    return tableRow
};

export let createPlanetsTable = function (output, statusCode) {
    let button = createVoteButton(output, statusCode);
    return `<tr data-planet-name="${output.name}">
        <td scope="row">${output.name}</td>  
        <td scope="row">${output.diameter}</td>
        <td scope="row">${output.climate}</td>
        <td scope="row">${output.terrain}</td>
        <td scope="row">${writePercentageSign(output.surface_water)}</td>
        <td scope="row" class="people-output">${writePopulation(output.population)}</td>
        <td scope="row">${showResidentButton(output)}</td>
        <td scope="row">${button}</td>
    </tr>`
};

let writePercentageSign = function (surfaceWaterPercentage) {
    if (surfaceWaterPercentage != 'unknown') {
        return surfaceWaterPercentage + "%";
    } else {
        return 'unknown'
    }
};

let writePopulation = function (population) {
    if (population != 'unknown') {
        return population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' people'
    } else {
        return 'unknown'
    }
};

let getPlanetId = function (planetData) {
    let planetId = planetData.url.split('/');
    planetId = planetId.pop() || planetId.pop();
    return planetId
};

let createVoteButton = function (output, isLogged) {
    let planetId = getPlanetId(output);

    if (isLogged === 200) {
        return `<button type="button" name="vote-button" class="votebutton btn btn-light btn-outline-secondary" 
                data-planet-id="${planetId}" data-planet-name="${output.name}">Vote</button>`
    } else {
        return `<button disabled type="button" name="vote-button" class="votebutton btn btn-dark btn-outline-dark" 
                data-planet-id="${planetId}" data-planet-name="${output.name}">Log in to Vote!</button>`
    }
};

let showResidentButton = function (planets) {
    let residentsCount = planets.residents.length;
    if (residentsCount == 0) {
        return 'No known residents'
    } else {
        return `<button type="button" class="btn btn-light btn-outline-dark btn-block resident-button" data-toggle="modal"
            data-target="#apiwars-modal" data-residents="${planets.name}"><span>${residentsCount} resident(s)</span></button>`
    }
};

export let resetPlanetsTable = function () {
    let planetsTable = getPlanetsTable();
    planetsTable.innerHTML = `<thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Diameter</th>
              <th scope="col">Climate</th>
              <th scope="col">Terrain</th>
              <th scope="col">Surface Water Percentage</th>
              <th scope="col">Population</th>
              <th scope="col">Residents</th>
              <th scope="col" style="width: 100px;"></th>
            </tr>
          </thead>
          <tbody class="planet-table-body"></tbody>`
};

export let changeButtonAfterSuccessfulVote = function (data, button) {
    button.innerHTML = "Voted";
    button.classList.remove('btn-light');
    button.style.color = 'white';
    button.style.backgroundColor = 'green';
    button.disabled = true;
};

export let changeButtonAfterFailedVote = function (data, button) {
    button.innerHTML = "Error";
    button.classList.remove('btn-light');
    button.style.color = 'white';
    button.style.backgroundColor = '#db5621';
    button.disabled = true;
};