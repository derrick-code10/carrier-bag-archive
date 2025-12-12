import data from "../data/data.json";

export default function SidebarIndex({
  objects,
  onObjectClick,
  highlightedCluster,
}) {
  const getObjectsByCluster = (clusterId) => {
    return objects.filter((obj) => obj.clusterId === clusterId);
  };

  return (
    <div className="w-full md:w-80 bg-(--cloud-white) p-6 md:p-8">
      <h2 className="font-serif text-3xl font-semibold mb-6 text-(--black-ink)">
        {data.archiveIndex.title}
      </h2>

      <div className="space-y-8">
        {data.archiveIndex.clusters.map((cluster) => {
          const clusterObjects = getObjectsByCluster(cluster.id);
          const isHighlighted = highlightedCluster === cluster.id;

          return (
            <div
              key={cluster.id}
              className={`border-l-4 pl-4 transition-all duration-300 ${
                isHighlighted
                  ? "border-(--moss-green) bg-(--fungal-gray)/30 p-4 -ml-4 rounded-r"
                  : "border-(--fungal-gray)"
              }`}
            >
              <h3 className="font-serif text-xl font-semibold mb-2 text-(--black-ink)">
                {cluster.name}
              </h3>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {cluster.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-(--wax-amber)/20 text-(--rust-iron) 
                             rounded text-xs font-mono uppercase"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Object List */}
              <ul className="space-y-2">
                {clusterObjects.map((obj) => (
                  <li key={obj.id}>
                    <button
                      onClick={() => onObjectClick(obj)}
                      className="text-left text-sm text-(--soft-soil) hover:text-(--moss-green) 
                               transition-colors font-sans w-full py-1"
                    >
                      {obj.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
