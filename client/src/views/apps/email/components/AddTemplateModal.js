import React, { useEffect, useState } from "react"
import { Row, Col, Button, ModalHeader, ModalBody, Modal, ModalFooter } from 'reactstrap'
import { Input, FormGroup } from "reactstrap"
import {
  ADD_TEMPLATE_TO_EMAIL,
  UPDATE_TEMPLATE_TO_EMAIL,
  SEND_EMAIL,
  GET_CATEGORIES_EMAIL,
  UPLAODE_IMAGE,
} from "../store/email"
import { Get_User_Info } from "../store/loginActions"
import { connect } from "react-redux"
import sendTextSvg from "../../../../assets/images/svg/send_text.svg"
import sendEmailSvg from "../../../../assets/images/svg/send_email.svg"
import { GET_ALL_TYPE_STUDENT } from "../store/member"
import { convertToRaw, EditorState, Modifier } from "draft-js"
import moment from "moment/moment"
import { toast } from "react-toastify"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import draftToHtml from "draftjs-to-html"
import TemplatePopup from './TemplatePopUp'


const toastCss = () => {
  return {
    position: "top-center",
    autoClose: 3000,
    icon: true,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  }
}

const getLoggedInUser = () => {
  return JSON.parse(localStorage.getItem("userData"))?.data
}

