import React, { useState } from "react";
import { ThemeProvider } from "react-bootstrap";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Quis from "./pages/Quis";

function App() {
	const [auth, setAuth] = useState(localStorage.getItem("isLogin") || false);

	const handleAuth = (status) => {
		setAuth(status);
		localStorage.setItem("isLogin", JSON.stringify(status));
	};

	const Routes = createBrowserRouter([
		{
			path: "/",
			element: <Login isLogin={auth} auth={handleAuth} />,
		},
		{
			path: "/dashboard",
			element: <Dashboard isLogin={auth} />,
		},
		{
			path: "/quis/:id",
			element: <Quis />,
		},
	]);

	return (
		<ThemeProvider
			breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm"]}
			minBreakpoint="sm"
		>
			<RouterProvider router={Routes} />
		</ThemeProvider>
	);
}

export default App;
