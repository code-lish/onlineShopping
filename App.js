import { StatusBar } from "expo-status-bar";
import Navigation from "./src/navigation";

import { Provider } from "react-redux";
import { store } from "./src/app/store";

const App = () => {
  return (
    <Provider store={store}>
      <Navigation />
      <StatusBar style="light" backgroundColor="#111827" />
    </Provider>
  );
};

export default App;
