import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import "././styles/customBreakpoints.css";
import App from "./App.jsx";
import { QuisProvider } from "./context/QuisProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<QuisProvider>
			<App />
		</QuisProvider>
	</React.StrictMode>
);
