// ** Navigation imports
import dashboards from './dashboards';
import contacts from './contacts';
import tasks from './tasks';
import calendar from './calendar';
import marketing from './marketing';
import business from './business';
import shop from './shop';
import finance from './finance';
import settings from './settings';
import documents from './documents';
import filemanager from './filemanager';
import myCMA from './myCMA';
import formBuilder from './formBuilder';
import webTools from './webTools';

import liveChatSetting from './liveChatSetting';

// ** Merge & Export
export default [
  ...dashboards,
  ...contacts,
  ...tasks,
  ...calendar,
  ...documents,
  ...marketing,
  ...business,
  ...shop,
  ...finance,
  ...settings,
  ...filemanager,
  ...myCMA,
  ...formBuilder,
  ...liveChatSetting,
  ...webTools
];
