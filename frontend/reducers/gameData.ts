import { AnyAction, createSlice, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";

export interface GameDataState {
  theme: string;
  eventSignInPopup: any;
  Navbar: number;
  Modal: number;
  Response: any;
  Chapter: any;
  Userdata: any;
}
const initialState: GameDataState = {
  theme: "default",
  Navbar: 1,
  Modal: 1,
  Response: [],
  Chapter: [],
  Userdata: [],

  eventSignInPopup: {},
};
const gameDataSlice = createSlice({
  name: "gameData",
  initialState,
  reducers: {
    resetGameDataState: () => {
      return initialState;
    },
    setEventSignInPopup: (state, action) => {
      state.eventSignInPopup = action.payload;
    },
    setNavbar: (state, action) => {
      state.Navbar = action.payload;
    },
    setModal: (state, action) => {
      state.Modal = action.payload;
    },
    setResponse: (state, action) => {
      state.Response = action.payload;
    },
    setChapter: (state, action) => {
      state.Chapter = action.payload;
    },
    setUserdata: (state, action) => {
      state.Userdata = action.payload;
    },
  },
});
// ---- Getters ---- //
// language
export const selectDefaultLanguage = (state: any) => {
  const defaultLanguage = state.gameData.languagesItems.find(
    (language: any) => language.is_default
  );
  return defaultLanguage || null;
};
export const {
  resetGameDataState,
  setEventSignInPopup,
  setModal,
  setNavbar,
  setResponse,
  setChapter,
  setUserdata,
} = gameDataSlice.actions;
export default gameDataSlice.reducer;
