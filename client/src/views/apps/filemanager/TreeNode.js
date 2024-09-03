import { useState } from "react"
import Tree from "./Tree"
import { Folder , ChevronDown, ChevronRight} from "react-feather"
 
export default function TreeNode({ node }) {
  const { children, label } = node

  const [showChildren, setShowChildren] = useState(false)

  const handleClick = () => {
    setShowChildren(!showChildren)
  }
  return (
    <>
      <div onClick={handleClick} style={{color:"#6e6b7b"}}>
      
        <span className="cursor-pointer">{label=="image1.jpg" || label=="image2.jpg" ? <img src='../assets/images/jpg.png' className="me-75 mb-40" height={17} width={17}/>: <Folder className='me-75 mb-40' size={18} />}{label}</span>
        {showChildren?<ChevronDown className="ms-1" size={17}/>:(label=="image1.jpg" || label=="image2.jpg"?'':<ChevronRight className="ms-1" size={17}/>)}
       </div>
      <ul className="p-0 ps-1 mb-40">
        {showChildren && label!="image1.jpg" && label!="image2.jpg" && <Tree treeData={children} />}
      </ul>
    </>
  )
}
