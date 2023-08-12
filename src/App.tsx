import { AppProvider } from "./providers/app";
import Home from "./page/Home";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <AppProvider>
      <Home></Home>
      <Toaster position="top-center" reverseOrder={false} />
    </AppProvider>
  );
}

export default App;
