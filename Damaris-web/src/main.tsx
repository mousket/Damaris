import React from "react";
import ReactDOM from "react-dom/client";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import "./index.css";
import MainLayout from "./pages/MainLayout";
import ShippingForm from "./pages/ShippingForm";
import IntentForm from "./pages/IntentForm";
import AudioIntent from "./pages/AudioIntent";
import AudioShipping from "./pages/AudioShipping";
import CarrerChoice from "./pages/CarrerChoice";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<MainLayout />}>
			<Route index element={<IntentForm />} />
			<Route path="/shipform" element={<ShippingForm />} />
			<Route path="/audio" element={<AudioIntent />} />
			<Route path="/audioshipping" element={<AudioShipping />} />
			<Route path="/carrerchoice" element={<CarrerChoice />} />
		</Route>
	)
);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
