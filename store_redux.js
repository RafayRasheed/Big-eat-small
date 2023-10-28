const { configureStore } = require("@reduxjs/toolkit");
import states_reducer from './redux/states_reducer';


const storeRedux = configureStore({
    reducer: {

        GameStates: states_reducer,

    }
})

export default storeRedux