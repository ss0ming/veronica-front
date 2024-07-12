// login, logout
export const API_LOGIN = "http://localhost:8080/api/user/login"
export const API_LOGOUT = "http://localhost:8080/api/user/logout"

// duplicate
export const API_DUPLICATE_EMAIL = "http://localhost:8080/api/user/check-duplicate-email"
export const API_DUPLICATE_NICKNAME = "http://localhost:8080/api/user/check-duplicate-nickname"

// user
export const API_ONE_USER = "http://localhost:8080/api/user"
export const API_USERS = "http://localhost:8080/api/user"
export const API_SIGN_UP = "http://localhost:8080/api/user/sign-up"
export const API_PROFILE = "http://localhost:8080/api/user/nickname"
export const API_PASSWORD = "http://localhost:8080/api/user/password"
export const API_USER_IMAGE = "http://localhost:8080/api/user"


//posts
export const API_POSTS = "http://localhost:8080/api/articles"
export const API_POST = "http://localhost:8080/api/articles/:postId"

// comments
export const API_COMMENTS = "http://localhost:8080/api/articles/:postId/comments"
export const API_COMMENT = "http://localhost:8080/api/articles/:postId/comments/:commentId"