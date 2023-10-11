import { AnyAction, createSlice, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";

export interface GameDataState {
  theme: string;
  eventSignInPopup: any;
  Navbar: number;
}
const initialState: GameDataState = {
  theme: "default",
  Navbar: 1,

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
export const { resetGameDataState, setEventSignInPopup, setNavbar } =
  gameDataSlice.actions;
export default gameDataSlice.reducer;
