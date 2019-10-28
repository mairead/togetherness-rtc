const routes = (module.exports = require("next-routes")());

routes
  .add("index", "/")
  .add("channel", "/channel/:id")
  .add("slides", "/slides");
//   .add("test_channel", "/test_channel/:id");
