import { useContext } from "react";
import RoadMapList from "./RoadMapList";
import { RoadmapContext } from "./RoadmapProvider";

function RoadMapItem({ node, depth, parentId = null }) {
  const { state, dispatch } = useContext(RoadmapContext);
  const nodes = node || state;

  const getListStyle = (d) => {
    if (d === 0) return "space-y-4";
    if (d === 1) return "mt-3 space-y-3 border-l-2 border-[#3F5B8D]/30 pl-3 sm:pl-5 ml-2 sm:ml-4";
    return "mt-2.5 space-y-2 border-l-2 border-[#2E365A]/20 pl-3 sm:pl-4 ml-2 sm:ml-3";
  };


  return (
    <ul className={getListStyle(depth)}>
      {nodes.map((n) => (
        <li key={n.id} className="transition-all duration-200">
          <RoadMapList
            node={n}
            depth={depth}
            dispatch={dispatch}
            parentId={parentId}
          />
        </li>
      ))}
    </ul>
  );
}

export default RoadMapItem;

