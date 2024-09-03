import React, { useRef, useState } from "react"
// import WeekCalender from "./WeekCalender"
import DayCalendar from "./DayCalendar"
// import DayCalendar from "./DayCalenderGoogle.js"
// import DayCalendar from "./FirstPage"
import { Button, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, TabContent, TabPane } from "reactstrap"
import { ArrowLeftCircle, ArrowRightCircle } from "react-feather"

const EmployeeCalender = () => {
  const [showText, setShowText] = useState(false)
  const [inputList, setInputList] = React.useState([])
  const [inputWeekList, setInputWeekList] = useState([])
  const [employeeAddList, setEmployeeAddList] = useState([])
  const [active, setActive] = useState('day')

  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab)
    }
  }

  const colors = [
    "purple",
    "yellow",
    "orange",
    "brown",
    "black",
    "red",
    "green",
    "pink",
  ]

  const addEmployeeFiledInCalendar = (e) => {
    setEmployeeAddList(
      employeeAddList.concat(
        <tr>
          <td id="sub">
            <div className="d-flex p-1">
              <Avatar src="/static/images/avatar/1.jpg" />
              <div className="ml-1">
                <h5 className="font-weight-bold">Antanio S</h5>
                <span>0.00 - $0.00</span>
              </div>
            </div>
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      )
    )
  }

  const onAddBtnClick = (event) => {
    setInputWeekList(
      inputWeekList.concat(
        <tr
          style={{ background: colors[inputWeekList.length % colors.length] }}
          className="jobs_column"
        >
          <td className="ml-1" style={{ border: "none" }}>
            Open
          </td>
          <td style={{ border: "none" }}></td>
          <td style={{ border: "none" }}></td>
          <td style={{ border: "none" }}></td>
          <td style={{ border: "none" }}></td>
          <td style={{ border: "none" }}></td>
          <td style={{ border: "none" }}></td>
          <td style={{ border: "none" }}></td>
        </tr>
      )
    )
  }

  return (
    <div className="">
    
      <div>
        <div className="col-md-12 mt-1 calenders">
          <TabContent className="py-50" activeTab={active}>
            <TabPane tabId="day">
              <DayCalendar
                inputList={inputList}
                inputWeekList={inputWeekList}
                employeeAddList={employeeAddList}
                addEmployeeFiledInCalendar={addEmployeeFiledInCalendar}
              />
            </TabPane>
            {/* <TabPane tabId="week">
              <WeekCalender
                employeeAddList={employeeAddList}
                onAddBtnClick={onAddBtnClick}
                inputWeekList={inputWeekList}
                addEmployeeFiledInCalendar={addEmployeeFiledInCalendar}
              />
            </TabPane> */}
          </TabContent>
        </div>
      </div>
    </div>
  )
}

export default EmployeeCalender
