import {changeLoginRegisterModal} from './user-system.js';
import {loadSwApi} from "./get-api.js";
import {changePages} from "./change-pages.js";

let main = function(){
    changePages();
    loadSwApi();
    changeLoginRegisterModal();
};

main();
