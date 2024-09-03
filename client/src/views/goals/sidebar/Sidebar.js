// ** React Imports
import { useState, Fragment } from 'react'
import { Link } from 'react-router-dom'

// ** Third Party Components
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Briefcase, UserCheck } from 'react-feather'

// ** Components
import ImpactArea from './ImpactArea'
import Filters from './Filters'
import Tags from './Tags'

// ** Reactstrap Imports
import {
    Button,
    ListGroup,
    ListGroupItem,
    Accordion,
    AccordionBody,
    AccordionHeader,
    AccordionItem
} from 'reactstrap'

const TodoSidebar = (props) => {
    // ** Props
    const {
        handleTaskSidebar,
        setMainSidebar,
        mainSidebar,
        dispatch,
        getTasks,
        params
    } = props

    // ** States
    const [openAccordion, setOpenAccordion] = useState('1')

    const toggleAccordion = (id) => {
        openAccordion === id ? setOpenAccordion() : setOpenAccordion(id)
    }

    // ** Functions To Handle List Item Filter
    const handleFilter = (filter) => {
        dispatch(getTasks({ ...params, filter }))
    }

    const handleTag = (tag) => {
        dispatch(getTasks({ ...params, tag }))
    }

    // ** Functions To Active List Item
    const handleActiveItem = (value) => {
        if (
            (params.filter && params.filter === value) ||
            (params.tag && params.tag === value)
        ) {
            return true
        } else {
            return false
        }
    }

    // ** Functions To Handle Add Task Click
    const handleAddClick = () => {
        handleTaskSidebar()
        setMainSidebar()
    }

    const renderGoalsType = () => {
        return (
            <Fragment>
                <ListGroup tag="div" className="list-group-filters mb-1">
                    <ListGroupItem
                        action
                        tag={Link}
                        to={'/goals'}
                        active={params.filter === '' && params.tag === ''}
                        onClick={() => handleFilter('')}
                    >
                        <UserCheck className="me-75" size={18} />
                        <span className="align-middle">Personal</span>
                    </ListGroupItem>
                    <ListGroupItem
                        tag={Link}
                        to={'/goals'}
                        active={handleActiveItem('important')}
                        onClick={() => handleFilter('important')}
                        action
                    >
                        <Briefcase className="me-75" size={18} />
                        <span className="align-middle">Business</span>
                    </ListGroupItem>
                </ListGroup>
            </Fragment>
        )
    }

    return (
        <div
            className={classnames('sidebar-left', {
                show: mainSidebar === true
            })}
        >
            <div className="sidebar">
                <div className="sidebar-content todo-sidebar">
                    <div className="todo-app-menu">
                        {/* <div className="add-task">
                            <Button
                                color="primary"
                                onClick={handleAddClick}
                                block
                            >
                                Add Goal
                            </Button>
                        </div> */}
                        <div className="p-1">
                            <h4>Goals</h4>
                        </div>

                        <PerfectScrollbar
                            className="sidebar-menu-list"
                            options={{ wheelPropagation: false }}
                        >
                            {renderGoalsType()}
                            <Accordion
                                className="me-1"
                                open={openAccordion}
                                toggle={toggleAccordion}
                            >
                                <AccordionItem>
                                    <AccordionHeader targetId="1">
                                        Impact Areas
                                    </AccordionHeader>
                                    <AccordionBody accordionId="1">
                                        <ImpactArea />
                                    </AccordionBody>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionHeader targetId="2">
                                        Filters
                                    </AccordionHeader>
                                    <AccordionBody accordionId="2">
                                        <Filters
                                            activeItem={handleActiveItem}
                                        />
                                    </AccordionBody>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionHeader targetId="3">
                                        Tags
                                    </AccordionHeader>
                                    <AccordionBody accordionId="3">
                                        <Tags activeItem={handleActiveItem} />
                                    </AccordionBody>
                                </AccordionItem>
                            </Accordion>
                        </PerfectScrollbar>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TodoSidebar
