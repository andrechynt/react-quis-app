import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../component/Footer";
import NavBar from "../component/Navbar";
import { useQuis } from "../context/QuisContext";

export default function Quis() {
	let { id } = useParams();
	const navigate = useNavigate();
	const { user, updateUser, questions, result, time, resumeQuis } = useQuis();
	const [number, setNumber] = useState(parseInt(id));
	const [isChecked, setCheked] = useState(false);
	const [answer, setAnswer] = useState("");
	const [question, setQuestion] = useState(questions[number]);

	useEffect(() => {
		user.startQuis == false && navigate("dashboard");

		user.startQuis == true &&
			user.endQuis == false &&
			navigate(`/quis/${resumeQuis()}`);

		setNumber(parseInt(id));
		setQuestion(questions[parseInt(id)]);
		setCheked(false);
	}, [id]);

	const answers = (correct, incorrect) => {
		return (
			<Form className="my-4">
				{incorrect.map((item, index) => (
					<div key={index} className="mb-3">
						<Form.Check
							type="radio"
							id="default-radio"
							label={item}
							name="choice"
							value={item}
							onChange={handleRadioButton}
							checked={answer === item}
						/>
					</div>
				))}
				<div className="mb-3">
					<Form.Check
						type="radio"
						id="default-radio"
						label={correct}
						value={correct}
						name="choice"
						onChange={handleRadioButton}
						checked={answer === correct}
					/>
				</div>
			</Form>
		);
	};

	const submitQuestion = () => {
		result(answer, number, isChecked);

		if (number + 1 < questions.length) {
			navigate(`/quis/${number + 1}`);
		} else {
			updateUser({ startQuis: false, endQuis: true });
			navigate("/dashboard");
		}
	};

	const listQuestion = (index) => {
		let btnStyle = "";

		if (index == number) btnStyle = "outline-success";
		else if (index < number) btnStyle = "success";
		else btnStyle = "outline-secondary";

		return <Button variant={btnStyle}>{index + 1}</Button>;
	};

	const buttonSubmit = (number) => {
		return (
			<Button variant="primary" onClick={submitQuestion}>
				{number + 1 <= questions.length ? ">" : "Finish"}
			</Button>
		);
	};

	const handleRadioButton = (event) => {
		setAnswer(event.target.value);
		setCheked(event.target.checked);
	};

	return (
		<>
			<NavBar
				quis={true}
				timer={{ minutes: time.minutes, seconds: time.seconds }}
			/>
			<Container
				style={{
					display: "flex",
					justifyContent: "center",
					minHeight: "80vh",
					maxHeight: "100vh",
					alignItems: "center",
				}}
			>
				<Card className="custom-width">
					<Card.Header className="p-4">
						<h4 className="mb-0">{`Question ${number + 1}`}</h4>
					</Card.Header>
					<Card.Body className="p-4">
						<Card.Title className="text-break mb-0">{question.question}</Card.Title>
						{answers(question.correct_answer, question.incorrect_answers)}
						<div className="text-end">{buttonSubmit(number + 1)}</div>
					</Card.Body>
					<Card.Footer className="text-muted p-4">
						<Row className="g-3">
							{questions.length &&
								questions.map((item, index) => (
									<Col key={index} sm="auto" md="auto">
										{listQuestion(index)}
									</Col>
								))}
						</Row>
					</Card.Footer>
				</Card>
			</Container>
			<Footer />
		</>
	);
}
