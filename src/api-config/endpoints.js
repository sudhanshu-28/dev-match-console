export const BASE_URL = import.meta.env.VITE_APP_BACKEND_URL;

// Auth
export const LOGIN_API = "/auth/login";
export const LOGOUT_API = "/auth/logout";
export const SIGNUP_API = "/auth/signup";

// Profile
export const PROFILE_VIEW_API = "/profile/view";
export const PROFILE_EDIT_API = "/profile/edit";

// User
export const FEED_API = "/user/feed";
export const CONNECTIONS_API = "/user/connections";
export const REQUEST_RECEIVED_API = "/user/requests/received";

// Request
export const REQUEST_SEND_API = "/request/send";
export const REQUEST_REVIEW_API = "/request/review";
