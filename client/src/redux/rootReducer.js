// ** Reducers Imports
import navbar from './navbar';
import layout from './layout';
import auth from './authentication';
import todo from '@src/views/apps/todo/store';
import chat from '@src/views/apps/chat/store';
import users from '@src/views/apps/user/store';
import email from '@src/views/apps/email/store';
import invoice from '@src/views/apps/invoice/store';
import calendar from '@src/views/calendar/store';
import kanban from '@src/views/apps/kanban/store';
import workspace from '@src/views/apps/workspace/store';
import label from '@src/views/tasks/label-management/store';
import ecommerce from '@src/views/apps/ecommerce/store';
import dataTables from '@src/views/tables/data-tables/store';
import permissions from '@src/views/apps/roles-permissions/store';
import attendance from '../views/calendar/attendance/store';

// custom
import clientContact from '../views/contacts/client/store/reducer';
import employeeContact from '../views/contacts/employee/store/reducer';
import leadContact from '../views/contacts/leads/store/reducer';
import relationshipContact from '../views/contacts/relationship/store/reducer';
import vendorContact from '../views/contacts/vendor/store/reducer';
import event from '../views/calendar/event/store';
import filemanager from '../views/apps/filemanager/store';
import book from '../views/calendar/book/store';
import scheduleSetting from '../views/contacts/settings/store/reducer';

import ticket from '../views/apps/ticket/store';
import shop from '../views/shop/store'

import tasks from '../views/tasks/task-reporting/store/reducer';
import { EmailMarketing } from '../views/apps/email/store/emailMarketing';
import documents from '../views/documents/store';
import totalContacts from '../views/contacts/store/reducer';
import formBuilder from '../views/formBuilder/store';
import smartList from '../views/settings/tabs/advancesettings/store';
// text
import text from '../views/apps/text/store';
// deposit
import deposit from '../views/depositfunds/store';
import progression from '../views/settings/tabs/progressiontab/store/reducer';
import roles from '../views/settings/tabs/rolesandper/store/reducer';
import course from '../views/mycma/usercourses/store/reducer'
import projectManagement from '../views/business/projects/store/reducer';

const rootReducer = {
  auth,
  todo,
  chat,
  email,
  users,
  kanban,
  workspace,
  label,
  navbar,
  layout,
  invoice,
  calendar,
  ecommerce,
  dataTables,
  permissions,
  projectManagement,
  clientContact,
  employeeContact,
  leadContact,
  relationshipContact,
  vendorContact,
  tasks,
  filemanager,
  book,
  event,
  attendance,
  ticket,
  EmailMarketing: EmailMarketing,
  documents,
  totalContacts,
  formBuilder,
  smartList,
  text,
  deposit,
  roles,
  progression,
  course,
  scheduleSetting
};

export default rootReducer;
