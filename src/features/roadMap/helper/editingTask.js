function editingTask(editTask, isEditedId, state) {
  return state.map((node) => {
    if (node.id === isEditedId) {
      return { ...node, title: editTask };
    }
    if (node.children) {
      return {
        ...node,
        children: editingTask(editTask, isEditedId, node.children),
      };
    }
    return node;
  });
}

export default editingTask;
