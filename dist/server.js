"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// .yarn/cache/object-assign-npm-4.1.1-1004ad6dec-1f4df99451.zip/node_modules/object-assign/index.js
var require_object_assign = __commonJS({
  ".yarn/cache/object-assign-npm-4.1.1-1004ad6dec-1f4df99451.zip/node_modules/object-assign/index.js"(exports2, module2) {
    "use strict";
    var getOwnPropertySymbols = Object.getOwnPropertySymbols;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var propIsEnumerable = Object.prototype.propertyIsEnumerable;
    function toObject(val) {
      if (val === null || val === void 0) {
        throw new TypeError("Object.assign cannot be called with null or undefined");
      }
      return Object(val);
    }
    function shouldUseNative() {
      try {
        if (!Object.assign) {
          return false;
        }
        var test1 = new String("abc");
        test1[5] = "de";
        if (Object.getOwnPropertyNames(test1)[0] === "5") {
          return false;
        }
        var test2 = {};
        for (var i = 0; i < 10; i++) {
          test2["_" + String.fromCharCode(i)] = i;
        }
        var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
          return test2[n];
        });
        if (order2.join("") !== "0123456789") {
          return false;
        }
        var test3 = {};
        "abcdefghijklmnopqrst".split("").forEach(function(letter) {
          test3[letter] = letter;
        });
        if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
          return false;
        }
        return true;
      } catch (err) {
        return false;
      }
    }
    module2.exports = shouldUseNative() ? Object.assign : function(target, source) {
      var from;
      var to = toObject(target);
      var symbols;
      for (var s = 1; s < arguments.length; s++) {
        from = Object(arguments[s]);
        for (var key in from) {
          if (hasOwnProperty.call(from, key)) {
            to[key] = from[key];
          }
        }
        if (getOwnPropertySymbols) {
          symbols = getOwnPropertySymbols(from);
          for (var i = 0; i < symbols.length; i++) {
            if (propIsEnumerable.call(from, symbols[i])) {
              to[symbols[i]] = from[symbols[i]];
            }
          }
        }
      }
      return to;
    };
  }
});

// .yarn/cache/vary-npm-1.1.2-b49f70ae63-f15d588d79.zip/node_modules/vary/index.js
var require_vary = __commonJS({
  ".yarn/cache/vary-npm-1.1.2-b49f70ae63-f15d588d79.zip/node_modules/vary/index.js"(exports2, module2) {
    "use strict";
    module2.exports = vary;
    module2.exports.append = append;
    var FIELD_NAME_REGEXP = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;
    function append(header, field) {
      if (typeof header !== "string") {
        throw new TypeError("header argument is required");
      }
      if (!field) {
        throw new TypeError("field argument is required");
      }
      var fields = !Array.isArray(field) ? parse(String(field)) : field;
      for (var j = 0; j < fields.length; j++) {
        if (!FIELD_NAME_REGEXP.test(fields[j])) {
          throw new TypeError("field argument contains an invalid header name");
        }
      }
      if (header === "*") {
        return header;
      }
      var val = header;
      var vals = parse(header.toLowerCase());
      if (fields.indexOf("*") !== -1 || vals.indexOf("*") !== -1) {
        return "*";
      }
      for (var i = 0; i < fields.length; i++) {
        var fld = fields[i].toLowerCase();
        if (vals.indexOf(fld) === -1) {
          vals.push(fld);
          val = val ? val + ", " + fields[i] : fields[i];
        }
      }
      return val;
    }
    function parse(header) {
      var end = 0;
      var list = [];
      var start = 0;
      for (var i = 0, len = header.length; i < len; i++) {
        switch (header.charCodeAt(i)) {
          case 32:
            if (start === end) {
              start = end = i + 1;
            }
            break;
          case 44:
            list.push(header.substring(start, end));
            start = end = i + 1;
            break;
          default:
            end = i + 1;
            break;
        }
      }
      list.push(header.substring(start, end));
      return list;
    }
    function vary(res, field) {
      if (!res || !res.getHeader || !res.setHeader) {
        throw new TypeError("res argument is required");
      }
      var val = res.getHeader("Vary") || "";
      var header = Array.isArray(val) ? val.join(", ") : String(val);
      if (val = append(header, field)) {
        res.setHeader("Vary", val);
      }
    }
  }
});

// .yarn/cache/cors-npm-2.8.5-c9935a2d12-373702b799.zip/node_modules/cors/lib/index.js
var require_lib = __commonJS({
  ".yarn/cache/cors-npm-2.8.5-c9935a2d12-373702b799.zip/node_modules/cors/lib/index.js"(exports2, module2) {
    "use strict";
    (function() {
      "use strict";
      var assign = require_object_assign();
      var vary = require_vary();
      var defaults = {
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false,
        optionsSuccessStatus: 204
      };
      function isString(s) {
        return typeof s === "string" || s instanceof String;
      }
      function isOriginAllowed(origin, allowedOrigin) {
        if (Array.isArray(allowedOrigin)) {
          for (var i = 0; i < allowedOrigin.length; ++i) {
            if (isOriginAllowed(origin, allowedOrigin[i])) {
              return true;
            }
          }
          return false;
        } else if (isString(allowedOrigin)) {
          return origin === allowedOrigin;
        } else if (allowedOrigin instanceof RegExp) {
          return allowedOrigin.test(origin);
        } else {
          return !!allowedOrigin;
        }
      }
      function configureOrigin(options, req) {
        var requestOrigin = req.headers.origin, headers = [], isAllowed;
        if (!options.origin || options.origin === "*") {
          headers.push([{
            key: "Access-Control-Allow-Origin",
            value: "*"
          }]);
        } else if (isString(options.origin)) {
          headers.push([{
            key: "Access-Control-Allow-Origin",
            value: options.origin
          }]);
          headers.push([{
            key: "Vary",
            value: "Origin"
          }]);
        } else {
          isAllowed = isOriginAllowed(requestOrigin, options.origin);
          headers.push([{
            key: "Access-Control-Allow-Origin",
            value: isAllowed ? requestOrigin : false
          }]);
          headers.push([{
            key: "Vary",
            value: "Origin"
          }]);
        }
        return headers;
      }
      function configureMethods(options) {
        var methods = options.methods;
        if (methods.join) {
          methods = options.methods.join(",");
        }
        return {
          key: "Access-Control-Allow-Methods",
          value: methods
        };
      }
      function configureCredentials(options) {
        if (options.credentials === true) {
          return {
            key: "Access-Control-Allow-Credentials",
            value: "true"
          };
        }
        return null;
      }
      function configureAllowedHeaders(options, req) {
        var allowedHeaders = options.allowedHeaders || options.headers;
        var headers = [];
        if (!allowedHeaders) {
          allowedHeaders = req.headers["access-control-request-headers"];
          headers.push([{
            key: "Vary",
            value: "Access-Control-Request-Headers"
          }]);
        } else if (allowedHeaders.join) {
          allowedHeaders = allowedHeaders.join(",");
        }
        if (allowedHeaders && allowedHeaders.length) {
          headers.push([{
            key: "Access-Control-Allow-Headers",
            value: allowedHeaders
          }]);
        }
        return headers;
      }
      function configureExposedHeaders(options) {
        var headers = options.exposedHeaders;
        if (!headers) {
          return null;
        } else if (headers.join) {
          headers = headers.join(",");
        }
        if (headers && headers.length) {
          return {
            key: "Access-Control-Expose-Headers",
            value: headers
          };
        }
        return null;
      }
      function configureMaxAge(options) {
        var maxAge = (typeof options.maxAge === "number" || options.maxAge) && options.maxAge.toString();
        if (maxAge && maxAge.length) {
          return {
            key: "Access-Control-Max-Age",
            value: maxAge
          };
        }
        return null;
      }
      function applyHeaders(headers, res) {
        for (var i = 0, n = headers.length; i < n; i++) {
          var header = headers[i];
          if (header) {
            if (Array.isArray(header)) {
              applyHeaders(header, res);
            } else if (header.key === "Vary" && header.value) {
              vary(res, header.value);
            } else if (header.value) {
              res.setHeader(header.key, header.value);
            }
          }
        }
      }
      function cors2(options, req, res, next) {
        var headers = [], method = req.method && req.method.toUpperCase && req.method.toUpperCase();
        if (method === "OPTIONS") {
          headers.push(configureOrigin(options, req));
          headers.push(configureCredentials(options, req));
          headers.push(configureMethods(options, req));
          headers.push(configureAllowedHeaders(options, req));
          headers.push(configureMaxAge(options, req));
          headers.push(configureExposedHeaders(options, req));
          applyHeaders(headers, res);
          if (options.preflightContinue) {
            next();
          } else {
            res.statusCode = options.optionsSuccessStatus;
            res.setHeader("Content-Length", "0");
            res.end();
          }
        } else {
          headers.push(configureOrigin(options, req));
          headers.push(configureCredentials(options, req));
          headers.push(configureExposedHeaders(options, req));
          applyHeaders(headers, res);
          next();
        }
      }
      function middlewareWrapper(o) {
        var optionsCallback = null;
        if (typeof o === "function") {
          optionsCallback = o;
        } else {
          optionsCallback = function(req, cb) {
            cb(null, o);
          };
        }
        return function corsMiddleware(req, res, next) {
          optionsCallback(req, function(err, options) {
            if (err) {
              next(err);
            } else {
              var corsOptions = assign({}, defaults, options);
              var originCallback = null;
              if (corsOptions.origin && typeof corsOptions.origin === "function") {
                originCallback = corsOptions.origin;
              } else if (corsOptions.origin) {
                originCallback = function(origin, cb) {
                  cb(null, corsOptions.origin);
                };
              }
              if (originCallback) {
                originCallback(req.headers.origin, function(err2, origin) {
                  if (err2 || !origin) {
                    next(err2);
                  } else {
                    corsOptions.origin = origin;
                    cors2(corsOptions, req, res, next);
                  }
                });
              } else {
                next();
              }
            }
          });
        };
      }
      module2.exports = middlewareWrapper;
    })();
  }
});

