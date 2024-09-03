exports.findSecondsDifference = (date1, date2) => {
  var oneSecond_ms = 1000;

  // Convert both dates to milliseconds
  var date1_ms = date1.getTime();
  var date2_ms = date2.getTime();

  // Calculate the difference in milliseconds
  var difference_ms = date2_ms - date1_ms;

  // Convert back to days and return
  return Math.round(difference_ms / oneSecond_ms);
};
