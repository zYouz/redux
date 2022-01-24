import React from "react";
import { useSelector } from "react-redux";
import Task from "./Task";
import { Col, Container, Row } from "react-bootstrap";
const ListTask = () => {
	const tasks = useSelector((state) => state);

	return (
		<div>
			<Container>
				<Row>
					{tasks.map((task, index) => {
						return (
							<Col key={index}>
								<Task task={task} />
							</Col>
						);
					})}
				</Row>
			</Container>
		</div>
	);
};
export default ListTask;
