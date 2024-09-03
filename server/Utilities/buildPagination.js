function buildPagination(data) {
  let list = [];
  let noOfPage = 1;
  let total = 0;
  list = data.length > 0 ? data[0].data : [];

  noOfPage = data[0].metadata.length > 0 ? data[0].metadata[0].page : 0;

  total = data[0].metadata.length > 0 ? data[0].metadata[0].total : 0;

  return {
    list,
    noOfPage,
    total,
  };
}

module.exports = { buildPagination };
