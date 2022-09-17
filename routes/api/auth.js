const express = require("express");
const controllers = require("../../controllers/auth");
const { schemas } = require("../../models/users");
const { controllersWrapper } = require("../../helpers");
const { validationBody,authenticate,upload } = require("../../middlewares")

const router = express.Router();

router.post(
  "/register",
  validationBody(schemas.registerSchema),
  controllersWrapper(controllers.register)
);

router.post(
  "/login",
  validationBody(schemas.loginSchema),
  controllersWrapper(controllers.login)
);

router.get("/current", authenticate, controllersWrapper(controllers.getCurrentUser));

router.get("/logout", authenticate, controllersWrapper(controllers.logout));

router.patch(
  "/",
  authenticate,
  validationBody(schemas.subscriptionSchema),
  controllersWrapper(controllers.updateSubscription)
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  controllersWrapper(controllers.updateAvatar)
);

module.exports = router;