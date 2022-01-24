import {
	ADD_TASK,
	REMOVE_TASK,
	UPDATE_TASK,
	COMPLETED_TASK,
} from "../Actions/ActionsTypes";
const initialState = [];
const taskReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_TASK:
			state.push(action.payload);
			return state;

		case REMOVE_TASK:
			return state.filter((task) => task !== action.payload);

		case UPDATE_TASK:
			state.map((todo) => {
				return todo.id === action.payload.id
					? {
							...todo,
							title: action.payload.title,
					  }
					: todo;
			});
			break;

		case COMPLETED_TASK:
			return state.map((task) => {
				if (task.id === action.payload.id) {
					return {
						...task,
						status: !task.status,
					};
				}
				return task;
			});

		default:
			return state;
	}
};
export default taskReducer;