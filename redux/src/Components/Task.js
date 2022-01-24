import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
	remove_task,
	update_task,
	completed_task,
} from "../Redux/Actions/Actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCheckCircle,
	faTrashAlt,
	faEdit,
} from "@fortawesome/free-regular-svg-icons";
import { faCheckCircle as faCheckCircleSolid } from "@fortawesome/free-solid-svg-icons";
import { Card, Modal, Form, Button, FloatingLabel } from "react-bootstrap";
import "./Styles/Task.css";
const Task = ({ task }) => {
	const tasks = useSelector((state) => state);
	const dispatch = useDispatch();

	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [title, setTitle] = useState("");
	const [imp, setImp] = useState("");
	const [desc, setDesc] = useState("");

	const handleTitle = (e) => {
		setTitle(e.target.value);
	};

	const handleDesc = (e) => {
		setDesc(e.target.value);
	};

	const handleSelect = (e) => {
		setImp(e.target.value);
	};

	const handleUpdate = () => {
		const payload = {
			imp,
			title,
			desc,
		};
		dispatch(update_task(payload));
		console.log(payload);
		console.log(tasks);
	};

	return (
		<div>
			<Card
				bg={task.imp.toLowerCase()}
				text={task.imp.toLowerCase() === "light" ? "dark" : "white"}
				style={{ width: "18rem" }}
				className="mb-2"
			>
				<Card.Body>
					<Card.Title>{task.title} </Card.Title>
					<Card.Text>
						{task.status && task.status ? (
							<button
								className="manage_btn"
								onClick={() => {
									dispatch(completed_task(task));
								}}
							>
								<FontAwesomeIcon
									icon={faCheckCircleSolid}
									color="green"
									size="2x"
								/>
							</button>
						) : (
							<button
								className="manage_btn"
								onClick={() => {
									dispatch(completed_task(task));
								}}
							>
								<FontAwesomeIcon icon={faCheckCircle} color="green" size="2x" />
							</button>
						)}
						{task.desc}
						<br />
						<button
							className="manage_btn"
							onClick={() => {
								dispatch(remove_task(task));
							}}
						>
							<FontAwesomeIcon icon={faTrashAlt} color="red" size="2x" />
						</button>

						<button
							className="manage_btn"
							onClick={() => {
								handleShow();
							}}
						>
							<FontAwesomeIcon icon={faEdit} color="black" size="2x" />
						</button>
						<br />

						<Modal show={show} onHide={handleClose}>
							<Modal.Header closeButton>
								<Modal.Title>Modal heading</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<Form.Select defaultValue={task.imp} onChange={handleSelect}>
									<option value="" disabled>
										Select
									</option>
									<option value="Primary">Primary</option>
									<option value="Secondary">Secondary</option>
									<option value="Warning">Important</option>
									<option value="Light">Morning</option>
									<option value="Dark">night</option>
								</Form.Select>
								<FloatingLabel
									controlId="floatingFormControl"
									label="Task Title"
								>
									<Form.Control
										type="text"
										placeholder="Task Title"
										defaultValue={task.title}
										onChange={handleTitle}
									/>
								</FloatingLabel>

								<FloatingLabel
									controlId="floatingTextarea2"
									label="Description"
								>
									<Form.Control
										as="textarea"
										placeholder="Task Description"
										defaultValue={task.desc}
										onChange={handleDesc}
										style={{ height: "100px" }}
									/>
								</FloatingLabel>
							</Modal.Body>
							<Modal.Footer>
								<Button
									variant="primary"
									onClick={() => {
										handleUpdate();
										handleClose();
									}}
								>
									Update
								</Button>
							</Modal.Footer>
						</Modal>
					</Card.Text>
				</Card.Body>
			</Card>
		</div>
	);
};

export default Task;
