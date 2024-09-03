import TreeNode from "./TreeNode"

export default function Tree({ treeData }) {
  return (
    <ul className="p-0 mb-0">
      {treeData.map((node) => (
        <TreeNode node={node} key={node.key} />
      ))}
    </ul>
  )
}