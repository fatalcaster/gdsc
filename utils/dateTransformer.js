const getDateFormat = function () {
  const date = new Date();
  const dd = date.getDate();
  const mm = date.getMonth() + 1;
  const yyyy = date.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
};

module.exports = getDateFormat;
