import React, { useState } from "react";

import {
	Button,
	Modal,
	Form,
	FloatingLabel,
	Nav,
	Col,
	Row,
	Container,
} from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";

import ListTask from "./ListTask";
import { add_task } from "../Redux/Actions/Actions";
import Task from "./Task";

import "./Styles/ManageTask.css";

const Managetask = () => {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [title, setTitle] = useState("");
	const [status, setStatus] = useState(false);
	const [imp, setImp] = useState("");
	const [desc, setDesc] = useState("");
	const [sort, setSort] = useState("all");

	const tasks = useSelector((state) => state);
	const dispatch = useDispatch();

	const handleTitle = (e) => {
		setTitle(e.target.value);
	};

	const handleDesc = (e) => {
		setDesc(e.target.value);
	};

	const handleSelect = (e) => {
		setImp(e.target.value);
	};

	const handleAdd = () => {
		const payload = {
			id: Math.floor(Math.random() * 1000),
			imp,
			title,
			status,
			desc,
		};
		if (title === "" || imp === "" || desc === "") {
			alert("Input is Empty");
		} else {
			dispatch(add_task(payload));
			setTitle("");
			setStatus(false);
			setImp("");
			setDesc("");
		}
	};

	return (
		<div>
			<br />
			<Button variant="primary" onClick={handleShow} className="add_btn">
				<FontAwesomeIcon
					icon={faPlus}
					color="white"
					className="plus_btn_icon"
				/>
			</Button>
			<br />
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Add a Task</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Select value={imp} onChange={handleSelect}>
						<option value="" disabled>
							Select
						</option>
						<option value="Primary">Primary</option>
						<option value="Secondary">Secondary</option>
						<option value="Warning">Important</option>
						<option value="Light">In the Morning</option>
						<option value="Dark">In the Evening</option>
					</Form.Select>
					<FloatingLabel controlId="floatingFormControl" label="Task Title">
						<Form.Control
							type="text"
							placeholder="Task Title"
							value={title}
							onChange={handleTitle}
						/>
					</FloatingLabel>

					<FloatingLabel controlId="floatingTextarea2" label="Description">
						<Form.Control
							as="textarea"
							placeholder="Task Description"
							value={desc}
							onChange={handleDesc}
							style={{ height: "100px" }}
						/>
					</FloatingLabel>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="primary"
						onClick={() => {
							handleAdd();
							handleClose();
						}}
					>
						Add
					</Button>
				</Modal.Footer>
			</Modal>
			<br />
			<div>
				<Nav className="justify-content-center ">
					<Nav.Item>
						<Nav.Link
							className="mng_links"
							eventKey="link-2"
							onClick={() => setSort("active")}
						>
							Active
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link
							className="mng_links"
							eventKey="link-3"
							onClick={() => setSort("completed")}
						>
							Completed
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link
							className="mng_links"
							eventKey="link-1"
							onClick={() => setSort("all")}
						>
							All
						</Nav.Link>
					</Nav.Item>
				</Nav>
			</div>
			<div className="task_card">
				{/* all tasks */}
				{sort === "all" && <ListTask />}
				{/* active tasks */}
				<Container>
					<Row>
						{tasks.length > 0 && sort === "active"
							? tasks.map((item) => {
									return (
										item.status === false && (
											<Col>
												<Task task={item} />
											</Col>
										)
									);
							  })
							: null}
					</Row>
				</Container>
				{/* completed tasks */}
				<Container>
					<Row>
						{tasks.length > 0 && sort === "completed"
							? tasks.map((item) => {
									return (
										item.status === true && (
											<Col>
												<Task task={item} />
											</Col>
										)
									);
							  })
							: null}
					</Row>
				</Container>
			</div>
		</div>
	);
};
export default Managetask;
