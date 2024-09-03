module.exports = ({ name, link }) => {
  const errors = {
    name: "",
    url: "",
  };

  const validUrl = link.match(
    /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
  );

  if (!(validUrl !== null)) {
    errors.url = "Invalid URL";
    errors.name = name;
  }

  return errors;
};
