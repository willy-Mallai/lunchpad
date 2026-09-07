import { useState } from "react";
import List0 from "./List0";
import List1 from "./List1";
import List2 from "./List2";
import RoadMapItem from "./RoadMapItem";

function RoadMapList({ node, depth, dispatch, parentId }) {
  const [isExpand, setIsExpand] = useState(false);
  const [isEditedId, setIsEditedId] = useState(null);

  return (
    <>
      {depth === 0 && (
        <List0 node={node} isExpand={isExpand} setIsExpand={setIsExpand} />
      )}

      {depth === 1 && (
        <List1
          node={node}
          dispatch={dispatch}
          setIsExpand={setIsExpand}
          isExpand={isExpand}
          parentId={parentId}
        />
      )}

      {depth === 2 && (
        <List2
          node={node}
          isEditedId={isEditedId}
          setIsEditedId={setIsEditedId}
        />
      )}

      {isExpand && node.children?.length > 0 && (
        <RoadMapItem
          node={node.children}
          depth={depth + 1}
          parentId={node.id}
        />
      )}
    </>
  );
}

export default RoadMapList;
