// // ** Reactstrap Imports
// import { Card, CardHeader, Progress } from 'reactstrap'

// // ** Third Party Components
// import { ChevronDown } from 'react-feather'
// import DataTable from 'react-data-table-component'

// // ** Custom Components
// import Avatar from '@components/avatar'

// // ** Styles
// import '@styles/react/libs/tables/react-dataTable-component.scss'

// const projectsArr = [
//     {
//         progress: 60,
//         hours: '210:30h',
//         progressColor: 'info',
//         totalTasks: '233/240',
//         subtitle: 'React Project',
//         title: 'BGC eCommerce App',
//         img: require('@src/assets/images/icons/brands/react-label.png').default
//     },
//     {
//         hours: '89h',
//         progress: 15,
//         totalTasks: '9/50',
//         progressColor: 'danger',
//         subtitle: 'UI/UX Project',
//         title: 'Falcon Logo Design',
//         img: require('@src/assets/images/icons/brands/xd-label.png').default
//     },
//     {
//         progress: 90,
//         hours: '129:45h',
//         totalTasks: '100/190',
//         progressColor: 'success',
//         subtitle: 'Vuejs Project',
//         title: 'Dashboard Design',
//         img: require('@src/assets/images/icons/brands/vue-label.png').default
//     },
//     {
//         hours: '45h',
//         progress: 49,
//         totalTasks: '12/86',
//         progressColor: 'warning',
//         subtitle: 'iPhone Project',
//         title: 'Foodista mobile app',
//         img: require('@src/assets/images/icons/brands/sketch-label.png').default
//     },

//     {
//         progress: 73,
//         hours: '67:10h',
//         totalTasks: '234/378',
//         progressColor: 'info',
//         subtitle: 'React Project',
//         title: 'Dojo React Project',
//         img: require('@src/assets/images/icons/brands/react-label.png').default
//     },
//     {
//         progress: 81,
//         hours: '108:39h',
//         totalTasks: '264/537',
//         title: 'HTML Project',
//         progressColor: 'success',
//         subtitle: 'Crypto Website',
//         img: require('@src/assets/images/icons/brands/html-label.png').default
//     },
//     {
//         progress: 78,
//         hours: '88:19h',
//         totalTasks: '214/627',
//         progressColor: 'success',
//         subtitle: 'Vuejs Project',
//         title: 'Vue Admin template',
//         img: require('@src/assets/images/icons/brands/vue-label.png').default
//     }
// ]

// export const columns = [
//     {
//         sortable: true,
//         minWidth: '300px',
//         name: 'Project',
//         selector: (row) => row.title,
//         cell: (row) => {
//             return (
//                 <div className="d-flex justify-content-left align-items-center">
//                     <div className="avatar-wrapper">
//                         <Avatar
//                             className="me-1"
//                             img={row.img}
//                             alt={row.title}
//                             imgWidth="32"
//                         />
//                     </div>
//                     <div className="d-flex flex-column">
//                         <span className="text-truncate fw-bolder">
//                             {row.title}
//                         </span>
//                         <small className="text-muted">{row.subtitle}</small>
//                     </div>
//                 </div>
//             )
//         }
//     },
//     {
//         name: 'Total Tasks',
//         selector: (row) => row.totalTasks
//     },
//     {
//         name: 'Progress',
//         selector: (row) => row.progress,
//         sortable: true,
//         cell: (row) => {
//             return (
//                 <div className="d-flex flex-column w-100">
//                     <small className="mb-1">{`${row.progress}%`}</small>
//                     <Progress
//                         value={row.progress}
//                         style={{ height: '6px' }}
//                         className={`w-100 progress-bar-${row.progressColor}`}
//                     />
//                 </div>
//             )
//         }
//     },
//     {
//         name: 'Hours',
//         selector: (row) => row.hours
//     }
// ]

// const UserProjectsList = () => {
//     return (
//         <Card>
//             <CardHeader tag="h4">Client Contracts</CardHeader>
//             <div className="react-dataTable user-view-account-projects">
//                 <DataTable
//                     noHeader
//                     responsive
//                     columns={columns}
//                     data={projectsArr}
//                     className="react-dataTable"
//                     sortIcon={<ChevronDown size={10} />}
//                 />
//             </div>
//         </Card>
//     )
// }

// export default UserProjectsList


// ** React Imports
import { useState } from 'react'

// ** Table columns & Expandable Data
import ExpandableTable, { data, columns } from './data'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle } from 'reactstrap'

const DataTableWithButtons = () => {
  // ** State
  const [currentPage, setCurrentPage] = useState(0)

  // ** Function to handle filter
  const handlePagination = page => {
    setCurrentPage(page.selected)
  }

  // ** Custom Pagination
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel={''}
      nextLabel={''}
      forcePage={currentPage}
      onPageChange={page => handlePagination(page)}
      pageCount={10}
      breakLabel={'...'}
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName='active'
      pageClassName='page-item'
      breakClassName='page-item'
      nextLinkClassName='page-link'
      pageLinkClassName='page-link'
      breakLinkClassName='page-link'
      previousLinkClassName='page-link'
      nextClassName='page-item next-item'
      previousClassName='page-item prev-item'
      containerClassName={'pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1'}
    />
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Client Contracts</CardTitle>
      </CardHeader>
      <div className='react-dataTable'>
        <DataTable
          noHeader
          pagination
          data={data}
          expandableRows
          columns={columns}
          expandOnRowClicked
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
          paginationComponent={CustomPagination}
          paginationDefaultPage={currentPage + 1}
          expandableRowsComponent={ExpandableTable}
          paginationRowsPerPageOptions={[10, 25, 50, 100]}
        />
      </div>
    </Card>
  )
}

export default DataTableWithButtons

