const AppError = require('../utils/utils.AppError');
const { catchAsyncError } = require('../utils/utils.functions');
const { createQuery, cache, clearCache } = require('../utils/utils.db');

// wrappers return specific middlewares for different types of queries for resoure

/** *********************************************************************
 * createOne --> creates a resource document based on the model provided
 * args --> Model, config: {resourceName: String, options: {}}
 * */

exports.createOne = (Model, config) => {
  return catchAsyncError(async (req, res, next) => {
    const q = Model.create(req.body);
    const doc = await q;
    clearCache(q.mongooseCollection.name);

    res.status(201).json({
      status: 'success',
      data: {
        [config.resourceName]: doc
      }
    });
  });
};

/** *********************************************************************
 * getAll --> returns all the docs for a resource based on the model
 * 						provided
 * args --> Model, config: {resourceName: String, options: {}}
 * */
exports.getAll = (Model, config) => {
  return catchAsyncError(async (req, res, next) => {
    const query = createQuery(req, Model.find());
    const result = await cache(query, config.resourceName);
    res.status(200).json({
      status: 'success',
      results: result.length,
      data: {
        [config.resourceName]: result
      }
    });
  });
};

/** *********************************************************************
 * getOne--> returns the document for a resource based on the model provided
 * args --> Model, config: {resourceName: String, options: {}}
 * */
exports.getOne = (Model, config) => {
  return catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const q = Model.findById(id);
    const doc = await cache(q, id);
    if (!doc)
      return next(
        new AppError(404, `${config.resourceName} with id ${id} not found`)
      );
    let userDoc;
    let data = { [config.resourceName]: doc };
    if (config.resourceName === 'user' && config.requestReviews) {
      userDoc = await doc.requestReviews(doc.id);
      data = { [config.resourceName]: userDoc };
    }
    res.status(200).json({
      status: 'success',
      data
    });
  });
};

/** *********************************************************************
 * updateOne--> updates and returns the document for a resource based on the model
 * 						provided
 * args --> Model, config: {resourceName: String, options: {}}
 * */
exports.updateOne = (Model, config) => {
  return catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const q = Model.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    const updatedDoc = await q;

    if (!updatedDoc)
      return next(
        new AppError(404, `${config.resourceName} with id ${id} not found`)
      );

    clearCache(q.mongooseCollection.name);
    clearCache(id);

    res.status(200).json({
      status: 'success',
      data: {
        [config.resourceName]: updatedDoc
      }
    });
  });
};

/** *********************************************************************
 * deleteOne--> deletes the document of a resource type based on the provided model
 * args --> Model, config: {resourceName: String, options: {}}
 * */
exports.deleteOne = (Model, config) => {
  return catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const q = Model.findByIdAndDelete(id);

    const doc = await q.exec();

    if (!doc)
      return next(
        new AppError(404, `${config.resourceName} with id ${id} not found`)
      );

    clearCache(q.mongooseCollection.name);
    clearCache(id);
    res.status(204).json({
      status: 'success',
      data: null
    });
  });
};
