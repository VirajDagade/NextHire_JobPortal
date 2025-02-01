import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { Toaster } from "./components/ui/sonner.jsx";
import store from "./redux/store.js";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

const persistor = persistStore(store);
// This function comes from the redux-persist library. Its job is to "observe" the store and enable persistence by saving and restoring the state automatically.

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      {/* This is a React component provided by the redux-persist library. It wraps your app's main content and ensures that the persisted state is restored (rehydrated) before rendering the application.

      loading={null}:

      This prop defines what should be shown while the persisted state is being loaded from storage.
      
      Setting it to null means nothing will be displayed during this time. You can customize it (e.g., show a loading spinner or message) if needed. */}
      <PersistGate loading={null} persistor={persistor}>
        <Toaster position="bottom-right" />
        <App />
      </PersistGate>
    </Provider>
    <Toaster />
  </StrictMode>
);