// src/server.ts
var import_config = require("dotenv/config");
var import_express10 = __toESM(require("express"));
var import_cors = __toESM(require_lib());
var import_helmet = __toESM(require("helmet"));

// src/libs/pg.ts
var import_pg = require("pg");
var client = null;
var connect = () => __async(void 0, null, function* () {
  console.log("Connecting to DB");
  client = new import_pg.Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME
  });
  try {
    yield client.query("SELECT 1+1");
    console.log("Connected to DB");
  } catch (error) {
    console.error("Failed to connect to DB", error);
    throw error;
  }
});
var query = (_0, _1, ..._2) => __async(void 0, [_0, _1, ..._2], function* (sql, params, log = process.env.LOG) {
  if (client) {
    try {
      if (log) {
        console.log(sql, JSON.stringify(params));
      }
      return yield client.query(sql, params);
    } catch (error) {
      console.error("Query failed", error);
      throw new Error("Database Error");
    }
  }
  console.log("Not connected to DB");
  return void 0;
});
var disconnect = () => __async(void 0, null, function* () {
  if (client) {
    console.log("Disconnecting from DB");
    try {
      yield client.end();
      console.log("Disconnected from DB");
    } catch (error) {
      console.error("Failed to disconnect from DB", error);
      throw error;
    }
  } else {
    console.log("Not connected to DB");
  }
});
var pg_default = { connect, disconnect };

// src/error/not-found.ts
var import_http_status_codes = require("http-status-codes");
var notFoundHandler = (req, res) => {
  const response = {
    status: import_http_status_codes.StatusCodes.NOT_FOUND,
    message: `Not found: ${req.originalUrl}`
  };
  res.status(404).json(response);
};

// src/error/error.ts
var import_http_status_codes2 = require("http-status-codes");
var errorHandler = (error, req, res, next) => {
  const response = {
    status: import_http_status_codes2.StatusCodes.INTERNAL_SERVER_ERROR,
    message: error.message
  };
  console.log(error);
  return res.status(import_http_status_codes2.StatusCodes.INTERNAL_SERVER_ERROR).json(response);
};

// src/middleware/token-middleware.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var verifyToken = (req, res, next) => __async(void 0, null, function* () {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }
  const token = authHeader;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const decoded = import_jsonwebtoken.default.verify(token, "test");
    const { user } = decoded;
    const checkQuery = yield query(
      `
    SELECT id
    FROM public."users"
    WHERE email=$1
    `,
      [user.email]
    );
    if ((checkQuery == null ? void 0 : checkQuery.rowCount) === 0) {
      return res.status(401).json({ message: "User does not exist" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
});

// src/server.ts
var import_cookie_parser = __toESM(require("cookie-parser"));

// src/route/employee-route.ts
var import_express = __toESM(require("express"));

// src/helper/async-helper.ts
var asyncHandler = (asyncFnc) => {
  return (req, res, next) => {
    Promise.resolve(asyncFnc(req, res)).catch(next);
  };
};

// src/controller/employee-controller.ts
var import_http_status_codes3 = require("http-status-codes");

// src/services/employee-service.ts
var _EmployeeService = class _EmployeeService {
};
_EmployeeService.GET_ALL = (limit, currentPage, searchStr) => __async(_EmployeeService, null, function* () {
  var _a;
  const whereClauses = [];
  const queryParams = [];
  let limitQuery = "";
  let offsetQuery = "";
  if (searchStr) {
    whereClauses.push(`u::text ILIKE $${queryParams.length + 1} OR r::text ILIKE $${queryParams.length + 1}`);
    queryParams.push(`%${searchStr}%`);
  }
  limitQuery = `LIMIT $${queryParams.length + 1}`;
  queryParams.push(limit);
  offsetQuery = `OFFSET $${queryParams.length + 1}`;
  queryParams.push((currentPage - 1) * limit);
  const whereClause = whereClauses.length > 0 ? " WHERE " + whereClauses.join(" AND ") : "";
  const queryString = `
      SELECT 
        u.id, 
        u.email, 
        u.full_name AS name, 
        u.phone, 
        r.display_name AS role,
        u.level
      FROM users u 
      LEFT JOIN roles r ON u.role_id = r.id
      ${whereClause}
      ORDER BY u.id ASC
      ${limitQuery}
      ${offsetQuery}
    `;
  const countQueryString = `
      SELECT COUNT(*) AS total 
      FROM users u 
      LEFT JOIN roles r ON u.role_id = r.id 
      ${whereClause}
    `;
  const result = yield query(queryString, queryParams);
  const countResult = yield query(countQueryString, searchStr ? [queryParams[0]] : []);
  const totalRecords = Number(((_a = countResult == null ? void 0 : countResult.rows[0]) == null ? void 0 : _a.total) || 0);
  const totalPages = Math.ceil(totalRecords / limit);
  return {
    totalItems: totalRecords,
    totalPages,
    currentPage,
    limit,
    search: searchStr || null,
    rowPerPages: [5, 10, 15],
    employees: result == null ? void 0 : result.rows
  };
});
_EmployeeService.GET_BY_ID = (employeeId) => __async(_EmployeeService, null, function* () {
  const fethUserInfoByIdResult = yield query(`
    SELECT
      u.id, 
      u.email, 
      u.full_name AS name, 
      u.phone,
      u.role_id,
      r.display_name AS role,
      u.level
    FROM public."users" u
    LEFT JOIN roles r ON u.role_id = r.id
    WHERE u.id = $1::integer
    `, [employeeId]);
  return fethUserInfoByIdResult == null ? void 0 : fethUserInfoByIdResult.rows.at(0);
});
_EmployeeService.DELETE = (employeeId) => __async(_EmployeeService, null, function* () {
  yield query(`
      DELETE FROM public."users" 
      WHERE id=$1::integer
    `, [employeeId]);
});
_EmployeeService.STORE = (employee) => __async(_EmployeeService, null, function* () {
  const { email, full_name, username, password, phone, role_id, level } = employee;
  const storeEmployeeResult = yield query(`
    INSERT INTO public."users" (
      email,
      full_name,
      username,
      password,
      role_id,
      phone,
      level
    ) VALUES ($1, $2, $3, $4, $5::integer, $6, $7) 
    RETURNING *
    `, [email, full_name, username, password, role_id, phone, level]);
  return storeEmployeeResult == null ? void 0 : storeEmployeeResult.rows.at(0);
});
_EmployeeService.UPDATE = (employee) => __async(_EmployeeService, null, function* () {
  const { email, full_name, username, password, phone, role_id, level, id } = employee;
  const updateEmployeeResult = yield query(`
    UPDATE public."users"
    SET 
      email=$1, 
      full_name=$2, 
      username=$3, 
      password=$4, 
      role_id=$5::integer,
      phone=$6,
      level=$7
    WHERE id=$8::integer 
    RETURNING *
    `, [email, full_name, username, password, role_id, phone, level, id]);
  return updateEmployeeResult == null ? void 0 : updateEmployeeResult.rows.at(0);
});
_EmployeeService.GET_EMPLOYEE_LEVEL = (user_id) => __async(_EmployeeService, null, function* () {
  const result = yield query(`
    SELECT level FROM public."users" WHERE id=$1::integer
  `, [user_id]);
  return result == null ? void 0 : result.rows.at(0);
});
var EmployeeService = _EmployeeService;
var employee_service_default = EmployeeService;

// src/controller/employee-controller.ts
var getAllEmployessClient = asyncHandler((req, res) => __async(void 0, null, function* () {
  const test = yield employee_service_default.GET_ALL();
  res.json(test);
}));
var getAllEmployees = asyncHandler((req, res) => __async(void 0, null, function* () {
  const defaultLimit = 10;
  const defaultPage = 1;
  const limit = parseInt(req.query.limit, 10) || defaultLimit;
  const currentPage = parseInt(req.query.page, 10) || defaultPage;
  const searchStr = req.query.search;
  const result = yield employee_service_default.GET_ALL(
    limit,
    currentPage,
    searchStr
  );
  res.status(import_http_status_codes3.StatusCodes.OK).json({
    status: import_http_status_codes3.StatusCodes.OK,
    success: true,
    data: result
  });
}));
var getEmployeeById = asyncHandler((req, res) => __async(void 0, null, function* () {
  const result = yield employee_service_default.GET_BY_ID(req.params.user_id);
  res.status(import_http_status_codes3.StatusCodes.OK).json({
    status: import_http_status_codes3.StatusCodes.OK,
    success: true,
    data: result
  });
}));
var deleteEmployee = asyncHandler((req, res) => __async(void 0, null, function* () {
  yield employee_service_default.DELETE(
    Number(req.params.user_id)
  );
  res.status(import_http_status_codes3.StatusCodes.OK).json({
    status: import_http_status_codes3.StatusCodes.OK,
    success: true,
    message: `Employee has been successfully deleted`
  });
}));
var createEmployee = asyncHandler((req, res) => __async(void 0, null, function* () {
  const result = yield employee_service_default.STORE(req.body);
  res.status(import_http_status_codes3.StatusCodes.OK).json({
    status: import_http_status_codes3.StatusCodes.CREATED,
    success: true,
    message: `User is created successfully`,
    data: result
  });
}));
var updateEmployee = asyncHandler((req, res) => __async(void 0, null, function* () {
  const result = yield employee_service_default.UPDATE(req.body);
  res.status(import_http_status_codes3.StatusCodes.OK).json({
    status: import_http_status_codes3.StatusCodes.OK,
    success: true,
    message: `User updated successfully`,
    data: result
  });
}));

// src/middleware/validation-middleware.ts
var import_zod = require("zod");
var import_http_status_codes4 = require("http-status-codes");
var validateData = (schema) => {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof import_zod.ZodError) {
        const errorMessages = error.errors.reduce((acc, issue) => {
          acc[issue.path.join(".")] = issue.message;
          return acc;
        }, {});
        const errorResponse = {
          status: import_http_status_codes4.StatusCodes.BAD_REQUEST,
          message: errorMessages
        };
        res.status(import_http_status_codes4.StatusCodes.BAD_REQUEST).json(errorResponse);
      } else {
        res.status(import_http_status_codes4.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
      }
    }
  };
};

