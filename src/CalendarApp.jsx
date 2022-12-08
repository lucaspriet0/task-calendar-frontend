import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { RouterApp } from "./router/RouterApp";
import { store } from "./store/store";

export const CalendarApp = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <RouterApp />
      </BrowserRouter>
    </Provider>
  );
};
