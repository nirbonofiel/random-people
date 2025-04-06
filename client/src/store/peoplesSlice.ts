import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { People } from "../types/types";
import {
  fetchRandomPeoples as fetchRandomPeoplesAPI,
  removePeople as removePeopleAPI,
  fetchHistoryPeoples as fetchHistoryPeoplesAPI,
  updatePeople as updatePeopleAPI,
} from "../api/apiAction";

type PeopleState = {
  peoples: People[];
  historyPeoples: People[];
  loading: boolean;
  openDialog: boolean;
  currentPeople: People | undefined;
};

const initialState: PeopleState = {
  peoples: [],
  historyPeoples: [],
  loading: false,
  openDialog: false,
  currentPeople: undefined,
};

export const fetchRandomPeoples = createAsyncThunk(
  "peoples/fetchRandomPeoples",
  async () => {
    try {
      const data = await fetchRandomPeoplesAPI("/people");
      return data;
    } catch (error) {
      console.error("Error:", error);
    }
  }
);

export const fetchHistoryPeoples = createAsyncThunk(
  "peoples/fetchHistoryPeoples",
  async () => {
    try {
      const data = await fetchHistoryPeoplesAPI("/people/history");
      return data;
    } catch (error) {
      console.error("Error:", error);
    }
  }
);

export const deletePeople = createAsyncThunk(
  "peoples/deletePeople",
  async (id: string) => {
    await removePeopleAPI(`/people/${id}`);
    return id;
  }
);

export const updatePeople = createAsyncThunk(
  "peoples/updatePeople",
  async (updatedPerson: People) => {
    await updatePeopleAPI(`/people/${updatedPerson.id}`, updatedPerson);
    return updatedPerson;
  }
);

const peoplesSlice = createSlice({
  name: "peoples",
  initialState,
  reducers: {
    openDialogProfile(state, action) {
      state.openDialog = !state.openDialog;
      state.currentPeople = action.payload;
    },
    updateUnsavedPeople(state, action) {
      state.peoples = state.peoples.map((p) =>
        p.id === action.payload.id ? action.payload : p
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRandomPeoples.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRandomPeoples.fulfilled, (state, action) => {
        state.loading = false;
        state.peoples = action.payload;
      })
      .addCase(fetchHistoryPeoples.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHistoryPeoples.fulfilled, (state, action) => {
        state.loading = false;
        state.historyPeoples = action.payload;
      })
      .addCase(deletePeople.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePeople.fulfilled, (state, action) => {
        state.loading = false;
        state.historyPeoples = state.historyPeoples.filter(
          (person) => person.id !== action.payload
        );
      })
      .addCase(updatePeople.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePeople.fulfilled, (state, action) => {
        state.loading = false;
        state.historyPeoples = state.historyPeoples.map((person) =>
          person.id === action.payload.id ? action.payload : person
        );
      });
  },
});

export const { openDialogProfile, updateUnsavedPeople } = peoplesSlice.actions;
export default peoplesSlice.reducer;
