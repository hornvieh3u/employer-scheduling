import React from 'react'
import { Offcanvas, OffcanvasBody, OffcanvasHeader } from 'reactstrap'

export default function BlocksProperties({toggleBlocks,openBlocks}) {
  return (
    <Offcanvas offcanvasClassName="offCanvas"
    toggle={()=>{toggleBlocks(!openBlocks)}}
    direction="end"
    isOpen={openBlocks}
    backdrop={false}
    className="border-start shadow "
    // style={{ marginTop: `${margin.top + 1}px`, marginBottom: `${margin.bottom + 1}px` }}
  >
    <OffcanvasHeader toggle={()=>{toggleBlocks(!openBlocks)}}>
      Blocks Components
    </OffcanvasHeader>
    <OffcanvasBody>
      <div id='blocks'></div>
    </OffcanvasBody>

    </Offcanvas>
  )
}
