const templatesRouter = require("./templatesRoutes");
const userRouter = require("./userRoutes");
const reviewsRouter = require("./reviewsRoutes");
const stripeRouter = require("./stripeRoutes");
const cartRouter = require("./cartRoutes");
const adminUserRouter = require('./adminUserRoutes');
const adminTemplatesRouter = require("./adminTemplatesRoutes");


const router = require("express").Router();

router
.use("/templates", templatesRouter)
.use("/user", userRouter)
.use("/reviews", reviewsRouter)
.use("/payment", stripeRouter)
.use("/cart", cartRouter)
.use('/admin/user', adminUserRouter)
.use('/admin/templates', adminTemplatesRouter)


module.exports= router;
