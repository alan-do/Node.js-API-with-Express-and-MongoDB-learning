const advancedResults = (model, populate) => async (req, res, next) => {
  let query;
  //copy request query
  const reqQuery = { ...req.query };

  //Field to execlude
  const removeFields = ["select", "sort", "page", "limit"];

  //loop over removeFields and delete them from reqQuery
  removeFields.forEach((param) => delete reqQuery[param]);

  // console.log(reqQuery);
  //create query string
  let queryStr = JSON.stringify(reqQuery);
  //create operator ($gt, gle,...)
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  //finding resouce
  query = model.find(JSON.parse(queryStr));

  //select field
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    // console.log(fields);
    query = query.select(fields);
    // console.log(query);
  }
  
  //sort field
  if (req.query.sort) {
    console.log(req.query.sort);
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  //pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments();

  query = query.skip(startIndex).limit(limit);

  //populate
  if (populate) {
    query = query.populate(populate);
  }

  // Executing query
  const results = await query;

  //pagination result
  const pagination = {};
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }
  if (startIndex > 0) {
    pagination.pre = {
      page: page - 1,
      limit,
    };
  }

  res.advancedResults = {
    success: true,
    count: results.length,
    pagination,
    data: results,
  };
  next();
};
module.exports = advancedResults;
