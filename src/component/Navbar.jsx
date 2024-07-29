import React from "react";
import { Button, Container, Form, Navbar } from "react-bootstrap";

export default function NavBar({ dashboard, event, quis, timer, username }) {
	return (
		<Navbar expand="lg" className="bg-body-tertiary">
			<Container className="py-3">
				<Navbar.Brand href="#">QUIz</Navbar.Brand>
				{dashboard && (
					<Form className="d-flex">
						<Navbar.Text>
							Signed in as: <a href="#">{username}</a>
						</Navbar.Text>
						<Button variant="outline-danger" className="ms-4" onClick={event}>
							Logout
						</Button>
					</Form>
				)}

				{quis && (
					<div className="d-flex">
						<h4 className="text-secondary mb-0">{`${timer.minutes} : ${timer.seconds}`}</h4>
					</div>
				)}
			</Container>
		</Navbar>
	);
}
