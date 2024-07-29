import React, { useEffect } from "react";
import { Alert, Button, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Footer from "../component/Footer";
import NavBar from "../component/Navbar";
import { useQuis } from "../context/QuisContext";
import { refreshPage } from "../utils/helpers";

export default function Dashboard({ isLogin }) {
	const navigate = useNavigate();
	const { user, updateUser, reset, expiryTimestamp, time, resumeQuis } =
		useQuis();

	useEffect(() => {
		if (!isLogin) navigate("/");
		else if (user.startQuis && user.endQuis == false)
			navigate(`/quis/${resumeQuis()}`);
	}, [isLogin]);

	const onLogout = () => {
		localStorage.removeItem("isLogin");
		reset();
		refreshPage();
	};

	const startQuis = () => {
		navigate("/quis/0");
		updateUser({ startQuis: true });
	};

	const retakeQuis = () => {
		navigate("/quis/0");
		updateUser({
			startQuis: true,
			endQuis: false,
			answer: {
				correct: 0,
				incorrect: 0,
				score: 0,
				count: 0,
			},
		});

		time.restart(expiryTimestamp);
	};

	return (
		<>
			<NavBar dashboard={true} event={onLogout} />
			<Container
				style={{
					display: "flex",
					justifyContent: "center",
					height: "80vh",
					alignItems: "center",
				}}
			>
				{user.endQuis ? (
					<Card className="custom-width">
						<Card.Header
							as="h5"
							className="text-center bg-secondary text-light"
						>
							SCORE
						</Card.Header>
						<Card.Body className="p-4">
							<Card.Title as="h1" className="d-flex justify-content-center">
								<Alert variant="success" className="py-4 px-5">
									{user.answer.score}
								</Alert>
							</Card.Title>
							<div className="d-flex justify-content-center flex-wrap">
								<Alert variant="light" className="mx-2">
									{`Correct : ${user.answer.correct}`}
								</Alert>
								<Alert variant="light" className="mx-2">
									{`Incorrect : ${user.answer.incorrect}`}
								</Alert>
								<Alert variant="light" className="mx-2">
									{`Answer : ${user.answer.count}`}
								</Alert>
							</div>
							<div className="text-end mt-5">
								<Button variant="primary" onClick={retakeQuis}>
									Retake Quis
								</Button>
							</div>
						</Card.Body>
					</Card>
				) : (
					<Card className="custom-width">
						<Card.Body className="p-4">
							<Card.Title>Take Quis</Card.Title>
							<Card.Text>
								Before taking the online quiz, make sure your device and
								internet connection are working properly. Cheer up !!!
							</Card.Text>
							<div className="text-end mt-5">
								<Button variant="primary" onClick={startQuis}>
									Start
								</Button>
							</div>
						</Card.Body>
					</Card>
				)}
			</Container>
			<Footer />
		</>
	);
}
