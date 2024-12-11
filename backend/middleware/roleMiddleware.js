export const authorizeRole = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.userType)) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }
    next();
  };
  