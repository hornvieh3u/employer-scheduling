import React, { useEffect, useState } from "react"
import moment from "moment"
import { Fade, Card, Button, Popover } from 'reactstrap'
import {
  MAKE_TEMPLATE_AS_ACTIVATE
} from "../store/email"
import { EditorState } from "draft-js"

export const TemplateIcon = (props) => {
  const userId = localStorage.getItem("user_id")
  const { item, index } = props
  const [anchorEl, setAnchorEl] = useState(null)
  const [open, setOpen] = useState(false)
  const [placement, setPlacement] = useState()
  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget)
    setOpen((prev) => placement !== newPlacement || !prev)
    setPlacement(newPlacement)
  }
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  useEffect(() => {
    // setEditorState(
    //   EditorState.createWithContent(stateFromHTML(item.template))
    // )
  })

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
  }

  return (
    <div>
      <div className="w-100 p-1 mt-1 text-center" onClick={handleClick('left')}>
        {/*<img src={sendEmailSvg} alt="email" height="45" width="45" style={{marginTop: "5px"}}/>*/}

      </div>
      <div className="w-100 text-center" style={{backgroundColor: "transparent"}}>
        <label className="font-weight-bold" style={{fontSize: "14px", margin: 0}}>New Email</label>
        <label>
          {index === 0 ? (
            <>Send immediately</>
          ) : item?.days ? (
            <>
              Send {item?.days} days{" "}
              {item?.days_type || "after"} <br /> the
              previus message
            </>
          ) : (
            <>
              Send at{" "}
              {moment(item.sent_date).format(
                "MMM DD, YYYY"
              )}
            </>
          )}
        </label>
      </div>
      <Popover open={open} anchorEl={anchorEl} placement={placement} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  New Email
                </Typography>
                <span className="flex flex-row justify-content-center">
                {item?.isActive ? "Deactivate template" : "Activate template"}
                </span>
                  <Switch
                    checked={!item?.inActiveUsers.includes(userId)}
                    onChange={() => handleActivateChange(item)}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                <Typography color="text.secondary">
                  SUBJECT
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item?.subject}
                </Typography>
                <Typography color="text.secondary">
                  CONTENT
                </Typography>
                {/*<EditorContainer*/}
                {/*  editorState={editorState}*/}
                {/*  setEditorState={setEditorState}*/}
                {/*  style={{width: "100px !important"}}/>*/}
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => {
                  setOpen(!open)
                }}>Close</Button>
              </CardActions>
            </Card>
          </Fade>
        )}
      </Popover>
    </div>
  )
}