function AddTemplateModal(props) {
  const [composeOpen, setComposeOpen] = useState(false)
  const toggleCompose = () => {
    setComposeOpen(!composeOpen)
  }
  const [openAdd, setOpenAdd] = React.useState(false)
  // const classes = useStyles()
  const handleClickOpen = () => {
    setOpenAdd(true)
  }
  const handleClose = () => {
    setOpenAdd(false)
    props.parentCallback()
  }
  const {
    ADD_TEMPLATE_TO_EMAIL,
    UPDATE_TEMPLATE_TO_EMAIL,
    type,
    SEND_EMAIL,
    template,
    userinfo,
    Get_User_Info,
    setViewTemplate,
    getAllSmartList,
  } = props
  const [sweetAlertOpen, setSweetAlertOpen] = useState(false)
  const { setEditOrAddOrListTemplate, FolderList } = props
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty(),
  )
  const [date, setDate] = useState({
    sent_date: new Date(),
    sent_time: new Date(),
  })
  const [templatePayload, setTemplatePayload] = useState({
    from: getLoggedInUser()?.email,
    to: [],
    subject: "",
    title: "test",
    template: "",
    repeat_mail: "every month",
    follow_up: "4",
    design: "",
    days_type: "after",
    immediately: true,
    content_type: "",
    html: "",
    isPlaceHolders: false,
  })

  const [MainFolderSelected, setMainFolderSelected] = useState({})
  const [SubFolderSelected, setSubFolderSelected] = useState({})
  const [fileUploaded, setFileUploaded] = useState([])
  const [SelectTypeToSendEmail, setSelectTypeToSendEmail] = useState("smartlist")
  const [smartlistRows, setSmartListRows] = useState([])
  const [smartlistId, setSmartListId] = useState([])

  const handleFieldValue = (e) => {
    let { name, value } = e.target
    if (name === "from") {
      setTemplatePayload({ ...templatePayload, from: getLoggedInUser()?.firstname + " " + value })
    } else
      setTemplatePayload({ ...templatePayload, [name]: value })
  }
  const handleToList = (e) => {
    let { value } = e.target
    templatePayload.to = value.split(",")
    setTemplatePayload({ ...templatePayload })
  }
  const handleSelectMainFolder = (e, item) => {
    setMainFolderSelected(item)
  }
  const handleSelectsubFolder = (e, item) => {
    setSubFolderSelected(item)
  }
  useEffect(() => {
    let bussinessEmail = getLoggedInUser()?.email

    if (bussinessEmail?.length > 0) {
      setTemplatePayload((prevState) => {
        return { ...prevState, from: bussinessEmail }
      })
    }
  }, [])

  useEffect(() => {
    Get_User_Info()
    if (template === null) {
      //setEditorState(EditorState.createEmpty())
    }
    setTemplatePayload({
      ...templatePayload,
      isPlaceHolders: templatePayload?.isPlaceHolders,
    })
    if (template) {
      setTemplatePayload(template)
      if (template.template) {
        // try {
        //   setEditorState(
        //     EditorState.createWithContent(stateFromHTML(template.template)),
        //   )
        // } catch (error) {
        // }
      }

      if (template?.smartLists.length > 0) {
        setSelectTypeToSendEmail("smartlist")
        setTemplatePayload((templatePayload) => {
          return { ...templatePayload, smartLists: template.smartLists }
        })
      } else {
        setSelectTypeToSendEmail("toemail")
      }
    }
    // eslint-disable-next-line camelcase
  }, [template, getAllSmartList, Get_User_Info])

  const AddNewTemplate = async (folderId, send = false) => {
    if (templatePayload?.adminId !== undefined) {
      let payload = {}
      const content = draftToHtml(
        convertToRaw(editorState.getCurrentContent())
      )
      payload = {
        ...templatePayload,
        content,
        html: content,
        content_type: "text",
      }
      if (date.sent_date) {
        payload.sent_date = moment(date.sent_date).format("YYYY-MM-DD")
        payload.sent_time = moment(date.sent_date).format("HH:mm")
      }

      let formData = new FormData()
      for (let file of fileUploaded) {
        formData.append("attachments", file)
      }
      // eslint-disable-next-line camelcase
      const update_payload = { ...payload }
      delete payload["smartLists"]
      delete payload["to"]
      delete payload["adminId"]
      delete payload["_id"]
      delete payload["createdAt"]
      delete payload["updatedAt"]
      delete payload["_v"]
      if (SelectTypeToSendEmail === "smartlist") {
        formData.append("smartLists", JSON.stringify(smartlistId))
        update_payload.smartLists = props.getAllSmartlistId
        payload.isPlaceHolders = true
        delete templatePayload["to"]
      } else {
        formData.append("to", JSON.stringify(templatePayload.to))
        delete templatePayload["smartLists"]
      }
      let dataEntries = Object.entries(payload)
      dataEntries.map((v, i) => {
        formData.append(v[0], v[1])
        return v
      })
      if (send) {
        SEND_EMAIL(`/api/email_compose`, formData)
        setEditOrAddOrListTemplate("list")
      }
      else {
        if (template) {
          UPDATE_TEMPLATE_TO_EMAIL(
            "/api/email_nurturing",
            formData,
            template?._id,
            template?.folderId,
          )
          setViewTemplate(null)
          setEditOrAddOrListTemplate("list")
        }
        else {
          if (folderId?._id === undefined) {
            toast.error("Please Select folder", toastCss())
            return
          }
          ADD_TEMPLATE_TO_EMAIL(
            `/api/email_nurturing`,
            formData,
            folderId?._id,
          )
          setEditOrAddOrListTemplate("list")
        }
      }
    }
    else {
      let payload = {}
      const content = draftToHtml(
        convertToRaw(editorState.getCurrentContent())
      )
      payload = {
        ...templatePayload,
        content,
        html: content,
        content_type: "text",
      }
      if (date.sent_date) {
        payload.sent_date = moment(date.sent_date).format("YYYY-MM-DD")
        payload.sent_time = moment(date.sent_date).format("HH:mm")
      }

      let formData = new FormData()
      for (let file of fileUploaded) {
        formData.append("attachments", file)
      }
      // eslint-disable-next-line camelcase
      const update_payload = { ...payload }
      delete payload["smartLists"]
      delete payload["to"]

      if (SelectTypeToSendEmail === "smartlist") {
        formData.append("smartLists", JSON.stringify(smartlistId))
        payload.isPlaceHolders = true
        update_payload.smartLists = props.getAllSmartlistId
        delete templatePayload["to"]
      } else {
        formData.append("to", JSON.stringify(templatePayload.to))
        delete templatePayload["smartLists"]
      }

      let dataEntries = Object.entries(payload)
      dataEntries.map((v, i) => {
        formData.append(v[0], v[1])
        return v
      })
      if (send) {
        SEND_EMAIL(`/api/email_compose`, formData)
        setEditOrAddOrListTemplate("list")
      } else {
        if (template) {
          UPDATE_TEMPLATE_TO_EMAIL(
            "/api/email_nurturing",
            formData,
            template?._id,
            template?.folderId,
          )
          setViewTemplate(null)
          setEditOrAddOrListTemplate("list")
        } else {
          if (folderId?._id === undefined) {
            toast.error("Please Select folder", toastCss())
            return
          }
          ADD_TEMPLATE_TO_EMAIL(
            `/api/email_nurturing`,
            formData,
            folderId?._id,
          )
          setEditOrAddOrListTemplate("list")
        }
      }
    }
    props.parentCallback()
  }
  const handleDateChange = (value, keyname) => {
    setDate({
      ...date,
      [keyname]: value,
    })
  }

  const handleSubmit = () => {
    setTemplatePayload({
      ...templatePayload,
      sent_date: date.sent_date,
      sent_time: date.sent_time,
    })
  }
  const SaveTemplate = () => {
    setSweetAlertOpen(true)
  }

  const selectPlaceholder = (placeholder) => {
    setEditorState(insertText(placeholder, editorState))
    setTemplatePayload({ ...templatePayload, isPlaceHolders: true })
  }
  const insertText = (text, editorValue) => {
    const currentContent = editorValue.getCurrentContent()
    const currentSelection = editorValue.getSelection()

    const newContent = Modifier.replaceText(
      currentContent,
      currentSelection,
      text,
    )

    const newEditorState = EditorState.push(
      editorValue,
      newContent,
      "insert-characters",
    )
    return EditorState.forceSelection(
      newEditorState,
      newContent.getSelectionAfter(),
    )
  }
  return (
    <div>
      <div className="d-flex" onClick={toggleCompose}>
        <img src={type == "email" ? sendEmailSvg : sendTextSvg} style={{width: "36px", height: "36px", marginRight: "15px", objectFit: "contain",}}/>
        <div>
          <div>New {type == "email" ? "Email" : "Text"}</div>
          <div> {type == "email" ? "Create a text message to be sent to your client." : "Create a text message to be sent to your client."}</div>
        </div>
      </div>
      <TemplatePopup composeOpen={composeOpen} toggleCompose={toggleCompose} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    smartlist: state.EmailMarketing.smartlist,
    selectedtemplist: state.EmailMarketing.selectedtemplist,
    userinfo: state.userinfo?.userInfo,
    getAllSmartList: state.EmailMarketing.getAllSmartList,
    getAllSmartlistId: state.EmailMarketing.getAllSmartlistId,
  }
}

export default connect(mapStateToProps, {
  ADD_TEMPLATE_TO_EMAIL,
  UPDATE_TEMPLATE_TO_EMAIL,
  SEND_EMAIL,
  Get_User_Info,
  GET_ALL_TYPE_STUDENT,
  GET_CATEGORIES_EMAIL,
  UPLAODE_IMAGE,
})(AddTemplateModal)