// src/schema/user-schema.ts
var import_zod2 = require("zod");
var CreateUserSchema = import_zod2.z.object({
  email: import_zod2.z.string({ message: "The email field is required" }).email({ message: "Please provide a valid email address" }).min(1, { message: "The email field cannot be empty" }).max(100, { message: "The email address cannot exceed 100 characters" }),
  password: import_zod2.z.string({ message: "The password field is required" }).min(1, { message: "The password field cannot be empty" }).max(100, { message: "The password cannot exceed 100 characters" }),
  full_name: import_zod2.z.string({ message: "The full name field is required" }).min(1, { message: "The full name field cannot be empty" }).max(100, { message: "The full name cannot exceed 100 characters" }),
  username: import_zod2.z.string({ message: "The username field is required" }).min(1, { message: "The username field cannot be empty" }).max(100, { message: "The username cannot exceed 100 characters" }),
  role_id: import_zod2.z.number({ message: "The role ID field is required" }).min(1, { message: "Role ID must be at least 1" }),
  phone: import_zod2.z.string({ message: "The phone field is required" }),
  level: import_zod2.z.enum(["hr", "employee", "lead"], { message: "The value you provide is not acceptable" })
});
var UpdateUserProfileSchema = import_zod2.z.object({
  email: import_zod2.z.string({ message: "The email field is required" }).email({ message: "Please provide a valid email address" }).min(1, { message: "The email field cannot be empty" }).max(100, { message: "The email address cannot exceed 100 characters" }),
  password: import_zod2.z.string({ message: "The password field is required" }).min(1, { message: "The password field cannot be empty" }).max(100, { message: "The password cannot exceed 100 characters" }),
  full_name: import_zod2.z.string({ message: "The full name field is required" }).min(1, { message: "The full name field cannot be empty" }).max(100, { message: "The full name cannot exceed 100 characters" }),
  username: import_zod2.z.string({ message: "The username field is required" }).min(1, { message: "The username field cannot be empty" }).max(100, { message: "The username cannot exceed 100 characters" }),
  role_id: import_zod2.z.number({ message: "The role_id field is required" }).min(1, { message: "The username field cannot be empty" }),
  phone: import_zod2.z.string({ message: "The phone field is required" }).min(1, { message: "The username field cannot be empty" }).max(100, { message: "The username cannot exceed 100 characters" })
});

// src/route/employee-route.ts
var route = import_express.default.Router();
route.get("/", getAllEmployees);
route.get("/client", getAllEmployessClient);
route.post("/", validateData(CreateUserSchema), createEmployee);
route.delete("/:user_id", deleteEmployee);
route.get("/:user_id", getEmployeeById);
route.put("/", validateData(UpdateUserProfileSchema), updateEmployee);
var employee_route_default = route;

// src/route/team-route.ts
var import_express2 = __toESM(require("express"));

// src/services/team-service.ts
var _TeamService = class _TeamService {
};
_TeamService.CREATE_TEAM = (team) => __async(_TeamService, null, function* () {
  const result = yield query(`
    INSERT INTO teams (
      name
    ) VALUES ($1)
    RETURNING *
    `, [team.name]);
  return result == null ? void 0 : result.rows.at(0);
});
_TeamService.GET = () => __async(_TeamService, null, function* () {
  const result = yield query(`
      SELECT 
        * 
      FROM teams
      ORDER BY id ASC
    `);
  return result == null ? void 0 : result.rows;
});
_TeamService.GET_BY_ID = (team_id) => __async(_TeamService, null, function* () {
  const result = yield query(`
    SELECT
      *
    FROM teams
    WHERE id=$1::integer
    `, [team_id]);
  return result == null ? void 0 : result.rows.at(0);
});
_TeamService.DELETE_TEAM = (team_id) => __async(_TeamService, null, function* () {
  yield query(`
      DELETE FROM teams
      WHERE id=$1::integer
    `, [team_id]);
  yield query(`
      DELETE FROM team_user
      WHERE team_id=$1::integer
    `, [team_id]);
});
var TeamService = _TeamService;
var team_service_default = TeamService;

// src/services/team-role-service.ts
var _TeamUserService = class _TeamUserService {
};
_TeamUserService.GET_TEAM_MEMBER = (team_id) => __async(_TeamUserService, null, function* () {
  const result = yield query(`
      SELECT
        u.email,
        u.full_name,
        u.username,
        u.phone,
        r.display_name AS role,
        u.level
      FROM team_user tu
      JOIN public."users" u ON tu.user_id=u.id
      JOIN roles r ON u.role_id=r.id
      WHERE team_id=$1::integer
    `, [team_id]);
  return result == null ? void 0 : result.rows;
});
_TeamUserService.GET_USER_TEAM = (user_id) => __async(_TeamUserService, null, function* () {
  const result = yield query(`
    SELECT
      team_id
    FROM 
      team_user
    WHERE
      user_id=$1::integer
    `, [user_id]);
  return result == null ? void 0 : result.rows;
});
_TeamUserService.ADD_MEMBER = (user_id, team_id) => __async(_TeamUserService, null, function* () {
  const result = yield query(`
      INSERT INTO team_user (
        user_id,
        team_id
      ) VALUES ($1::integer, $2::integer)
      RETURNING *
    `, [user_id, team_id]);
  return result == null ? void 0 : result.rows.at(0);
});
_TeamUserService.CHECK_MEMBER_EXISTANCE = (user_id, team_id) => __async(_TeamUserService, null, function* () {
  const result = yield query(`
      SELECT
        *
      FROM team_user
      WHERE
        user_id=$1::integer
      AND 
        team_id=$2::integer
    `, [user_id, team_id]);
  return (result == null ? void 0 : result.rowCount) ? true : false;
});
_TeamUserService.REMOVE_MEMBER = (user_id, team_id) => __async(_TeamUserService, null, function* () {
  yield query(`
      DELETE FROM team_user
      WHERE user_id=$1::integer
      AND team_id=$2::integer
    `, [user_id, team_id]);
});
_TeamUserService.CHECK_LEAD_EXISTENCE = (team_id) => __async(_TeamUserService, null, function* () {
  const result = yield query(`
    SELECT 1 FROM team_user tu
    JOIN public."users" u ON tu.user_id = u.id
    WHERE tu.team_id = $1::integer
    AND u.level = 'lead'
  `, [team_id]);
  return (result == null ? void 0 : result.rowCount) ? true : false;
});
var TeamUserService = _TeamUserService;
var team_role_service_default = TeamUserService;

