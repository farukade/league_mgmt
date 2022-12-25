const crypto = require("crypto");
const { pbkdf2Sync, randomBytes } = crypto;
const { log } = console;

exports.constants = {
  handleSuccess: (res, result, message, code = 200, metadata = undefined) => {
    return res.status(code).send({ success: true, message, result, metadata });
  },
  handleBadRequests: (res, message = "failed", code = 400) => {
    return res.status(code).send({ success: false, message });
  },
  handleError: (res, error) => {
    log(error);
    return res.status(500).send({ success: false, message: error.message || "an error occurred" });
  },
  hashString: (str) => {
    const salt = randomBytes(30).toString("hex");
    const hash = pbkdf2Sync(str, salt, 1000, 64, `sha512`).toString(`hex`);
    return { hash, salt };
  },
};
