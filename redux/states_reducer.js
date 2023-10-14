import { createSlice } from "@reduxjs/toolkit";
import { deleteLogin, getLogin, setLogin } from "../components/functions/storageMMKV";
import { storage } from "../game/common";
import { getMuteStorage, setMuteStorage } from "../game/storageFun";

const GameStatesReducer = createSlice({
    name: "GameStates",
    initialState: {
        mute: getMuteStorage(),
    },
    reducers: {
        setMute(state, action) {
            state.mute = action.payload
            // console.log('set', action.payload)
            setMuteStorage(action.payload)
        },

    },
});

export const { setMute } = GameStatesReducer.actions;
export default GameStatesReducer.reducer;