// src/services/team-project-service.ts
var _TeamProjectService = class _TeamProjectService {
};
_TeamProjectService.ASSIGN_PROJECT = (project_id, team_id) => __async(_TeamProjectService, null, function* () {
  const result = yield query(`
    INSERT INTO team_project (
      team_id,
      project_id
    ) VALUES (
      $1::integer, 
      $2::integer
    )
    RETURNING *
    `, [team_id, project_id]);
  return result == null ? void 0 : result.rows.at(0);
});
_TeamProjectService.GET_BY_ID = (project_id, team_id) => __async(_TeamProjectService, null, function* () {
  const result = yield query(`
    SELECT * FROM 
      team_project 
    WHERE
      team_id=$1::integer
    AND
      project_id=$2::integer
    `, [team_id, project_id]);
  return result == null ? void 0 : result.rows.at(0);
});
_TeamProjectService.GET_BY_TEAM_ID = (team_id) => __async(_TeamProjectService, null, function* () {
  const result = yield query(`
    SELECT 
      p.*
    FROM 
      team_project tp
    JOIN
      project p
    ON 
      tp.project_id=p.id
    WHERE
      tp.project_id=$1::integer
    `, [team_id]);
  return result == null ? void 0 : result.rows;
});
_TeamProjectService.REMOVE_PROJECT = (project_id, team_id) => __async(_TeamProjectService, null, function* () {
  const result = yield query(`
    DELETE FROM
      team_project
    WHERE
      project_id=$1::integer
    AND
      team_id=$2::integer
    `, [project_id, team_id]);
});
var TeamProjectService = _TeamProjectService;
var team_project_service_default = TeamProjectService;

// src/controller/team-controller.ts
var _TeamController = class _TeamController {
};
_TeamController.INDEX = asyncHandler((req, res) => __async(_TeamController, null, function* () {
  const result = yield team_service_default.GET();
  res.status(200).json({
    status: 200,
    success: true,
    data: result
  });
}));
// SHOW
_TeamController.SHOW = asyncHandler((req, res) => __async(_TeamController, null, function* () {
  const team_id = Number(req.body.team_id);
  const teamDetailsResult = yield team_service_default.GET_BY_ID(team_id);
  const memberResult = yield team_role_service_default.GET_TEAM_MEMBER(team_id);
  res.status(200).json({
    status: 200,
    success: true,
    data: {
      team: teamDetailsResult,
      members: memberResult
    }
  });
}));
_TeamController.CREATE_TEAM = asyncHandler((req, res) => __async(_TeamController, null, function* () {
  const result = yield team_service_default.CREATE_TEAM(req.body);
  res.status(201).json({
    status: 201,
    success: true,
    message: "Team has been created sucessfully",
    data: result
  });
}));
_TeamController.ADD_MEMBER = asyncHandler((req, res) => __async(_TeamController, null, function* () {
  const user_id = Number(req.body.user_id);
  const team_id = Number(req.body.team_id);
  const validation = yield Validation.validateMembership(user_id, team_id);
  if (!validation.valid) {
    return res.status(403).json({
      status: 403,
      message: validation.message
    });
  }
  const result = yield team_role_service_default.ADD_MEMBER(
    user_id,
    team_id
  );
  res.status(201).json({
    status: 201,
    success: true,
    message: `Employee has been successfully added into the team`,
    data: result
  });
}));
_TeamController.REMOVE_MEMBER = asyncHandler((req, res) => __async(_TeamController, null, function* () {
  const user_id = Number(req.body.user_id);
  const team_id = Number(req.body.team_id);
  const result = yield team_role_service_default.REMOVE_MEMBER(user_id, team_id);
  res.status(200).json({
    status: 200,
    success: true,
    message: `Employee has been successfully removed from the team`,
    data: result
  });
}));
_TeamController.DESTROY = asyncHandler((req, res) => __async(_TeamController, null, function* () {
  const team_id = Number(req.body.team_id);
  yield team_service_default.DELETE_TEAM(team_id);
  res.status(200).json({
    status: 200,
    success: true,
    message: `Team has been successfully deleted`
  });
}));
_TeamController.ASSIGN_PROJECT = asyncHandler((req, res) => __async(_TeamController, null, function* () {
  const team_id = Number(req.body.team_id);
  const project_id = Number(req.body.project_id);
  const { valid, message: validationMessage } = yield Validation.validateProjectOwnership(project_id, team_id);
  if (!valid) {
    return res.status(401).json({
      status: 403,
      message: validationMessage
    });
  }
  const result = yield team_project_service_default.ASSIGN_PROJECT(project_id, team_id);
  return res.status(201).json({
    status: 201,
    success: true,
    message: `Project has been assigned to the team soccessfully!`,
    data: result
  });
}));
_TeamController.REMOVE_PROJECT_FROM_TEAM = asyncHandler((req, res) => __async(_TeamController, null, function* () {
  const team_id = Number(req.body.team_id);
  const project_id = Number(req.body.project_id);
  yield team_project_service_default.REMOVE_PROJECT(project_id, team_id);
  return res.status(200).json({
    status: 200,
    success: true,
    message: `Project has been removed from the team`
  });
}));
var TeamController = _TeamController;
var _Validation = class _Validation {
};
_Validation.validateProjectOwnership = (project_id, team_id) => __async(_Validation, null, function* () {
  const isAssigned = yield team_project_service_default.GET_BY_ID(project_id, team_id);
  if (isAssigned) {
    return {
      valid: false,
      message: "The Project with the same ID, already assigned to the team."
    };
  }
  return {
    valid: true,
    message: ""
  };
});
_Validation.validateMembership = (user_id, team_id) => __async(_Validation, null, function* () {
  const isMember = yield team_role_service_default.CHECK_MEMBER_EXISTANCE(user_id, team_id);
  if (isMember) {
    return {
      valid: false,
      message: "Employee already in the team."
    };
  }
  const user = yield employee_service_default.GET_EMPLOYEE_LEVEL(user_id);
  if ((user == null ? void 0 : user.level) === "hr") {
    return {
      valid: false,
      message: "HR cannot be added to teams."
    };
  }
  if ((user == null ? void 0 : user.level) === "lead") {
    const hasLead = yield team_role_service_default.CHECK_LEAD_EXISTENCE(team_id);
    if (hasLead) {
      return {
        valid: false,
        message: "This team already has a lead."
      };
    }
  }
  return {
    valid: true,
    message: ""
  };
});
var Validation = _Validation;
var team_controller_default = TeamController;

// src/route/team-route.ts
var route2 = import_express2.default.Router();
route2.get("/", team_controller_default.INDEX);
route2.post("/", team_controller_default.CREATE_TEAM);
route2.get("/show", team_controller_default.SHOW);
route2.post("/add-member", team_controller_default.ADD_MEMBER);
route2.delete("/remove-member", team_controller_default.REMOVE_MEMBER);
route2.delete("/delete", team_controller_default.DESTROY);
route2.post("/assign-project", team_controller_default.ASSIGN_PROJECT);
route2.delete("/remove-project", team_controller_default.REMOVE_PROJECT_FROM_TEAM);
var team_route_default = route2;

// src/route/task-route.ts
var import_express3 = __toESM(require("express"));

// src/controller/task-controller.ts
var import_http_status_codes5 = require("http-status-codes");

