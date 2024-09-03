import React, { useState } from "react"
import { Row, Col } from "reactstrap"
import { connect } from "react-redux"
import AddTemplateModal from "./AddTemplateModal"

const AddIconModal = (props) => {
  const [open, setOpen] = useState(false)
  // const classes = useStyles()
  const [viewTemplate, setViewTemplate] = useState(null)
  const [mailsTODisplay, setMailsTODisplay] = useState([])
  const {
    categoriesEmail
  } = props
  const { setEditOrAddOrListTemplate } = props
  const toggleModal = () => {
    setOpen(!open)
  }

  return (
    <div>
      <div width="20" height="20">
        <AddIcon  onClick={() => {
          setOpen(!open)
        }}/>
      </div>
      <Drawer
        anchor="right"
        open={open}
        PaperProps={{
          elevation: 0,
          style: {
            width: "420px",
            borderRadius: "10px"
          },
        }}
      >
        <div className="">
          <div className="d-flex justify-content-between">
            <div className="d-flex justify-content-start pt-1 px-1">
              <IconButton onClick={toggleModal} className="rounded-circle">
                <CloseIcon />
              </IconButton>
              <Typography className="mt-1">
                <b>Add Template</b>
              </Typography>
            </div>
          </div>
          <div>
            <Row>
              <Col sm="12" lg="12" md="12">
                <div className="mat-dialog-content add-section">
                  <div className="action-list px-1 enable ng-star-inserted">
                    <ul>
                      <li>
                        <AddTemplateModal
                          setViewTemplate={setViewTemplate}
                          template={viewTemplate}
                          type={"text"}
                          FolderList={categoriesEmail}
                          setEditOrAddOrListTemplate={setEditOrAddOrListTemplate}
                          setMailsTODisplay={setMailsTODisplay}
                          parentCallback={() => {
                            setOpen(!open)
                          }}
                        />
                      </li>
                      <li>
                        <AddTemplateModal
                          setViewTemplate={setViewTemplate}
                          template={viewTemplate}
                          type={"email"}
                          FolderList={categoriesEmail}
                          setEditOrAddOrListTemplate={setEditOrAddOrListTemplate}
                          setMailsTODisplay={setMailsTODisplay}
                          parentCallback={() => {
                            setOpen(!open)
                          }}
                        />
                      </li>
                    </ul>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </Drawer>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    getAllSmartList: state.EmailMarketing.getAllSmartList,
    categoriesEmail: state.EmailMarketing.categoriesEmail,
  }
}

export default connect(mapStateToProps,null)(AddIconModal)
