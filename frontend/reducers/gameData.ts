import { AnyAction, createSlice, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { AddedBooks } from "@/api";

export interface GameDataState {
  theme: string;
  eventSignInPopup: any;
  Navbar: number;
  Modal: number;
  Response: any;
  Chapter: any;
  Userdata: any;
  AddedBook: any;
}
const initialState: GameDataState = {
  theme: "default",
  Navbar: 1,
  Modal: 1,
  Response: [],
  Chapter: [],
  Userdata: [],
  AddedBook: [],

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
    setAddedBook: (state, action) => {
      state.AddedBook = action.payload;
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
  setAddedBook,
} = gameDataSlice.actions;
export default gameDataSlice.reducer;

export const AddBooked = (
  name: string,
  id: number
): ThunkAction<void, RootState, null, AnyAction> => {
  return (dispatch) => {
    AddedBooks({ name, id }).then((res: any) => {
      if (res.data.data === "None") {
        dispatch(setAddedBook([]));
      } else {
        dispatch(setAddedBook(res.data[0].Books));
      }
    });
  };
};
