import {loadSwApi} from "./get-api.js";
import {getNavigationButtons, getPlanetsTable} from "./get-dom-elements.js";
import {resetPlanetsTable} from "./dom-manipulation.js";

export function changePages() {
    let navigationButtons = getNavigationButtons();

    Object.values(navigationButtons).forEach(function (button) {
        button.addEventListener('click', () => changePage(navigationButtons))
    });
}

export let setButtonUrl = function(buttons, data) {
    buttons.nextButton.dataset.nextPage = data.next;
    buttons.previousButton.dataset.previousPage = data.previous;
};

let changePage = function (navigationButtons) {
    resetPlanetsTable();
    if (event.target == navigationButtons.nextButton){
        loadSwApi(navigationButtons.nextButton.dataset.nextPage)
    } else if (event.target == navigationButtons.previousButton){
        loadSwApi(navigationButtons.previousButton.dataset.previousPage)
    }
};
