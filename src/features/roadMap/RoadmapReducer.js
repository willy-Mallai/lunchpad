import { addTask } from "./helper/addTask";
import deleteTask from "./helper/deleteTask";
import toggleComplete from "./helper/toggleComplete";
import editingTask from "./helper/editingTask";
const initialFolders = [
  {
    id: 1,
    title: "Semester 6",
    children: [
      {
        id: 11,
        title: "Object Oriented Programming",
        children: [
          {
            id: 111,
            title: "Encapsulation",
            completed: true,
            priority: "High",
          },
          {
            id: 112,
            title: "Inheritance",
            completed: false,
            priority: "Medium",
          },
          {
            id: 113,
            title: "Polymorphism",
            completed: false,
            priority: "High",
          },
        ],
      },
      {
        id: 12,
        title: "Database Management System",
        children: [
          {
            id: 121,
            title: "Normalization",
            completed: true,
            priority: "Medium",
          },
          {
            id: 122,
            title: "Joins",
            completed: false,
            priority: "High",
          },
        ],
      },
      {
        id: 13,
        title: "Computer Networks",
        children: [
          {
            id: 131,
            title: "TCP/IP",
            completed: false,
            priority: "High",
          },
          {
            id: 132,
            title: "Routing",
            completed: false,
            priority: "Low",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Frontend Development",
    children: [
      {
        id: 21,
        title: "React",
        children: [
          {
            id: 211,
            title: "useState",
            completed: true,
            priority: "Low",
          },
          {
            id: 212,
            title: "useEffect",
            completed: true,
            priority: "Medium",
          },
          {
            id: 213,
            title: "React Router",
            completed: false,
            priority: "High",
          },
          {
            id: 214,
            title: "Context API",
            completed: false,
            priority: "High",
          },
        ],
      },
      {
        id: 22,
        title: "JavaScript",
        children: [
          {
            id: 221,
            title: "Promises",
            completed: true,
            priority: "Medium",
          },
          {
            id: 222,
            title: "Async/Await",
            completed: false,
            priority: "High",
          },
        ],
      },
    ],
  },
];

function RoadMapReducer(state, action) {
  switch (action.type) {
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
