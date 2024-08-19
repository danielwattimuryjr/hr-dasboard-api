"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var import_express5 = __toESM(require("express"));

// src/route/employee-route.ts
var import_express = __toESM(require("express"));

// src/helper/async-helper.ts
var asyncHandler = (asyncFnc) => {
  return (req, res, next) => {
    Promise.resolve(asyncFnc(req, res)).catch(next);
  };
};

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

// src/controller/employee-controller.ts
var import_http_status_codes = require("http-status-codes");
var getAllEmployees = asyncHandler((req, res) => __async(void 0, null, function* () {
  var _a;
  const whereClauses = [];
  const queryParams = [];
  let limitQuery = "";
  let offsetQuery = "";
  let searchStr = req.query.search;
  if (searchStr) {
    whereClauses.push(`u::text ILIKE $${queryParams.length + 1} OR r::text ILIKE $${queryParams.length + 1}`);
    queryParams.push(`%${searchStr}%`);
  }
  const limit = parseInt(req.query.limit, 10) || 10;
  const page = parseInt(req.query.page, 10) || 1;
  limitQuery = `LIMIT $${queryParams.length + 1}`;
  queryParams.push(limit);
  offsetQuery = `OFFSET $${queryParams.length + 1}`;
  queryParams.push((page - 1) * limit);
  const whereClause = whereClauses.length > 0 ? " WHERE " + whereClauses.join(" AND ") : "";
  const queryString = `
    SELECT u.id, u.email, u.full_name, r.role_name AS role, r.display_name AS role_display_name
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
  console.log(queryParams);
  const countResult = yield query(countQueryString, searchStr ? [queryParams[0]] : []);
  const totalRecords = parseInt(((_a = countResult == null ? void 0 : countResult.rows[0]) == null ? void 0 : _a.total) || 0);
  const totalPages = Math.ceil(totalRecords / limit);
  const currentPage = page;
  const successResponse = {
    status: import_http_status_codes.StatusCodes.OK,
    success: true,
    data: {
      totalItems: totalRecords,
      employees: result == null ? void 0 : result.rows,
      totalPages,
      currentPage,
      limit,
      search: searchStr
    }
  };
  res.status(import_http_status_codes.StatusCodes.OK).json(successResponse);
}));
var getEmployeeById = asyncHandler((req, res) => __async(void 0, null, function* () {
  const user_id = req.params.user_id;
  const result = yield query(
    `
    SELECT u.id, u.email, u.full_name, u.username, r.role_name, r.display_name FROM users u
    WHERE user_id=$1
    LEFT JOIN roles r ON u.role_id = r.id 
    ORDER BY id ASC
    `,
    [user_id]
  );
  const successResponse = {
    status: import_http_status_codes.StatusCodes.OK,
    success: true,
    data: result ? result.rows : []
  };
  res.status(import_http_status_codes.StatusCodes.OK).json(successResponse);
}));
var deleteEmployee = asyncHandler((req, res) => __async(void 0, null, function* () {
  const user_id = parseInt(req.params.user_id);
  yield query(
    `DELETE FROM users WHERE id=$1`,
    [user_id]
  );
  const successResponse = {
    status: import_http_status_codes.StatusCodes.OK,
    success: true,
    message: `User with id ${user_id} has been deleted`
  };
  res.status(import_http_status_codes.StatusCodes.OK).json(successResponse);
}));
var createEmployee = asyncHandler((req, res) => __async(void 0, null, function* () {
  const { email, full_name, username, password, role_id } = req.body;
  const result = yield query(
    `INSERT INTO public."users" (email, full_name, username, password, role_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [email, full_name, username, password, role_id]
  );
  const successResponse = {
    status: import_http_status_codes.StatusCodes.CREATED,
    success: true,
    message: `User is created successfully`,
    data: result == null ? void 0 : result.rows.at(0)
  };
  res.status(import_http_status_codes.StatusCodes.OK).json(successResponse);
}));
var updateProfile = asyncHandler((req, res) => __async(void 0, null, function* () {
  var _a;
  let user_id = Number(0);
  if (req.params.user_id) {
    user_id = parseInt(req.params.user_id);
  } else {
    const user_id2 = 1;
  }
  const { email, full_name, username, password } = req.body;
  const image = (_a = req.files) == null ? void 0 : _a.profile_pic;
  let image_name = null;
  if (image) {
    if (!/^image/.test(image.mimetype)) throw new Error("Uploaded file is not an image");
    image_name = image.name;
    image.mv(__dirname + "/profile_pic/" + image_name);
  }
  const result = yield query(
    `UPDATE public."users" SET email=$1, full_name=$2, username=$3, password=$4, profile_pic=$5 WHERE id=$6 RETURNING *`,
    [email, full_name, username, password, image_name, user_id]
  );
  const successResponse = {
    status: import_http_status_codes.StatusCodes.OK,
    success: true,
    message: `User updated successfully`,
    data: result == null ? void 0 : result.rows.at(0)
  };
  res.status(import_http_status_codes.StatusCodes.OK).json(successResponse);
}));

