import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  );
};

export const isAuth = (req, res, next) => {
  const auth = req.headers.authorization;

  console.log('check authen');

  if (auth) {
    const token = auth.slice(7, auth.length);
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({ message: 'invalid token' });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: 'No token' });
  }
};
// CHeck addmin role
export const isAdmin = (req, res, next) => {
  console.log('check role');
  // console.log(req.user);
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(401).send({ message: 'Invalid Admin Token' });
  }
};

// check seller role
export const isSeller = (req, res, next) => {
  console.log('check role');
  // console.log(req.user);
  if (req.user && req.user.role === 'seller') {
    next();
  } else {
    res.status(401).send({ message: 'Invalid seller Token' });
  }
};
export const sellerOrAdmin = (req, res, next) => {
  console.log('check role');
  // console.log(req.user);
  if (req.user && (req.user.role === 'seller' || req.user.role === 'admin')) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid seller/Admin Token' });
  }
};
