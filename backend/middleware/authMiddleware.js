// import jwt from 'jsonwebtoken';

// export const authenticateUser = (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1]; // Bearer token

//   if (!token) {
//     return res.status(401).json({ error: 'Access denied. No token provided.' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // User info from token
//     next();
//   } catch (error) {
//     res.status(400).json({ error: 'Invalid token.' });
//   }
// };