// src/middleware/validation-middleware.ts
var import_zod = require("zod");
var import_http_status_codes2 = require("http-status-codes");
function validateData(schema) {
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
          status: import_http_status_codes2.StatusCodes.BAD_REQUEST,
          message: errorMessages
        };
        res.status(import_http_status_codes2.StatusCodes.BAD_REQUEST).json(errorResponse);
      } else {
        res.status(import_http_status_codes2.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
      }
    }
  };
}

// src/schema/user-schema.ts
var import_zod2 = require("zod");
var CreateUserSchema = import_zod2.z.object({
  email: import_zod2.z.string({ message: "The email field is required" }).email({ message: "Please provide a valid email address" }).min(1, { message: "The email field cannot be empty" }).max(100, { message: "The email address cannot exceed 100 characters" }),
  password: import_zod2.z.string({ message: "The password field is required" }).min(1, { message: "The password field cannot be empty" }).max(100, { message: "The password cannot exceed 100 characters" }),
  full_name: import_zod2.z.string({ message: "The full name field is required" }).min(1, { message: "The full name field cannot be empty" }).max(100, { message: "The full name cannot exceed 100 characters" }),
  username: import_zod2.z.string({ message: "The username field is required" }).min(1, { message: "The username field cannot be empty" }).max(100, { message: "The username cannot exceed 100 characters" }),
  role_id: import_zod2.z.number({ message: "The role ID field is required" }).min(1, { message: "Role ID must be at least 1" })
});
var UpdateUserProfileSchema = import_zod2.z.object({
  email: import_zod2.z.string({ message: "The email field is required" }).email({ message: "Please provide a valid email address" }).min(1, { message: "The email field cannot be empty" }).max(100, { message: "The email address cannot exceed 100 characters" }),
  password: import_zod2.z.string({ message: "The password field is required" }).min(1, { message: "The password field cannot be empty" }).max(100, { message: "The password cannot exceed 100 characters" }),
  full_name: import_zod2.z.string({ message: "The full name field is required" }).min(1, { message: "The full name field cannot be empty" }).max(100, { message: "The full name cannot exceed 100 characters" }),
  username: import_zod2.z.string({ message: "The username field is required" }).min(1, { message: "The username field cannot be empty" }).max(100, { message: "The username cannot exceed 100 characters" })
});

// src/route/employee-route.ts
var route = import_express.default.Router();
route.get("/", getAllEmployees);
route.post("/", validateData(CreateUserSchema), createEmployee);
route.delete("/:user_id", deleteEmployee);
route.get("/:user_id", getEmployeeById);
route.put("/:user_id?", validateData(UpdateUserProfileSchema), updateProfile);
var employee_route_default = route;

// src/route/task-route.ts
var import_express2 = __toESM(require("express"));

// src/controller/task-controller.ts
var import_http_status_codes3 = require("http-status-codes");

// src/helper/functions.ts
var calculateWorkingHours = (start, end) => {
  if (start >= end) {
    throw new Error("End time must be after start time");
  }
  const differenceInMilliseconds = end.getTime() - start.getTime();
  const differenceInHours = differenceInMilliseconds / (1e3 * 60 * 60);
  return differenceInHours;
};
var getFullDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};
var getDailyWorkingHours = (tasks) => {
  const dailyHours = {};
  tasks.forEach((task) => {
    const date = getFullDate(task.start);
    if (!dailyHours[date]) {
      dailyHours[date] = 0;
    }
    dailyHours[date] += calculateWorkingHours(task.start, task.end);
  });
  const option = Object.keys(dailyHours).sort();
  const series = option.map((date) => dailyHours[date]);
  return { option, series };
};
var fetchTasksByUserId = (userId, period = null) => __async(void 0, null, function* () {
  var _a;
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
  const queryStr = `
    SELECT start, "end" FROM tasks 
    WHERE user_id=$1 
    ${filterByPeriodStr}
    ORDER BY start, "end" ASC`;
  const taskResult = yield query(queryStr, [userId]);
  return (_a = taskResult == null ? void 0 : taskResult.rows) != null ? _a : [];
});

