function toggleComplete(childId, state) {
  return state.map((node) => {
    if (node.id === childId) {
      return { ...node, completed: !node.completed };
    }
    if (node.children) {
      return {
        ...node,
        children: toggleComplete(childId, node.children),
      };
    }
    return node;
  });
}

export default toggleComplete;
