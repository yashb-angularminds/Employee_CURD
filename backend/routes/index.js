const express = require("express");
const router = express.Router();
const userRoute = require("./user.route");
const authRoute = require("./auth.route");
const employeeRoute = require("./employee.route")

// Routes index
const defaultRoutes = [
  {
    path: "/users",
    route: userRoute,
  },
  {
    path: "/auth", 
    route: authRoute,
  },
  {
    path:"/employee",
    route:employeeRoute
  }

];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
