import { addTask } from "./helper/addTask";
import deleteTask from "./helper/deleteTask";
import toggleComplete from "./helper/toggleComplete";
import editingTask from "./helper/editingTask";
const initialFolders = [];

function RoadMapReducer(state, action) {
  switch (action.type) {
    case "LOAD_ROADMAP":
      return action.payload;
    case "ADD_ROOT_FOLDER": {
      const { title } = action.payload;
      return [
        ...state,
        {
          id: Date.now(),
          title: title,
          children: [],
        },
      ];
    }
    case "ADD_CHILD_FOLDER": {
      const { title, parentId } = action.payload;

      return state.map((node) =>
        node.id === parentId
          ? {
              ...node,
              children: [
                ...node.children,
                { id: Date.now(), title, children: [] },
              ],
            }
          : node,
      );
    }

    case "ADD_TASK": {
      const { title, priority, parentChildId } = action.payload;
      return addTask(state, title, priority, parentChildId);
    }

    case "DELETE_ROOT_FOLDER": {
      return state.filter((node) => node.id !== action.payload);
    }
    case "DELETE_CHILD_FOLDER": {
      const { childId, parentId } = action.payload;
      return state.map((Pnode) =>
        Pnode.id === parentId
          ? {
              ...Pnode,
              children: Pnode.children.filter((Cnode) => Cnode.id !== childId),
            }
          : Pnode,
      );
    }
    case "DELETE_TASK": {
      let childId = action.payload;
      return deleteTask(childId, state);
    }
    case "TOGGLE_COMPLETE": {
      let childId = action.payload;

      return toggleComplete(childId, state);
    }
    case "EDITED_TASK": {
      const { editTask, isEditedId } = action.payload;
      return editingTask(editTask, isEditedId, state);
    }

    default:
      return state;
  }
}

export { initialFolders, RoadMapReducer };
