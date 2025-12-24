import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DashboardState {
  selectedWidgetId: string | null;
}

const initialState: DashboardState = {
  selectedWidgetId: null
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    selectWidget(state, action: PayloadAction<string>) {
      state.selectedWidgetId = action.payload;
    }
  }
});

export const { selectWidget } = dashboardSlice.actions;
export default dashboardSlice.reducer;
