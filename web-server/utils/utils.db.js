const AppError = require('../utils/utils.AppError');
const redisClient = require('../service/redis');
const { composedFunc } = require('../utils/utils.functions');

// constant
// query params to exclude from the req query
const PARAMS_TO_EXCLUDE = ['page', 'sort', 'limit', 'fields'];

// function that can be composed for caching based on the query
exports.cache = async (Query, keyName) => {
  const query = JSON.stringify({
    ...Query.getQuery(),
    options: Query.getOptions(),
    collection: Query.mongooseCollection.name
  });
  // CHECK IF THE QUERY EXIST IN CACHE
  const cachedData = await redisClient.hget(keyName, query);
  // IF QUERY EXIST IS CACHE RETURN THE VALUE
  let docs;
  if (cachedData) {
    const temp = JSON.parse(cachedData);
    docs = Array.isArray(temp)
      ? temp.map(d => Query.model(d))
      : Query.model(temp);
    console.log('seving from cache');
    return docs;
  }
  // ELSE EXECUTE THE QUERY
  const data = await Query.exec();
  // CACHE THE QUERY RETURN VALUE
  redisClient.hset(keyName, query, JSON.stringify(data), 'EX', 15 * 60);
  // RETURN THE VALUE
  return data;
};

// handle duplicate key error for reviews
const handleDuplicateKeyError = err => {
  if (err.code === 11000) {
    const resourceName = err.errmsg
      .match(/(natours-react)\.(\w+)/)[2]
      .split('')
      .slice(0, -1)
      .join('');
    if (
      Object.keys(err.keyPattern).includes('_user') &&
      Object.keys(err.keyPattern).includes('_tour')
    ) {
      const message = `${resourceName} can be created twice for same tour by the user`;
      return new AppError(400, message);
    }
    const keyName = Object.keys(err.keyValue)[0];
    const message = `A ${resourceName} with ${keyName} "${err.keyValue[keyName]}" already exists`;
    return new AppError(400, message);
  }
};
// handle datebase errors
exports.handleDatabaseError = err => {
  switch (err.name) {
    case 'MongoError':
      return handleDuplicateKeyError(err);
    case 'ValidationError':
      return new AppError(
        400,
        `Invalid field values. ${err.message.match(
          /(\w+\s\w+:\s)(.*)/.exec(err.message)[2]
        )}`
      );
    default:
      return err;
  }
};

const excludeQueryParams = (reqQuery, params = PARAMS_TO_EXCLUDE) => {
  const newQuery = {};
  Object.keys(reqQuery).forEach(key => {
    if (!params.includes(key)) {
      newQuery[key] = reqQuery[key];
    }
  });
  return newQuery;
};

// functions for sorting data through a query
const sortData = (req, Query) => {
  const { sort } = req.query;
  const sortBy = sort ? sort.split(',').join(' ') : '-createdAt';
  return Query.sort(sortBy);
};

// function for selecting fields
const selectFromData = (req, Query) => {
  const { fields } = req.query;
  const selection = fields ? fields.split(',').join(' ') : '-__v';
  return Query.select(selection);
};

// applys filters
const filterData = (req, Query) => {
  const filterBy = JSON.parse(
    JSON.stringify(excludeQueryParams(req.query)).replace(
      /\b(gt|lt|lte|gte)\b/g,
      match => `$${match}`
    )
  );
  return Query.find(filterBy);
};

// applys pagination
const paginate = (req, Query) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  return Query.skip((page - 1) * limit).limit(limit);
};

const advQuery = (...fns) => (req, Query) => {
  // next step binds each function with the req object
  const boundFns = fns.map(fn => fn.bind(null, req));
  // next step takes number of functions with arity 1 and returns a composed function
  return composedFunc(...boundFns)(Query);
};
exports.createQuery = advQuery(paginate, sortData, selectFromData, filterData);
