export const LOGIN_ROUTE = "/login";
export const ADMIN_LOGIN_ROUTE = "/admin/login";
export const HOME_ROUTE = "/";
export const TRANSACTION_ROUTE = "/transactions";
export const DASHBOARD_ROUTE = "/dashboard";
export const X_HASURA_ROLE = "user";
export const X_HASURA_ADMIN_SECRET =
  "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF";

export const API_GET_USER_ID =
  "https://bursting-gelding-24.hasura.app/api/rest/get-user-id";
export const API_PROFILE_URL =
  "https://bursting-gelding-24.hasura.app/api/rest/profile";
export const API_ALL_TRANSACTIONS =
  "https://bursting-gelding-24.hasura.app/api/rest/all-transactions";
export const API_TOTAL_DEBIT_CREDIT_TRANSACTIONS =
  "https://bursting-gelding-24.hasura.app/api/rest/credit-debit-totals";
export const API_ADD_TRANSACTION =
  "https://bursting-gelding-24.hasura.app/api/rest/add-transaction";
export const API_DELETE_TRANSACTION =
  "https://bursting-gelding-24.hasura.app/api/rest/delete-transaction?id=";
export const API_UPDATE_TRANSACTION =
  "https://bursting-gelding-24.hasura.app/api/rest/update-transaction";

export const SIDEBAR_OPTIONS = ["dashboard", "transactions"];
export const NUMBER_OF_TRANSACTIONS = 3;
export const LOCALSTORAGE_KEY = "userData";
export const INITIAL_ACTIVE_TAB = "transactions";
export const TAB_OPTIONS = ["transactions", "credit", "debit"];

export const CATEGORY_OPTIONS = [
  { value: "", name: "Select Category" },
  { value: "food", name: "Food" },
  { value: "shopping", name: "Shopping" },
  { value: "entertainment", name: "Entertainment" },
];

export const TRANSACTION_TYPES = [
  { value: "", name: "Select Transaction Type" },
  { value: "credit", name: "Credit" },
  { value: "debit", name: "Debit" },
];
