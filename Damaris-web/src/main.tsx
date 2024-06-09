import React from "react";
//import React, { useState } from "react";
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
import { createContext } from 'react';
import getSentimentScore from "@/Domain/Sentiment/textSentimentAnalysis";

interface UserReply {
	Reply: string;
	Sentiment: number;
}

interface ReplyContext {
	userReplies: UserReply[];
    handleAddUserReply: (reply : string) => void;
    handleClearUserReply: () => void;
}

export const UserRepliesContext = createContext<ReplyContext | null>(null);

const userReplies : UserReply[] = [];

const handleClearUserReply = () => {
	userReplies.splice(0, userReplies.length);

}

const handleAddUserReply = async (reply : string) => {
	const score = await getSentimentScore(reply);

	userReplies.push({
		Reply: reply,
        Sentiment: score!,
	});
	console.log("userReplies", userReplies);
};

const userRepliesContextValue = {
	userReplies,
    handleAddUserReply,
    handleClearUserReply,
}

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
		<UserRepliesContext.Provider value={userRepliesContextValue}>
			<RouterProvider router={router} />
		</UserRepliesContext.Provider>
	</React.StrictMode>
);
