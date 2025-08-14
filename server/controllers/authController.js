import User from '../models/User.js';

export const handleAuth0Login = async (req, res) => {
  try {
    const { sub, name, email, picture } = req.user;

    if (!sub || !email) {
      return res.status(400).json({ message: 'Invalid user info from Auth0' });
    }


    let user = await User.findOne({ auth0Id: sub });


    if (!user) {
      user = new User({
        auth0Id: sub,
        name,
        email,
        picture,
      });

      await user.save();
    }

    res.status(200).json({
      message: 'User authenticated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
      },
    });
  } catch (error) {
    console.error('Auth0 login error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
