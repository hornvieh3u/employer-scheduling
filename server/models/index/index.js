const Temp = require("../Temp");
const UserToken = require("../UserToken");
const Authenticate = require("../Authenticate");
const Admin = require("../Admin");
const AEmployee = require("../AEmployee");
const User = require("../User");
const UEmployee = require("../UEmployee");
const ClientContact = require("../ClientContact");
const ClientPosition = require("../ClientPosition");
const LeadPosition = require("../LeadPosition");
const VendorPosition = require("../VendorPosition");
const TaskContact = require("../TaskContact");
const Project = require("../Project");
const Task = require("../Tasks");
const Employee = require("../Employee");
const EmployeeContact = require("../EmployeeContact");
const EmployeePosition = require("../EmployeePosition");
const EmployeeTask = require("../EmployeeTask");
const EmployeeShift = require("../EmployeeShift");
const EmployeeGroup = require("../EmployeeGroup");
const EmployeeSchedule = require("../EmployeeSchedule");
const CheckList = require("../CheckList");
const { ScheduleCheckList, ScheduleTask } = require("../CheckListAns");
const ResetPass = require("../resetPass");
const MenuData = require("../MenuData");
const Document = require("../Document");
const DocumentRecipient = require("../DocumentRecipient");
const DocumentFolder = require("../DocumentFolder");
const DocumentSubfolder = require("../DocumentSubfolder");
const DocumentSignature = require("../DocumentSignature");
const Shop = require("../shop");
const Course = require("../Course");
const Membership = require("../Membership");
const Customer = require("../Customer");
const Invoice = require("../Invoice");
const Product = require("../product");
const Roles = require("../Roles");
// const StripeCustomer = require("./StripeCustomers");
const Cart = require("../Cart");
const MembershipSales = require("../MembershipSales");
const Candidate = require("../Candidate");
const Program = require("../Program");
const ProgramRank = require("../ProgramRank");
const CandidateStripe = require("../CandidateStripe");
const EmailComposeCategory = require("../EmailComposeCategory");
const EmailComposeFolder = require("../EmailComposeFolder");
const EmailKey = require("../EmailKey");
const EmailLibraryCategory = require("../EmailLibraryCategory");
const EmailLibraryFolder = require("../EmailLibraryFolder");
const EmailNurturingCategory = require("../EmailNurturingCategory");
const EmailNurturingFolder = require("../EmailNurturingFolder");
const EmailSentSave = require("../EmailSentSave");
const EmailSystemCategory = require("../EmailSystemCategory");
const EmailSystemFolder = require("../EmailSystemFolder");
const EmailSystemTemplate = require("../EmailSystemTemplate");
const EmailTemplates = require("../EmailTemplates");
const MarketingEmail = require("../MarketingEmail");
const Kanban = require("../Kanban");
const Label = require("../Label");
const Board = require("../Board");
const Workspace = require("../Workspace");
const Notes = require("../Notes");
const Progression = require("../Progression");
const Category = require("../Category");
const RankCategory = require("../RankCategory");
const Organization = require("../Organization");
const OrganizationLocation = require("../OrganizationLocation");
const Goal = require("../Goal");
const SmartList = require("../Smartlists");
const SmartListItem = require("../SmartListItem");

// NLM
const NLMAdmin = require("../NLMAdmin");

const models = {
  // Client
  Authenticate,
  Admin,
  AEmployee,
  User,
  UEmployee,
  Temp,
  ClientContact,
  ClientPosition,
  Course,
  LeadPosition,
  VendorPosition,
  UserToken,
  TaskContact,
  Project,
  Task,
  Roles,
  Employee,
  EmployeeContact,
  EmployeePosition,
  CheckList,
  ScheduleCheckList,
  ScheduleTask,
  ResetPass,
  MenuData,
  // NLM Admin
  NLMAdmin,
  Document,
  DocumentRecipient,
  DocumentFolder,
  DocumentSubfolder,
  DocumentSignature,
  Shop,
  Customer,
  Invoice,
  Membership,
  Product,
  // StripeCustomer,
  Candidate,
  CandidateStripe,
  MarketingEmail,
  EmailComposeCategory,
  EmailComposeFolder,
  EmailKey,
  EmailLibraryCategory,
  EmailLibraryFolder,
  EmailNurturingCategory,
  EmailNurturingFolder,
  EmailSentSave,
  EmailSystemCategory,
  EmailSystemFolder,
  EmailSystemTemplate,
  EmailTemplates,
  Program,
  ProgramRank,
  Kanban,
  Label,
  Board,
  Workspace,
  Notes,
  Progression,
  Category,
  RankCategory,
  Organization,
  OrganizationLocation,
  Goal,
  SmartList,
  SmartListItem,
  EmployeeTask,
  EmployeeShift,
  EmployeeGroup,
  EmployeeSchedule,
  Cart,
  //MembershipSales,
};

module.exports = models;
