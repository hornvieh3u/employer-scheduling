import React, { useEffect, useState } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import {
  DRAG_DROP_TEMPLETE_EMAIL_IN_ORDER,
  UPDATE_TEMPLATE_TO_EMAIL,
  MAKE_TEMPLATE_AS_FAVORITES,
  SWAP_TEMPLATE,
  MAKE_TEMPLATE_AS_ACTIVATE,
  GET_CATEGORIES_EMAIL,
} from "../store/email"
import { connect } from "react-redux"

// import moment from "moment"
// import sendEmailSvg from "../../../../assets/images/svg/send_email.svg"
// import sendImageEmailSvg from "../../../../assets/images/svg/send_image_email.svg"
// import sendImageTextSvg from "../../../../assets/images/svg/send_image_text.svg"
// import sendPdfEmailSvg from "../../../../assets/images/svg/send_pdf_email.svg"
// import sendPdfTextSvg from "../../../../assets/images/svg/send_pdf_text.svg"
// import sendVideoEmailSvg from "../../../../assets/images/svg/send_video_email.svg"
// import sendVideoTextSvg from "../../../../assets/images/svg/send_video_text.svg"
// import { makeStyles } from "@material-ui/styles"

import AddIconModal from "./AddIconModal"
import { TemplateIcon } from "./TemplateIcon"

// const useStyles = makeStyles(() => ({
//   templateAddLine: {
//     fill: "none",
//     stroke: "#666",
//     webkitUserSelect: "none",
//     userSelect: "none"
//   },
//   templateAddIcon: {
//     width: "24px",
//     border: "1px solid #666",
//     height: "25px",
//     borderRadius: "50%",
//     position: "absolute",
//     left: "21px",
//     top: "-7px"
//   },
//   templateAdd: {
//     width: "150px",
//     height: "110px"
//   },
//   templateTime: {
//     margin: "0",
//     fontSize: "11px",
//     color: "#f28422",
//     display: "block"
//   }
// }))

const getListStyle = isDraggingOver => ({
  // background: isDraggingOver ? "lightblue" : "lightgrey",
  // padding: grid,
  // width: 250
})
const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  marginTop: "65px",

  // styles we need to apply on draggables
  ...draggableStyle
})

const TemplateSequence = (props) => {
  const userId = localStorage.getItem("user_id")
  const {
    SWAP_TEMPLATE,
    GET_CATEGORIES_EMAIL,
  } = props
  const { elements, setEditOrAddOrListTemplate } = props
  const [items, setItems] = useState([])

  const onDragEnd = (result) => {
    const newItems = Array.from(items)
    const [removed] = newItems.splice(result.source.index, 1)
    newItems.splice(result.destination.index, 0, removed)
    setItems(newItems)
    let startedFrom = elements[result?.source.index]
    let destination = elements[result?.destination.index]
    let payload = {
      newPositionOfFirstSelected: result?.destination.index,
      FirstSelectedOid: startedFrom._id,
      DateOfFirstSelectedOid: startedFrom?.sent_date,

      newPositionOfSecondSelected: result?.source.index,
      SecondSelectedOid: destination._id,
      DateOfSecondSelectedOid: destination?.sent_date,
    }
    SWAP_TEMPLATE(startedFrom.folderId, payload)
    setTimeout(() => {
      GET_CATEGORIES_EMAIL("/api/email_nurturing")
    }, 300)
  }

  const handleActivateChange = (item) => {
    let payload = {
      tempId: [item?._id],
      isActive: item?.inActiveUsers.includes(userId),
    }

    MAKE_TEMPLATE_AS_ACTIVATE(
      "/api/email_nurturing",
      payload,
      item?.folderId
    )
    // if (item?._id) {
    // }
  }
  const getSmartList = (smartlist) => {
    let smartlistName = []
    for (let folder of props?.getAllSmartList) {
      for (let item of folder?.smartlists) {
        if (smartlist?.includes(item?._id)) {
          smartlistName.push(item)
        }
      }
    }
    return smartlistName
  }

  useEffect(() => {
    setItems(elements)
  }, [elements])

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
              {items.map((item, index) => {
                return (
                  <Draggable
                    Draggable
                    draggableId={item?._id}
                    index={index}
                    key={item?._id}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="position-relative"
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                        >
                        <div style={{ position: "absolute", left: "42px", top: "-20px"}}>
                          <div className="template-add-line">
                          </div>
                          <div>
                            {/*<AddIconModal setEditOrAddOrListTemplate={setEditOrAddOrListTemplate}/>*/}
                          </div>
                        </div>
                        <div>
                          {/*<TemplateIcon item={item} index={index}/>*/}
                          {/*<div className="w-100 p-1 mt-1 text-center">*/}
                          {/*  <img src={sendEmailSvg} alt="email" height="45" width="45" style={{marginTop: "5px"}}/>*/}
                          {/*</div>*/}
                          {/*<div className="w-100 text-center" style={{backgroundColor: "transparent"}}>*/}
                          {/*  <label className="font-weight-bold" style={{fontSize: "14px", margin: 0}}>New Email</label>*/}
                          {/*  <label className={classes.templateTime}>*/}
                          {/*    {index === 0 ? (*/}
                          {/*      <>Send immediately</>*/}
                          {/*    ) : item?.days ? (*/}
                          {/*      <>*/}
                          {/*        Send {item?.days} days{" "}*/}
                          {/*        {item?.days_type || "after"} <br /> the*/}
                          {/*        previus message*/}
                          {/*      </>*/}
                          {/*    ) : (*/}
                          {/*      <>*/}
                          {/*        Send at{" "}*/}
                          {/*        {moment(item.sent_date).format(*/}
                          {/*          "MMM DD, YYYY"*/}
                          {/*        )}*/}
                          {/*      </>*/}
                          {/*    )}*/}
                          {/*  </label>*/}
                          {/*</div>*/}
                        </div>
                      </div>
                    )}
                  </Draggable>
                )
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    getAllSmartList: state.EmailMarketing.getAllSmartList,
  }
}
export default connect(mapStateToProps, {
  DRAG_DROP_TEMPLETE_EMAIL_IN_ORDER,
  UPDATE_TEMPLATE_TO_EMAIL,
  MAKE_TEMPLATE_AS_FAVORITES,
  SWAP_TEMPLATE,
  MAKE_TEMPLATE_AS_ACTIVATE,
  GET_CATEGORIES_EMAIL,
})(TemplateSequence)
