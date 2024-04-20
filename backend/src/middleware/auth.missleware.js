import jwt from "jsonwebtoken";
export const authentication = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.sendStatus(403);
  }
  try {
    const data = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = data.id;
    req.userRole = data.role;
    return next();
  } catch {
    return res.sendStatus(403);
  }
};

export const authorization = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(400).json({
        status: false,
        message: "Unauthorized user",
      });
    } else {
      next();
    }
  };
};
