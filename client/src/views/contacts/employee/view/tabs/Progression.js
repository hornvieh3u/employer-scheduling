// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  UncontrolledButtonDropdown,
  UncontrolledTooltip
} from 'reactstrap';

// ** Third Party Components
import {
  ChevronDown,
  Download,
  ExternalLink,
  Eye,
  File,
  FileText,
  Printer,
  Send
} from 'react-feather';
import DataTable from 'react-data-table-component';

// ** Custom Components
import Avatar from '@components/avatar';

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const projectsArr = [
  {
    progress: 60,
    hours: '210:30h',
    progressColor: 'info',
    totalTasks: '233/240',
    subtitle: 'React Project',
    title: 'BGC eCommerce App',
    img: require('@src/assets/images/icons/brands/react-label.png').default
  },
  {
    hours: '89h',
    progress: 15,
    totalTasks: '9/50',
    progressColor: 'danger',
    subtitle: 'UI/UX Project',
    title: 'Falcon Logo Design',
    img: require('@src/assets/images/icons/brands/xd-label.png').default
  },
  {
    progress: 90,
    hours: '129:45h',
    totalTasks: '100/190',
    progressColor: 'success',
    subtitle: 'Vuejs Project',
    title: 'Dashboard Design',
    img: require('@src/assets/images/icons/brands/vue-label.png').default
  },
  {
    hours: '45h',
    progress: 49,
    totalTasks: '12/86',
    progressColor: 'warning',
    subtitle: 'iPhone Project',
    title: 'Foodista mobile app',
    img: require('@src/assets/images/icons/brands/sketch-label.png').default
  },

  {
    progress: 73,
    hours: '67:10h',
    totalTasks: '234/378',
    progressColor: 'info',
    subtitle: 'React Project',
    title: 'Dojo React Project',
    img: require('@src/assets/images/icons/brands/react-label.png').default
  },
  {
    progress: 81,
    hours: '108:39h',
    totalTasks: '264/537',
    title: 'HTML Project',
    progressColor: 'success',
    subtitle: 'Crypto Website',
    img: require('@src/assets/images/icons/brands/html-label.png').default
  },
  {
    progress: 78,
    hours: '88:19h',
    totalTasks: '214/627',
    progressColor: 'success',
    subtitle: 'Vuejs Project',
    title: 'Vue Admin template',
    img: require('@src/assets/images/icons/brands/vue-label.png').default
  }
];

export const columns = [
  {
    name: 'Type',
    selector: (row) => row.totalTasks,
    cell: (row) => <span>{row.type || 'Program'}</span>
  },
  {
    sortable: true,
    minWidth: '300px',
    name: 'Rank',
    selector: (row) => row.title,
    cell: (row) => {
      return (
        <div className="d-flex justify-content-left align-items-center">
          <div className="avatar-wrapper">
            <Avatar className="me-1" img={row.img} alt={row.title} imgWidth="32" />
          </div>
          <div className="d-flex flex-column">
            <span className="text-truncate fw-bolder">
              {/* {row.title} */}
              Yellow Belt
            </span>
            <small className="text-muted">Martial Arts</small>
          </div>
        </div>
      );
    }
  },
  {
    name: 'Date Promoted',
    selector: (row) => row.totalTasks,
    cell: (row) => <span>01/26/2023</span>
  },
  {
    name: 'Action',
    minWidth: '110px',
    cell: (row) => (
      <div className="column-action d-flex align-items-center">
        <Send className="text-body cursor-pointer" size={17} id={`send-tooltip-${row.id}`} />
        <UncontrolledTooltip placement="top" target={`send-tooltip-${row.id}`}>
          Send Mail
        </UncontrolledTooltip>

        <Link
          className="text-body"
          to={`/apps/invoice/preview/${row.id}`}
          id={`pw-tooltip-${row.id}`}
        >
          <Eye size={17} className="mx-1" />
        </Link>
        <UncontrolledTooltip placement="top" target={`pw-tooltip-${row.id}`}>
          Preview Invoice
        </UncontrolledTooltip>

        <Download
          className="text-body cursor-pointer"
          size={17}
          id={`download-tooltip-${row.id}`}
        />
        <UncontrolledTooltip placement="top" target={`download-tooltip-${row.id}`}>
          Download Invoice
        </UncontrolledTooltip>
      </div>
    )
  }
  // {
  //     name: 'Progress',
  //     selector: (row) => row.progress,
  //     sortable: true,
  //     cell: (row) => {
  //         return (
  //             <div className="d-flex flex-column w-100">
  //                 <small className="mb-1">{`${row.progress}%`}</small>
  //                 <Progress
  //                     value={row.progress}
  //                     style={{ height: '6px' }}
  //                     className={`w-100 progress-bar-${row.progressColor}`}
  //                 />
  //             </div>
  //         )
  //     }
  // },
  // {
  //     name: 'Hours',
  //     selector: (row) => row.hours
  // }
];

const CustomPagination = () => {
  // const count = Math.ceil(clientStore?.contacts?.total / rowsPerPage)
  return (
    <ReactPaginate
      previousLabel={''}
      nextLabel={''}
      pageCount={1}
      activeClassName="active"
      // forcePage={currentPage !== 0 ? currentPage - 1 : 0}
      // onPageChange={(page) => handlePagination(page)}
      pageClassName={'page-item'}
      nextLinkClassName={'page-link'}
      nextClassName={'page-item next'}
      previousClassName={'page-item prev'}
      previousLinkClassName={'page-link'}
      pageLinkClassName={'page-link'}
      containerClassName={'pagination react-paginate justify-content-end my-2 pe-1'}
    />
  );
};

const Progression = () => {
  return (
    <Card>
      <CardHeader className="py-1">
        <CardTitle tag="h4">Progression</CardTitle>
        <UncontrolledButtonDropdown>
          <DropdownToggle color="secondary" outline caret>
            <ExternalLink className="font-small-4 me-50" />
            <span>Program</span>
          </DropdownToggle>
          <DropdownMenu end>
            <DropdownItem className="w-100">
              <Printer className="font-small-4 me-50" />
              <span>Program</span>
            </DropdownItem>
            <DropdownItem className="w-100">
              <FileText className="font-small-4 me-50" />
              <span>Course</span>
            </DropdownItem>
            <DropdownItem className="w-100">
              <File className="font-small-4 me-50" />
              <span>Type</span>
            </DropdownItem>
            {/* <DropdownItem className="w-100">
                                      <Clipboard className="font-small-4 me-50" />
                                      <span>PDF</span>
                                  </DropdownItem>
                                  <DropdownItem className="w-100">
                                      <Copy className="font-small-4 me-50" />
                                      <span>Copy</span>
                                  </DropdownItem> */}
          </DropdownMenu>
        </UncontrolledButtonDropdown>
      </CardHeader>
      <div className="react-dataTable user-view-account-projects">
        <DataTable
          noHeader
          responsive
          columns={columns}
          data={projectsArr}
          className="react-dataTable"
          sortIcon={<ChevronDown size={10} />}
          pagination
          paginationServer
          paginationComponent={CustomPagination}
        />
      </div>
    </Card>
  );
};

export default Progression;