// src/services/task-service.ts
var _TaskService = class _TaskService {
};
_TaskService.GET_ALL = () => __async(_TaskService, null, function* () {
  const fetchTaskResult = yield query(`
    SELECT
      t.id,
      t.task,
      u.full_name,
      t.start,
      t."end",
      p.project_name
    FROM tasks t
    JOIN users u ON t.user_id=u.id
    JOIN projects p ON t.project_id=p.id
    ORDER BY start, "end" ASC
    `);
  return (fetchTaskResult == null ? void 0 : fetchTaskResult.rows) || [];
});
_TaskService.GET_BY_ID = (task_id) => __async(_TaskService, null, function* () {
  const fetchTaskResult = yield query(`
    SELECT
      t.id,
      t.task,
      u.full_name,
      t.start,
      t."end",
      p.project_name
    FROM tasks t
    JOIN users u ON t.user_id=u.id
    JOIN projects p ON t.project_id=p.id
    WHERE t.id=$1::integer
    ORDER BY start, "end" ASC
    `, [task_id]);
  return fetchTaskResult == null ? void 0 : fetchTaskResult.rows.at(0);
});
_TaskService.GET_BY_EMPLOYEE_ID = (employee_id, period) => __async(_TaskService, null, function* () {
  let filterByPeriodStr = "";
  switch (period) {
    case "weekly":
      filterByPeriodStr = `AND start >= date_trunc('week', current_timestamp) AND start < date_trunc('week', current_timestamp) + interval '1 week'`;
      break;
    case "monthly":
      filterByPeriodStr = `AND start >= date_trunc('month', current_timestamp) AND start < date_trunc('month', current_timestamp) + interval '1 month'`;
      break;
    default:
      break;
  }
  const fetchTaskResult = yield query(`
    SELECT
      t.id,
      t.task,
      u.full_name,
      t.start,
      t."end",
      p.project_name
    FROM tasks t
    JOIN users u ON t.user_id=u.id
    JOIN projects p ON t.project_id=p.id
    WHERE user_id=$1 
    ${filterByPeriodStr}
    ORDER BY start, "end" ASC
    `, [employee_id]);
  return (fetchTaskResult == null ? void 0 : fetchTaskResult.rows) || [];
});
_TaskService.STORE = (user_id, tasks) => __async(_TaskService, null, function* () {
  const q = [];
  const params = [];
  tasks == null ? void 0 : tasks.forEach((task, index) => {
    const baseIndex = index * 5;
    q.push(`($${baseIndex + 1}, $${baseIndex + 2}, $${baseIndex + 3}, $${baseIndex + 4}, $${baseIndex + 5})`);
    params.push(`${task.project_id}`);
    params.push(`${task.task}`);
    params.push(`${task.start}`);
    params.push(`${task.end}`);
    params.push(`${user_id}`);
  });
  const queryStr = `INSERT INTO tasks (project_id, task, start, "end", user_id) VALUES ` + q.join(", ") + `RETURNING *`;
  const storeTaskResult = yield query(queryStr, params);
  return storeTaskResult == null ? void 0 : storeTaskResult.rows;
});
_TaskService.UPDATE = (task_id, task) => __async(_TaskService, null, function* () {
  const updateTaskResult = yield query(`
    UPDATE tasks
    SET 
      project_id=$1,
      task=$2,
      start=$3,
      "end"=$4,
      user_id=$5
    WHERE id=$6
    RETURNING *
    `, [task.project_id, task.task, task.start, task.end, task_id]);
  return updateTaskResult == null ? void 0 : updateTaskResult.rows.at(0);
});
_TaskService.DELETE = (task_id) => __async(_TaskService, null, function* () {
  yield query(`
    DELETE FROM tasks
    WHERE id=$1::integer
    `, [task_id]);
});
var TaskService = _TaskService;
var task_service_default = TaskService;

// src/controller/task-controller.ts
var _TaskController = class _TaskController {
};
_TaskController.SAVE = asyncHandler((req, res) => __async(_TaskController, null, function* () {
  var _a;
  const tasks = req.body.data;
  const user_id = (_a = req.user) == null ? void 0 : _a.id;
  if (!user_id) {
    return res.status(400).json({
      status: 400,
      message: `User id is not specified`
    });
  }
  const result = yield task_service_default.STORE(user_id, tasks);
  const successResponse = {
    status: import_http_status_codes5.StatusCodes.CREATED,
    success: true,
    message: `Report created succesfully for user ${user_id}`,
    data: result
  };
  res.status(import_http_status_codes5.StatusCodes.OK).json(successResponse);
}));
_TaskController.GET_BY_ID = asyncHandler((req, res) => __async(_TaskController, null, function* () {
  var _a;
  const employee_id = (_a = req.user) == null ? void 0 : _a.id;
  if (!employee_id) {
    return res.status(400).json({
      status: 400,
      message: `User id is not specified`
    });
  }
  const result = yield task_service_default.GET_BY_EMPLOYEE_ID(employee_id);
  const successResponse = {
    status: import_http_status_codes5.StatusCodes.OK,
    success: true,
    data: result
  };
  res.status(import_http_status_codes5.StatusCodes.OK).json(successResponse);
}));
_TaskController.DELETE = asyncHandler((req, res) => __async(_TaskController, null, function* () {
  const task_id = Number(req.params.task_id);
  yield task_service_default.DELETE(task_id);
  const successResponse = {
    status: import_http_status_codes5.StatusCodes.OK,
    success: true,
    message: `Task with id ${task_id} has been deleted`
  };
  res.status(import_http_status_codes5.StatusCodes.OK).json(successResponse);
}));
var TaskController = _TaskController;
var task_controller_default = TaskController;

// src/schema/task-schema.ts
var import_zod3 = require("zod");
var taskItemSchema = import_zod3.z.object({
  project_id: import_zod3.z.number().min(1, { message: "Project name is required" }),
  task: import_zod3.z.string().min(1, { message: "Description is required" }),
  start: import_zod3.z.string().min(1, { message: "Start time is required" }),
  end: import_zod3.z.string().min(1, { message: "End time is required" })
});
var taskDataSchema = import_zod3.z.object({
  data: import_zod3.z.array(taskItemSchema).min(1, { message: "At least one task item is required" })
});

// src/route/task-route.ts
var route3 = import_express3.default.Router();
route3.post("/", validateData(taskDataSchema), task_controller_default.SAVE);
route3.get("/", task_controller_default.GET_BY_ID);
route3.delete("/:task_id", task_controller_default.DELETE);
var task_route_default = route3;

// src/route/profile-route.ts
var import_express4 = __toESM(require("express"));

// src/services/profile-service.ts
var _ProfileService = class _ProfileService {
};
_ProfileService.GET_PROFILE = (employee_id) => __async(_ProfileService, null, function* () {
  const getProfileResult = yield query(`
      SELECT
        u.id,
        u.email,
        u.full_name,
        u.username,
        u.phone,
        r.display_name as role
      FROM public."users" u
      JOIN roles r ON u.role_id = r.id
      WHERE u.id=$1::integer
    `, [employee_id]);
  return getProfileResult == null ? void 0 : getProfileResult.rows.at(0);
});
_ProfileService.UPDATE_PROFILE = (employee_id, employee) => __async(_ProfileService, null, function* () {
  const updateProfileResult = yield query(`
      UPDATE public."users"
      SET
        email=$1
        password=$2
        full_name=$3
        username=$4
        role_id=$5::integer
        phone=$6
      WHERE id=$7::integer
    `, [employee.email, employee.password, employee.full_name, employee.username, employee.role, employee.phone, employee_id]);
  return updateProfileResult == null ? void 0 : updateProfileResult.rows.at(0);
});
var ProfileService = _ProfileService;
var profile_service_default = ProfileService;

// src/controller/profile-controller.ts
var getProfile = asyncHandler((req, res) => __async(void 0, null, function* () {
  var _a;
  const user_id = (_a = req.user) == null ? void 0 : _a.id;
  if (!user_id) {
    return res.status(400).json({
      status: 400,
      message: `User id is not specified`
    });
  }
  const result = yield profile_service_default.GET_PROFILE(user_id);
  res.status(200).json({
    status: 200,
    success: true,
    data: __spreadProps(__spreadValues({}, result), { image: `http://192.168.18.30:3000/profile_pic/placeholder.png` })
  });
}));
var updateProfile = asyncHandler((req, res) => __async(void 0, null, function* () {
  var _a;
  const user_id = (_a = req.user) == null ? void 0 : _a.id;
  if (!user_id) {
    return res.status(400).json({
      status: 400,
      message: `User id is not specified`
    });
  }
  const result = yield profile_service_default.UPDATE_PROFILE(user_id, req.body);
  res.status(200).json({
    status: 200,
    success: true,
    message: `Profile has been succefully updated`,
    data: result
  });
}));

// src/route/profile-route.ts
var route4 = import_express4.default.Router();
route4.get("/", getProfile);
route4.put("/", updateProfile);
var profile_route_default = route4;

// src/route/chart-route.ts
var import_express5 = __toESM(require("express"));

// src/controller/chart-controller.ts
var import_http_status_codes6 = require("http-status-codes");

