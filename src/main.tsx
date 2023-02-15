import { BrowserRouter } from "react-router-dom";
import { auth } from "./firebase";
import "./index.css";
import ReactDOM from "react-dom/client";
import App from "./App";
import AuthProvider from "./provider/AuthProvider";

console.log(auth);

ReactDOM.createRoot(document.getElementById("app") as HTMLElement).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>,
);
