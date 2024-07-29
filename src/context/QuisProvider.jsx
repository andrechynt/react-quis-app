/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";
import { userData } from "../data/user";
import { initialTimer, refreshPage } from "../utils/helpers";
import { QuisContext } from "./QuisContext";

export const QuisProvider = ({ children }) => {
	const [user, setUser] = useState(
		JSON.parse(localStorage.getItem("user")) || null
	);
	const [questions, setQuestions] = useState(
		JSON.parse(localStorage.getItem("quis")) || []
	);

	useEffect(() => {
		if (user == null && questions.length == 0) {
			setUser(userData);
			localStorage.setItem("user", JSON.stringify(userData));
			fetchQuis();
		}

		localStorage.setItem("user", JSON.stringify(user));
	}, [user]);

	const fetchQuis = async () => {
		try {
			const result = await fetchWithExponentialBackoff(
				"https://opentdb.com/api.php?amount=5"
			);

			setQuestions(result.results);
			localStorage.setItem("quis", JSON.stringify(result.results));
		} catch (error) {
			console.log(error);
		}
	};

	const fetchWithExponentialBackoff = async (
		url,
		retries = 5,
		delay = 1000
	) => {
		try {
			const response = await fetch(url);
			if (response.status === 429) {
				throw new Error("Rate limit exceeded");
			}
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			return await response.json();
		} catch (error) {
			if (retries > 0) {
				await new Promise((resolve) => setTimeout(resolve, delay));
				return fetchWithExponentialBackoff(url, retries - 1, delay * 2);
			} else {
				throw error;
			}
		}
	};

	const resumeQuis = () => {
		const getPage = user.answer.incorrect + user.answer.correct;
		return getPage.toString();
	};

	const updateUser = (update) => {
		setUser((prev) => ({ ...prev, ...update }));
	};

	const result = (answer, number, isAnswer) => {
		if (answer === questions[number].correct_answer) {
			setUser((prev) => ({
				...prev,
				answer: {
					...prev.answer,
					correct: prev.answer.correct + 1,
					score: prev.answer.score + 20,
					count: isAnswer ? prev.answer.count + 1 : prev.answer.count,
				},
			}));
		} else {
			setUser((prev) => ({
				...prev,
				answer: {
					...prev.answer,
					incorrect: prev.answer.incorrect + 1,
					count: isAnswer ? prev.answer.count + 1 : prev.answer.count,
				},
			}));
		}
	};

	const reset = () => {
		setUser((prev) => ({
			...prev,
			startQuis: false,
			endQuis: false,
			answer: {
				...prev.answer,
				correct: 0,
				incorrect: 0,
				score: 0,
				count: 0,
			},
		}));
	};

	const expiryTimestamp = initialTimer();

	const {
		totalSeconds,
		seconds,
		minutes,
		hours,
		days,
		isRunning,
		start,
		pause,
		resume,
		restart,
	} = useTimer({
		expiryTimestamp,
		onExpire: () => {
			setUser((prev) => ({
				...prev,
				startQuis: false,
				endQuis: true,
				answer: {
					...prev.answer,
					incorrect: questions.length - prev.answer.count,
				},
			}));

			refreshPage();
		},
	});

	const time = { minutes, seconds, restart, pause, resume, isRunning, start };

	return (
		<QuisContext.Provider
			value={{
				user,
				updateUser,
				questions,
				result,
				reset,
				expiryTimestamp,
				time,
				resumeQuis,
			}}
		>
			{children}
		</QuisContext.Provider>
	);
};