// src/services/chart-service.ts
var _ChartService = class _ChartService {
};
_ChartService.GET_DATA = (employee_id, chart_type) => __async(_ChartService, null, function* () {
  switch (chart_type) {
    case "pie":
      return _ChartService.PIE_CHART(employee_id);
    case "bar":
      return _ChartService.BAR_CHART(employee_id);
  }
});
_ChartService.PIE_CHART = (employee_id) => __async(_ChartService, null, function* () {
  const [monthlyTasks, weeklyTasks] = yield Promise.all([
    task_service_default.GET_BY_EMPLOYEE_ID(employee_id, "monthly"),
    task_service_default.GET_BY_EMPLOYEE_ID(employee_id, "weekly")
  ]);
  const { series: monthlySeries } = getDailyWorkingHours(monthlyTasks);
  const { series: weeklySeries } = getDailyWorkingHours(weeklyTasks);
  const weeklyHours = weeklySeries.reduce((series, val) => {
    return series + val;
  }, 0);
  const monthlyHours = monthlySeries.reduce((series, val) => {
    return series + val;
  }, 0);
  return { weeklyHours, monthlyHours };
});
_ChartService.BAR_CHART = (employee_id) => __async(_ChartService, null, function* () {
  const tasks = yield task_service_default.GET_BY_EMPLOYEE_ID(employee_id, "weekly");
  const { series, option } = getDailyWorkingHours(tasks);
  return {
    option,
    series
  };
});
var ChartService = _ChartService;
var chart_service_default = ChartService;

// src/controller/chart-controller.ts
var getChartData = asyncHandler((req, res) => __async(void 0, null, function* () {
  var _a;
  const user_id = (_a = req.user) == null ? void 0 : _a.id;
  const model = req.params.model;
  if (!user_id) {
    return res.status(400).json({
      status: 400,
      message: `User id is not specified`
    });
  }
  let responseData;
  switch (model) {
    case "bar":
      responseData = yield chart_service_default.GET_DATA(user_id, "bar");
      break;
    case "pie":
      responseData = yield chart_service_default.GET_DATA(user_id, "pie");
      break;
    default:
      const errorResponse = {
        status: import_http_status_codes6.StatusCodes.BAD_REQUEST,
        message: "Invalid chart model"
      };
      res.status(import_http_status_codes6.StatusCodes.BAD_REQUEST).json(errorResponse);
      return;
  }
  const successResponse = {
    status: import_http_status_codes6.StatusCodes.OK,
    success: true,
    data: responseData
  };
  res.status(import_http_status_codes6.StatusCodes.OK).json(successResponse);
}));
var getDailyWorkingHours = (tasks) => {
  const dailyHours = {};
  tasks.forEach((task) => {
    const date = task.start.toLocaleDateString(void 0, {
      day: "numeric",
      month: "numeric",
      year: "numeric"
    }).split("/").join("-");
    if (!dailyHours[date]) {
      dailyHours[date] = 0;
    }
    dailyHours[date] += calculateWorkingHours(task.start, task.end);
  });
  const option = Object.keys(dailyHours).sort();
  const series = option.map((date) => dailyHours[date]);
  return { option, series };
};
var calculateWorkingHours = (start, end) => {
  const differenceInMilliseconds = end.getTime() - start.getTime();
  const differenceInHours = differenceInMilliseconds / (1e3 * 60 * 60);
  return differenceInHours;
};

// src/route/chart-route.ts
var route5 = import_express5.default.Router();
route5.get("/:model", getChartData);

// src/route/auth-route.ts
var import_express6 = __toESM(require("express"));

// src/controller/auth-controller.ts
var import_http_status_codes7 = require("http-status-codes");
var import_jsonwebtoken2 = __toESM(require("jsonwebtoken"));

// src/services/auth-service.ts
var _AuthService = class _AuthService {
};
_AuthService.LOGIN = (loginRequest) => __async(_AuthService, null, function* () {
  const loginResult = yield query(`
      SELECT 
        u.id, 
        u.email, 
        u.full_name, 
        u.username, 
        u.phone,
        u.level,
        r.role_name, 
        r.display_name
      FROM 
        public."users" u
      JOIN 
        roles r ON u.role_id = r.id
      WHERE 
        u.email=$1 AND u.password=$2
    `, [loginRequest.email, loginRequest.password]);
  return loginResult;
});
var AuthService = _AuthService;
var auth_service_default = AuthService;

// src/controller/auth-controller.ts
var login = asyncHandler((req, res) => __async(void 0, null, function* () {
  const result = yield auth_service_default.LOGIN(req.body);
  if ((result == null ? void 0 : result.rowCount) < 1) {
    const errorResponse = {
      status: import_http_status_codes7.StatusCodes.NOT_FOUND,
      message: "User with email or password specified, are not found"
    };
    return res.status(import_http_status_codes7.StatusCodes.BAD_REQUEST).json(errorResponse);
  }
  const user = result == null ? void 0 : result.rows.at(0);
  const token = import_jsonwebtoken2.default.sign({ user }, "test", { expiresIn: "1h" });
  res.status(import_http_status_codes7.StatusCodes.OK).json({
    status: import_http_status_codes7.StatusCodes.OK,
    success: true,
    message: "Login Successfull",
    data: __spreadProps(__spreadValues({}, user), { token })
  });
}));
var logout = (req, res) => {
  return res.clearCookie("access_token").status(import_http_status_codes7.StatusCodes.OK).json({
    status: import_http_status_codes7.StatusCodes.OK,
    success: true,
    message: "Logout Successfull"
  });
};

// src/route/auth-route.ts
var route6 = import_express6.default.Router();
route6.post("/", login);
route6.post("/logout", logout);
var auth_route_default = route6;

// src/route/absence-route.ts
var import_express7 = __toESM(require("express"));

// src/controller/absence-controller.ts
var import_http_status_codes8 = require("http-status-codes");

// src/services/absence-service.ts
var _AbsenceService = class _AbsenceService {
};
_AbsenceService.GET_ALL = () => __async(_AbsenceService, null, function* () {
  const fetchAbsenceResult = yield query(`
    SELECT
        u.id AS user_id,
        u.full_name AS name,
        ARRAY_AGG(
            JSON_BUILD_OBJECT(
                'date', a.date,
                'type', a.type,
                'reason', a.reason
            )
        ) AS absences
    FROM absences a
    JOIN users u ON a.user_id = u.id
    GROUP BY u.id, u.full_name
    ORDER BY u.id;
    `);
  return (fetchAbsenceResult == null ? void 0 : fetchAbsenceResult.rows) || [];
});
_AbsenceService.GET_BY_ID = (employee_id) => __async(_AbsenceService, null, function* () {
  const fetchAbsenceResult = yield query(`
    SELECT
       *
    FROM absences a
    WHERE id=$1
    `, [employee_id]);
  return fetchAbsenceResult == null ? void 0 : fetchAbsenceResult.rows.at(0);
});
_AbsenceService.GET_BY_EMPLOYEE_ID = (employee_id) => __async(_AbsenceService, null, function* () {
  const fetchAbsenceResult = yield query(`
    SELECT
      id,
      user_id,
      date,
      type,
      date_team_lead_approved,
      date_hr_approved,
      is_approved,
      reason
    FROM absences
    WHERE user_id = $1::integer
    ORDER BY id ASC
    `, [employee_id]);
  return (fetchAbsenceResult == null ? void 0 : fetchAbsenceResult.rows) || [];
});
_AbsenceService.STORE = (absence) => __async(_AbsenceService, null, function* () {
  const saveAbsenceResult = yield query(`
    INSERT INTO absences (
      user_id, 
      date, 
      type,
      date_pending
    ) VALUES ($1::integer, $2, $3, NOW()) 
    RETURNING *
    `, [absence.user_id, absence.date, absence.type]);
  return saveAbsenceResult == null ? void 0 : saveAbsenceResult.rows.at(0);
});
_AbsenceService.DELETE = (absence_id) => __async(_AbsenceService, null, function* () {
  yield query(`
    DELETE FROM absences
    WHERE id=$1::integer
    `, [absence_id]);
});
_AbsenceService.UPDATE_STATUS = (absence_id, approval) => __async(_AbsenceService, null, function* () {
  const absence = yield _AbsenceService.GET_BY_ID(absence_id);
  if (!absence) {
    throw new Error(`Absence with ID ${absence_id} not found.`);
  }
  let sql = `UPDATE absences SET `;
  const params = [];
  let updateField = "";
  if (approval.is_approved) {
    if (!absence.date_pending) {
      updateField = "date_pending = NOW()";
    } else if (!absence.date_team_lead_approved) {
      updateField = "date_team_lead_approved = NOW()";
    } else if (!absence.date_hr_approved) {
      updateField = "date_hr_approved = NOW(), is_approved = TRUE";
    }
    if (!updateField) {
      return { message: "All fields are already set." };
    }
    sql += `${updateField} WHERE id = $1 RETURNING *`;
  } else {
    sql += `is_approved = FALSE`;
    if (approval.reason) {
      sql += `, reason = $1`;
      params.push(approval.reason);
    }
    sql += ` WHERE id = $2 RETURNING *`;
  }
  params.push(absence_id);
  const updateResult = yield query(sql, params);
  return updateResult == null ? void 0 : updateResult.rows.at(0);
});
var AbsenceService = _AbsenceService;
var absence_service_default = AbsenceService;

