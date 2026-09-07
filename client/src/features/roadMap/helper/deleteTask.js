function deleteTask(childId, state) {
  return state
    .filter((node) => node.id !== childId)
    .map((node) => ({
      ...node,
      children: node.children
        ? deleteTask(childId, node.children)
        : node.children,
    }));
}

export default deleteTask;