// src/controller/task-controller.ts
var saveTask = asyncHandler((req, res) => __async(void 0, null, function* () {
  const tasks = req.body.data;
  const user_id = 1;
  try {
    yield query("BEGIN");
    const q = [];
    const params = [];
    tasks == null ? void 0 : tasks.forEach((task, index) => {
      const baseIndex = index * 5;
      q.push(`($${baseIndex + 1}, $${baseIndex + 2}, $${baseIndex + 3}, $${baseIndex + 4}, $${baseIndex + 5})`);
      params.push(`${task.project}`);
      params.push(`${task.description}`);
      params.push(`${task.start}`);
      params.push(`${task.end}`);
      params.push(`${user_id}`);
    });
    const queryStr = `INSERT INTO tasks (project, description, start, "end", user_id) VALUES ` + q.join(", ") + `RETURNING *`;
    const task_result = yield query(queryStr, params);
    yield query("COMMIT");
    const successResponse = {
      status: import_http_status_codes3.StatusCodes.CREATED,
      success: true,
      message: `Report created succesfully for user ${user_id}`,
      data: task_result == null ? void 0 : task_result.rows
    };
    res.status(import_http_status_codes3.StatusCodes.OK).json(successResponse);
  } catch (error) {
    yield query("ROLLBACK");
    const errorResponse = {
      status: import_http_status_codes3.StatusCodes.BAD_REQUEST,
      message: `Something's wrong`
    };
    res.status(import_http_status_codes3.StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}));
var getTaskByUserId = asyncHandler((req, res) => __async(void 0, null, function* () {
  const user_id = 1;
  const task_result = yield fetchTasksByUserId(user_id);
  const successResponse = {
    status: import_http_status_codes3.StatusCodes.OK,
    success: true,
    data: task_result
  };
  res.status(import_http_status_codes3.StatusCodes.OK).json(successResponse);
}));
var deleteTask = asyncHandler((req, res) => __async(void 0, null, function* () {
  const task_id = Number(req.params.task_id);
  yield query(
    `DELETE FROM tasks WHERE id=$1`,
    [task_id]
  );
  const successResponse = {
    status: import_http_status_codes3.StatusCodes.OK,
    success: true,
    message: `Task with id ${task_id} has been deleted`
  };
  res.status(import_http_status_codes3.StatusCodes.OK).json(successResponse);
}));

// src/schema/task-schema.ts
var import_zod3 = require("zod");
var taskItemSchema = import_zod3.z.object({
  project: import_zod3.z.string().min(1, { message: "Project name is required" }),
  description: import_zod3.z.string().min(1, { message: "Description is required" }),
  start: import_zod3.z.string().min(1, { message: "Start time is required" }),
  end: import_zod3.z.string().min(1, { message: "End time is required" })
});
var taskDataSchema = import_zod3.z.object({
  data: import_zod3.z.array(taskItemSchema).min(1, { message: "At least one task item is required" })
});

// src/route/task-route.ts
var route2 = import_express2.default.Router();
route2.post("/", validateData(taskDataSchema), saveTask);
route2.get("/", getTaskByUserId);
route2.delete("/:task_id", deleteTask);
var task_route_default = route2;

// src/route/chart-route.ts
var import_express3 = __toESM(require("express"));

// src/controller/chart-controller.ts
var import_http_status_codes4 = require("http-status-codes");
var getChartData = asyncHandler((req, res) => __async(void 0, null, function* () {
  const user_id = 1;
  const model = req.params.model;
  let responseData;
  switch (model) {
    case "bar":
      responseData = yield getBarChart(user_id);
      break;
    case "pie":
      responseData = yield getPieChart(user_id);
      break;
    default:
      const errorResponse = {
        status: import_http_status_codes4.StatusCodes.BAD_REQUEST,
        message: "Invalid chart model"
      };
      res.status(import_http_status_codes4.StatusCodes.BAD_REQUEST).json(errorResponse);
      return;
  }
  const successResponse = {
    status: import_http_status_codes4.StatusCodes.OK,
    success: true,
    data: responseData
  };
  res.status(import_http_status_codes4.StatusCodes.OK).json(successResponse);
}));
var getPieChart = (user_id) => __async(void 0, null, function* () {
  const [monthlyTasks, weeklyTasks] = yield Promise.all([
    fetchTasksByUserId(user_id, "monthly"),
    fetchTasksByUserId(user_id, "weekly")
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
var getBarChart = (user_id) => __async(void 0, null, function* () {
  const tasks = yield fetchTasksByUserId(user_id, "weekly");
  const { series, option } = getDailyWorkingHours(tasks);
  return {
    option,
    series
  };
});

// src/route/chart-route.ts
var route3 = import_express3.default.Router();
route3.get("/:model", getChartData);
var chart_route_default = route3;

// src/route/auth-route.ts
var import_express4 = __toESM(require("express"));

// src/controller/auth-controller.ts
var import_http_status_codes5 = require("http-status-codes");
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var login = asyncHandler((req, res) => __async(void 0, null, function* () {
  const { email, password } = req.body;
  const result = yield query(
    `SELECT u.id, u.email, u.full_name, u.username, r.role_name, r.display_name
   FROM public."users" u
   JOIN roles r ON u.role_id = r.id
   WHERE u.email=$1 AND u.password=$2`,
    [email, password]
  );
  if ((result == null ? void 0 : result.rowCount) < 1) {
    const errorResponse = {
      status: import_http_status_codes5.StatusCodes.NOT_FOUND,
      message: "User with email or password specified, are not found"
    };
    return res.status(import_http_status_codes5.StatusCodes.BAD_REQUEST).json(errorResponse);
  }
  const user = result == null ? void 0 : result.rows.at(0);
  const token = import_jsonwebtoken.default.sign({ user }, "test", { expiresIn: "1h" });
  const successResponse = {
    status: import_http_status_codes5.StatusCodes.OK,
    success: true,
    message: "Login Successfull",
    data: token
  };
  res.cookie("access_token", `${token}`, {
    httpOnly: true,
    secure: false
  }).status(import_http_status_codes5.StatusCodes.OK).json(successResponse);
}));
var logout = (req, res) => {
  const successResponse = {
    status: import_http_status_codes5.StatusCodes.OK,
    success: true,
    message: "Logout Successfull"
  };
  return res.clearCookie("access_token").status(import_http_status_codes5.StatusCodes.OK).json(successResponse);
};

// src/route/auth-route.ts
var route4 = import_express4.default.Router();
route4.post("/", login);
route4.post("/logout", logout);
var auth_route_default = route4;

// src/server.ts
var import_cors = __toESM(require_lib());
var import_helmet = __toESM(require("helmet"));

// src/error/not-found.ts
var import_http_status_codes6 = require("http-status-codes");
var notFoundHandler = (req, res) => {
  const response = {
    status: import_http_status_codes6.StatusCodes.NOT_FOUND,
    message: `Not found: ${req.originalUrl}`
  };
  res.status(404).json(response);
};

// src/error/error.ts
var import_http_status_codes7 = require("http-status-codes");
var errorHandler = (error, req, res, next) => {
  const response = {
    status: import_http_status_codes7.StatusCodes.INTERNAL_SERVER_ERROR,
    message: error.message
  };
  console.log(error);
  return res.status(import_http_status_codes7.StatusCodes.INTERNAL_SERVER_ERROR).json(response);
};

// src/server.ts
var import_express_fileupload = __toESM(require("express-fileupload"));
var import_cookie_parser = __toESM(require("cookie-parser"));
require("dotenv").config();
var asyncHandler2 = () => __async(exports, null, function* () {
  yield pg_default.connect();
  const app = (0, import_express5.default)();
  const PORT = process.env.PORT || 8080;
  app.use((0, import_cookie_parser.default)());
  app.use((0, import_helmet.default)());
  app.use((0, import_cors.default)());
  app.use((0, import_express_fileupload.default)({
    limits: {
      fileSize: 1e7
    },
    abortOnLimit: true
  }));
  app.use(import_express5.default.json());
  app.use(import_express5.default.urlencoded({ extended: true }));
  app.use(import_express5.default.static("public"));
  app.use("/api/auth/", auth_route_default);
  app.use("/api/employees/", employee_route_default);
  app.use("/api/tasks/", task_route_default);
  app.use("/api/charts/", chart_route_default);
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