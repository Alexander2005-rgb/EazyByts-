module.exports = function (req, res, next) {
  // Example authorization middleware
  // Check if user role or permissions allow access to CMS dashboard
  // This is a placeholder, implement your own logic as needed

  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Example: only allow users with role 'admin'
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }

  next();
};
