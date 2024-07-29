import React, { useEffect, useState } from "react";
import {
	Alert,
	Button,
	Card,
	Container,
	FloatingLabel,
	Form,
	Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useQuis } from "../context/QuisContext";

export default function Login({ isLogin, auth }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [visible, setVisible] = useState(false);
	const [err, setErr] = useState(false);
	const navigate = useNavigate();
	const { user } = useQuis();
	const [validated, setValidated] = useState(false);

	useEffect(() => {
		isLogin && navigate("/dashboard");
	}, [isLogin]);

	const onChangeEmail = (e) => setEmail(e.target.value);

	const onChangePassword = (e) => setPassword(e.target.value);

	const authenticated = (event) => {
    event.preventDefault();

		if (email === user.email && password === user.password) {
			setVisible(true);

			setTimeout(() => {
				auth(true);
				setVisible(false);
				setEmail("");
				setPassword("");
			}, 1000);
		} else {
			setErr(true);
			setEmail("");
			setPassword("");
		}
	};

	const handleSubmit = (event) => {
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}

		setValidated(true);
		authenticated(event);
	};

	return (
		<Container
			style={{
				display: "flex",
				justifyContent: "center",
				height: "100vh",
				alignItems: "center",
			}}
		>
			<Card className="custom-width p-4">
				<Card.Title className="text-center mb-4">QUIz</Card.Title>
				<Form validated={validated} onSubmit={handleSubmit}>
					<FloatingLabel
						controlId="floatingInput"
						label="Email address"
						className="mb-3"
					>
						<Form.Control
							type="email"
							placeholder="name@example.com"
							onChange={onChangeEmail}
							value={email}
							required
						/>
					</FloatingLabel>
					<FloatingLabel controlId="floatingPassword" label="Password">
						<Form.Control
							type="password"
							placeholder="Password"
							onChange={onChangePassword}
							value={password}
							required
						/>
					</FloatingLabel>
					<div className="text-end mt-4">
						<Button variant="primary" type="submit">
							{visible ? (
								<Spinner
									as="span"
									animation="border"
									size="sm"
									role="status"
									aria-hidden="true"
								/>
							) : (
								"Login"
							)}
						</Button>
					</div>
				</Form>
				{err && (
					<Alert variant="danger" className="mt-4">
						Email and password doesnt match !!!
					</Alert>
				)}
			</Card>
		</Container>
	);
}