// src/controller/absence-controller.ts
var getAbsenceData = asyncHandler((req, res) => __async(void 0, null, function* () {
  var _a;
  const user_id = (_a = req.user) == null ? void 0 : _a.id;
  const result = yield absence_service_default.GET_ALL();
  res.status(200).json({
    status: import_http_status_codes8.StatusCodes.OK,
    success: true,
    data: result
  });
}));
var getAbsenceDataTest = asyncHandler((req, res) => __async(void 0, null, function* () {
  var _a;
  const user_id = (_a = req.user) == null ? void 0 : _a.id;
  if (!user_id) {
    return res.status(400).json({
      status: 400,
      message: `User id is not specified`
    });
  }
  const result = yield absence_service_default.GET_BY_EMPLOYEE_ID(user_id);
  res.status(200).json({
    status: import_http_status_codes8.StatusCodes.OK,
    success: true,
    data: result
  });
}));
var createNewAbsence = asyncHandler((req, res) => __async(void 0, null, function* () {
  const { user_id, date, type } = req.body;
  const validationError = yield validateAbsenceRequest(Number(user_id), date, type);
  if (validationError) {
    return res.status(400).json({
      status: 400,
      message: validationError
    });
  }
  const result = yield absence_service_default.STORE(req.body);
  res.json({
    status: import_http_status_codes8.StatusCodes.CREATED,
    success: true,
    message: "Absence data has been created successfully",
    data: result
  });
}));
var approveAbsenceData = asyncHandler((req, res) => __async(void 0, null, function* () {
  const absence = {
    is_approved: Boolean(req.body.is_approved),
    reason: req.body.reason
  };
  const absence_id = Number(req.params.absence_id);
  const result = yield absence_service_default.UPDATE_STATUS(absence_id, absence);
  res.json({
    status: import_http_status_codes8.StatusCodes.OK,
    success: true,
    message: `Absence data has been akwaokwao`,
    data: result
  });
}));
var deleteAbsence = asyncHandler((req, res) => __async(void 0, null, function* () {
  const absence_id = Number(req.params.absence_id);
  yield absence_service_default.DELETE(absence_id);
  res.json({
    status: import_http_status_codes8.StatusCodes.OK,
    success: true,
    message: `The absence has been deleted/canceled`
  });
}));
var validateAbsenceRequest = (user_id, date, type) => __async(void 0, null, function* () {
  const today = /* @__PURE__ */ new Date();
  const requestDate = new Date(date);
  const options = { day: "numeric", month: "short", year: "numeric" };
  const checkQuery = `
    SELECT
      COUNT(*) AS count,
      SUM(CASE WHEN type = 'WFH' THEN 1 ELSE 0 END) AS wfh_count,
      SUM(CASE WHEN type IN ('AL', 'SL') THEN 1 ELSE 0 END) AS al_sl_count
    FROM absences
    WHERE user_id = $1
      AND date >= date_trunc('day', $2::timestamp)
      AND date < date_trunc('day', $2::timestamp) + interval '1 day'
  `;
  const checkQueryResult = yield query(checkQuery, [user_id, date]);
  const { count, wfh_count, al_sl_count } = checkQueryResult.rows[0];
  if (count > 0) {
    return `You already applied ${type} on ${requestDate.toLocaleDateString(void 0, options).split("/").join("-")}`;
  }
  if (type === "WFH" && wfh_count >= 3) {
    return `You have already reached the WFH limit for this week.`;
  }
  if (type === "AL" || type === "SL") {
    const checkYearlyLimitQuery = `
      SELECT COUNT(*)
      FROM absences
      WHERE user_id = $1
        AND date >= date_trunc('year', current_timestamp)
        AND date < date_trunc('year', current_timestamp) + interval '1 year'
        AND type IN ('AL', 'SL')
    `;
    const yearlyLimitResult = yield query(checkYearlyLimitQuery, [user_id]);
    if (yearlyLimitResult.rows[0].count >= 12) {
      return `You have reached the annual limit of 12 AL and SL leaves.`;
    }
  }
  const dayOfWeek = requestDate.getDay();
  if (dayOfWeek === 6 || dayOfWeek === 0) {
    return `You cannot take leaves at weekend`;
  }
  return null;
});

// src/schema/absence-schema.ts
var import_zod4 = require("zod");
var absenceSchema = import_zod4.z.object({
  user_id: import_zod4.z.number().min(1, { message: "User ID is required" }),
  date: import_zod4.z.string().min(1, { message: "Start time is required" }),
  type: import_zod4.z.enum([
    "WFH",
    "AL",
    "SL"
  ], { message: "Type not match!! The only accepted value are 'WFH', 'AL', 'SL'" })
});
var absenceApprovalSchema = import_zod4.z.object({
  is_approved: import_zod4.z.boolean({ message: "Type not match!! The only accepted value are 'approved' and 'declined'" }),
  reason: import_zod4.z.string().optional()
}).refine((data) => {
  if (!data.is_approved && (!data.reason || data.reason.trim() === "")) {
    return false;
  }
  return true;
}, {
  message: "Reason is required when is_approved is 'declined'",
  path: ["reason"]
});

// src/route/absence-route.ts
var route7 = import_express7.default.Router();
route7.get("/", getAbsenceData);
route7.get("/history", getAbsenceDataTest);
route7.post("/", validateData(absenceSchema), createNewAbsence);
route7.put("/:absence_id", validateData(absenceApprovalSchema), approveAbsenceData);
route7.delete("/:absence_id", deleteAbsence);
var absence_route_default = route7;

// src/route/project-route.ts
var import_express8 = __toESM(require("express"));

// src/controller/project-controller.ts
var import_http_status_codes9 = require("http-status-codes");

// src/services/project-service.ts
var _ProjectService = class _ProjectService {
};
_ProjectService.GET_ALL = () => __async(_ProjectService, null, function* () {
  const fetchProjectResult = yield query(`
    SELECT 
      * 
    FROM projects 
    ORDER BY project_name
    `);
  return (fetchProjectResult == null ? void 0 : fetchProjectResult.rows) || [];
});
_ProjectService.GET_BY_ID = (project_id) => __async(_ProjectService, null, function* () {
  const fetchProjectByIdResult = yield query(`
    SELECT 
      *
    FROM projects
    WHERE id=$1::integer
    `, [project_id]);
  return fetchProjectByIdResult == null ? void 0 : fetchProjectByIdResult.rows.at(0);
});
_ProjectService.STORE = (project) => __async(_ProjectService, null, function* () {
  const storeProjectResult = yield query(`
    INSERT INTO projects (
      project_name
    ) VALUES ($1)
    RETURNING *
    `, [project.project_name]);
  return storeProjectResult == null ? void 0 : storeProjectResult.rows.at(0);
});
_ProjectService.UPDATE = (project_id, project) => __async(_ProjectService, null, function* () {
  const updateProjectResult = yield query(`
      UPDATE projects
      SET
        project_name=$1
      WHERE id=$2::integer
      RETURNING *
    `, [project.project_name, project_id]);
  return updateProjectResult == null ? void 0 : updateProjectResult.rows.at(0);
});
_ProjectService.DELETE = (project_id) => __async(_ProjectService, null, function* () {
  yield query(`
      DELETE FROM projects
      WHERE id=$1::integer
    `, [project_id]);
});
_ProjectService.ASSIGN_PROJECT = (team_id, project_id) => __async(_ProjectService, null, function* () {
  yield query(`
    INSERT INTO project_team (
      project_id,
      team_id
    ) VALUES (
      $1,
      $2
    )
    `, [team_id, project_id]);
});
var ProjectService = _ProjectService;
var project_service_default = ProjectService;

