function addTask(state, title, priority, parentId) {
  return state.map((node) => {
    if (node.id === parentId) {
      return {
        ...node,
        children: [
          ...node.children,
          {
            id: Date.now(),
            title,
            priority,
            completed: false,
          },
        ],
      };
    }
    if (node.children) {
      return {
        ...node,
        children: addTask(node.children, title, priority, parentId),
      };
    }
    return node;
  });
}

export { addTask };
