export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
      token: generateToken(user),
    },
    process.env.JWT_SECRET,
    {
      expriresIn: '30d',
    }
  );
};
