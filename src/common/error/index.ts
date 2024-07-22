export const USER_NOT_FOUND = {
  error: 'Not Found',
  statusCode: 404,
  message: 'Tài khoản không tồn tại',
};

export const USER_EXISTED = {
  error: 'Duplicate',
  statusCode: 400,
  message: 'Tài khoản đã tồn tại',
};

export const PASSWORD_INCORRECT = {
  error: 'Unauthorized ',
  statusCode: 401,
  message: 'Mật khẩu không chính xác',
};

export const ROLE_EXISTED = {
  error: 'Not Found',
  statusCode: 400,
  message: 'Quyền người dùng đã tồn tại',
};
