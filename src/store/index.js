import { createStore } from "vuex";
import menu from './menu.module'

const store = createStore({
    modules: {
        menu,
    },
});

export default store;

