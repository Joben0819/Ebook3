import { AnyAction, createSlice, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { AddedBooks, Authored, Books } from "@/api";
import { Authors } from "@/api/type";

export interface GameDataState {
  theme: string;
  eventSignInPopup: any;
  Navbar: number;
  Navbar2: number;
  Modal: number;
  Response: any;
  Chapter: string;
  Userdata: any;
  AddedBook: any;
  Bookshelf: any;
  Author: Authors | "";
}
const initialState: GameDataState = {
  theme: "default",
  Navbar: 1,
  Navbar2: 1,
  Modal: 1,
  Response: [],
  Chapter: "",
  Userdata: [],
  AddedBook: [],
  Bookshelf: [],
  Author: "",

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
    setNavbar2: (state, action) => {
      state.Navbar2 = action.payload;
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
    setAuthor: (state, action) => {
      state.Author = action.payload;
    },
    setBookshelf: (state, action) => {
      state.Bookshelf = action.payload;
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
  setNavbar2,
  setResponse,
  setChapter,
  setUserdata,
  setAddedBook,
  setAuthor,
  setBookshelf,
} = gameDataSlice.actions;
export default gameDataSlice.reducer;

export const AddBooked = (
  name: string,
  id: string
): ThunkAction<void, RootState, null, AnyAction> => {
  return (dispatch) => {
    AddedBooks({ name, id }).then((res: any) => {
      if (res?.data?.data === "None") {
        dispatch(setAddedBook([]));
      } else {
        dispatch(setAddedBook(res?.data[0]?.Books));
      }
    });
  };
};

export const Book = (): ThunkAction<void, RootState, null, AnyAction> => {
  return (dispatch) => {
    Books({}).then((res) => {
      dispatch(setBookshelf(res?.data));
    });
  };
};

export const Authoreds = (
  name: string
): ThunkAction<void, RootState, null, AnyAction> => {
  return (dispatch) => {
    Authored({ username: name }).then((res: any) => {
      dispatch(setAuthor(res?.data?.username));
    });
  };
};
