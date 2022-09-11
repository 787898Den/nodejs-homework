const getCurrentUser = async (req, res) => {
  res.json({
    data: {
      user: {
        email:req.user.email,
        subscription:req.user.subscription,
      },
    },
  });
};

module.exports = getCurrentUser;