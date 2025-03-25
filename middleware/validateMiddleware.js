import { ZodError } from "zod";

const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res
        .status(400)
        .json({ message: error.errors.map((err) => err.message) });
    }
    res.status(500).json({ message: "Server Error" });
  }
};

export default validate;
