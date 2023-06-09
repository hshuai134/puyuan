import request from "./request";

export const getErrRecord = (params) => request.get('/api/puyuanwcs/get/tbmcserrorrecord', params)

export const getScanerRecord = (params) => request.get('/api/puyuanwcs/get/tbmcsmsgrecord', params)
