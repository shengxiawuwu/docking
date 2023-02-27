let baseUrl = "https://api-erp-dev.yaofangwang.com/";
// 统一配置
let ST_REQUEST = null;
function formatHttp(axios, requestObj) {
  axios.defaults.withCredentials = true;
  ST_REQUEST = axios.create({
    baseURL: baseUrl,
    validateStatus(status) {
      // 200 外的状态码都认定为失败
      return status === 200;
    },
  });

  // 拦截请求
  ST_REQUEST.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // 拦截响应
  ST_REQUEST.interceptors.response.use(
    (config) => {
      let data = {};
      if (typeof config.data == "object") {
        data = JSON.parse(JSON.stringify(config.data));
      } else {
        let str = config.data;
        data = eval("(" + str + ")");
      }

      if (data.code === 1) {
        return data;
      } else {
        return Promise.reject(data);
      }
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  if (requestObj.method === "post") {
    return post(requestObj.url, requestObj.data);
  }
}
function post(url, params = {}) {
  return ST_REQUEST.post(url, params, {
    transformRequest: [
      (params) => {
        let result = "";
        Object.keys(params).forEach((key) => {
          if (
            !Object.is(params[key], undefined) &&
            !Object.is(params[key], null)
          ) {
            result +=
              encodeURIComponent(key) +
              "=" +
              encodeURIComponent(params[key]) +
              "&";
          }
        });
        return result;
      },
    ],
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