// src/controller/project-controller.ts
var getAllProject = asyncHandler((req, res) => __async(void 0, null, function* () {
  const result = yield project_service_default.GET_ALL();
  res.status(import_http_status_codes9.StatusCodes.OK).json({
    status: import_http_status_codes9.StatusCodes.OK,
    success: true,
    data: result
  });
}));
var getProjectById = asyncHandler((req, res) => __async(void 0, null, function* () {
  const project_id = Number(req.params.project_id);
  if (!project_id) {
    const response = {
      status: import_http_status_codes9.StatusCodes.BAD_REQUEST,
      message: "Project ID not specified"
    };
    return res.status(import_http_status_codes9.StatusCodes.BAD_REQUEST).json(response);
  }
  const result = yield project_service_default.GET_BY_ID(project_id);
  res.status(import_http_status_codes9.StatusCodes.OK).json({
    status: import_http_status_codes9.StatusCodes.OK,
    success: true,
    data: result
  });
}));
var createNewProject = asyncHandler((req, res) => __async(void 0, null, function* () {
  const result = project_service_default.STORE(req.body);
  res.status(import_http_status_codes9.StatusCodes.CREATED).json({
    status: import_http_status_codes9.StatusCodes.CREATED,
    success: true,
    message: `New project successfully created`,
    data: result
  });
}));
var updateProject = asyncHandler((req, res) => __async(void 0, null, function* () {
  const project_id = Number(req.params.project_id);
  const result = yield project_service_default.UPDATE(project_id, req.body);
  res.status(import_http_status_codes9.StatusCodes.OK).json({
    status: import_http_status_codes9.StatusCodes.OK,
    success: true,
    message: `Project with ID ${project_id} has been updated`,
    data: result
  });
}));
var deleteProject = asyncHandler((req, res) => __async(void 0, null, function* () {
  const project_id = Number(req.params.project_id);
  project_service_default.DELETE(project_id);
  res.status(import_http_status_codes9.StatusCodes.OK).json({
    status: import_http_status_codes9.StatusCodes.OK,
    success: true,
    message: `Project with ID ${project_id} has been deleted`
  });
}));

// src/route/project-route.ts
var route8 = import_express8.default.Router();
route8.get("/", getAllProject);
route8.get("/:project_id", getProjectById);
route8.post("/", createNewProject);
route8.put("/:project_id", updateProject);
route8.delete("/:project_id", deleteProject);
var project_route_default = route8;

// src/route/role-route.ts
var import_express9 = __toESM(require("express"));

// src/controller/role-controller.ts
var import_http_status_codes10 = require("http-status-codes");

// src/services/role-service.ts
var _RoleService = class _RoleService {
};
_RoleService.GET_ALL = () => __async(_RoleService, null, function* () {
  const fethAllRoleResult = yield query(`
    SELECT 
      *
    FROM roles
    SORT BY role_name
    `);
  return (fethAllRoleResult == null ? void 0 : fethAllRoleResult.rows) || [];
});
_RoleService.GET_BY_ID = (role_id) => __async(_RoleService, null, function* () {
  const fetchRoleById = yield query(`
    SELECT
      role_name,
      display_name
    FROM roles
    WHERE id=$1::integer
    `, [role_id]);
  return fetchRoleById == null ? void 0 : fetchRoleById.rows.at(0);
});
_RoleService.STORE = (role) => __async(_RoleService, null, function* () {
  const storeRoleResult = yield query(`
    INSERT INTO roles (
      role_name,
      display_name
    ) VALUES ($1, $2)
    RETURNING *
    `, [role.role_name, role.display_name]);
  return storeRoleResult == null ? void 0 : storeRoleResult.rows.at(0);
});
_RoleService.UPDATE = (role_id, role) => __async(_RoleService, null, function* () {
  const updateRoleResult = yield query(`
    UPDATE roles
    SET
      role_name=$1,
      display_name=$2
    WHERE id=$3
    RETURNING *
    `, [role.role_name, role.display_name, role_id]);
  return updateRoleResult == null ? void 0 : updateRoleResult.rows.at(0);
});
_RoleService.DELETE = (role_id) => __async(_RoleService, null, function* () {
  const deleteRoleResult = yield query(`
    DELETE roles
    WHERE id=$1
    `, [role_id]);
});
var RoleService = _RoleService;
var role_service_default = RoleService;

// src/controller/role-controller.ts
var _RoleController = class _RoleController {
};
_RoleController.GET = asyncHandler((req, res) => __async(_RoleController, null, function* () {
  const result = yield role_service_default.GET_ALL();
  res.status(import_http_status_codes10.StatusCodes.OK).json({
    status: import_http_status_codes10.StatusCodes.OK,
    success: true,
    data: result
  });
}));
_RoleController.SHOW = asyncHandler((req, res) => __async(_RoleController, null, function* () {
  const role_id = Number(req.params.role_id);
  if (!role_id) {
    const response = {
      status: import_http_status_codes10.StatusCodes.BAD_REQUEST,
      message: "Role ID not specified"
    };
    return res.status(import_http_status_codes10.StatusCodes.BAD_REQUEST).json(response);
  }
  const result = yield role_service_default.GET_BY_ID(role_id);
  res.status(import_http_status_codes10.StatusCodes.OK).json({
    status: import_http_status_codes10.StatusCodes.OK,
    success: true,
    data: result
  });
}));
_RoleController.POST = asyncHandler((req, res) => __async(_RoleController, null, function* () {
  const result = role_service_default.STORE(req.body);
  res.status(import_http_status_codes10.StatusCodes.CREATED).json({
    status: import_http_status_codes10.StatusCodes.CREATED,
    success: true,
    message: `New role successfully created`,
    data: result
  });
}));
_RoleController.UPDATE = asyncHandler((req, res) => __async(_RoleController, null, function* () {
  const role_id = Number(req.params.role_id);
  const result = role_service_default.UPDATE(
    role_id,
    req.body
  );
  res.status(import_http_status_codes10.StatusCodes.OK).json({
    status: import_http_status_codes10.StatusCodes.OK,
    success: true,
    message: `Role with ID ${role_id} has been updated`,
    data: result
  });
}));
_RoleController.DELETE = asyncHandler((req, res) => __async(_RoleController, null, function* () {
  const role_id = Number(req.params.role_id);
  role_service_default.DELETE(role_id);
  res.status(import_http_status_codes10.StatusCodes.OK).json({
    status: import_http_status_codes10.StatusCodes.OK,
    success: true,
    message: `Role with ID ${role_id} has been deleted`
  });
}));
var RoleController = _RoleController;
var role_controller_default = RoleController;

// src/route/role-route.ts
var route9 = import_express9.default.Router();
route9.get("/", role_controller_default.GET);
route9.get("/:role_id", role_controller_default.SHOW);
route9.post("/", role_controller_default.POST);
route9.put("/:role_id", role_controller_default.UPDATE);
route9.delete("/:role_id", role_controller_default.DELETE);
var role_route_default = route9;

// src/middleware/level-middleware.ts
var verifyRole = (allowedLevels) => {
  return (req, res, next) => {
    const user = req.user;
    if (!user) {
      return res.json({
        status: 400,
        message: `No user logged in yet.`
      });
    }
    const allowed = allowedLevels.includes(user.level);
    if (!allowed) {
      return res.json({
        status: 403,
        message: `This route is protected`
      });
    }
    next();
  };
};

// src/server.ts
require("dotenv").config();
var asyncHandler2 = () => __async(exports, null, function* () {
  yield pg_default.connect();
  const app = (0, import_express10.default)();
  const PORT = process.env.PORT || 8080;
  app.use((0, import_cookie_parser.default)());
  app.use((0, import_helmet.default)());
  app.use((0, import_cors.default)());
  app.use(import_express10.default.json());
  app.use(import_express10.default.urlencoded({ extended: true }));
  app.use(import_express10.default.static("public"));
  app.use("/api/auth/", auth_route_default);
  app.use("/api/employees/", verifyToken, verifyRole(["hr"]), employee_route_default);
  app.use("/api/tasks/", verifyToken, task_route_default);
  app.use("/api/profiles/", verifyToken, profile_route_default);
  app.use("/api/absences/", verifyToken, absence_route_default);
  app.use("/api/projects/", project_route_default);
  app.use("/api/teams/", team_route_default);
  app.use("/api/roles/", role_route_default);
  app.use(notFoundHandler);
  app.use(errorHandler);
  app.listen(
    PORT,
    () => console.log(`Server is running on http://localhost/${PORT}`)
  );
});
void asyncHandler2();
/*! Bundled license information:

object-assign/index.js:
  (*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  *)

vary/index.js:
  (*!
   * vary
   * Copyright(c) 2014-2017 Douglas Christopher Wilson
   * MIT Licensed
   *)
*/
//# sourceMappingURL=server.js.map