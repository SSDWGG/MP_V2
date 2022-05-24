export const phoneNumberReg = /^1\d{10}$/;
export const emailReg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-_]+(\.[a-zA-Z0-9-_]+)*\.[a-zA-Z0-9-_]{2,6}$/;
export const loginPasswordReg = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])[0-9a-zA-Z]{8,20}$/;

// 标签：字母、汉字、数字、空格
export const labelReg = /^[0-9a-zA-Z\u4e00-\u9fa5 ]+$/;
