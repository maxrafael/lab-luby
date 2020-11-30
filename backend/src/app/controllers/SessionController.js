import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import User from '../models/User';
import Token from '../models/Token';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      username: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Required field' });
    }

    const { username } = req.body;

    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    const { id, name, email, location, bio } = user;

    await Token.create({ user_id: user.id });

    return res.json({
      user: {
        id,
        name,
        email,
        location,
        bio,
      },
      token: jwt.sign({ id }, '72b741f943f46f0d482fa19d333140be', {
        expiresIn: '1d',
      }),
    });
  }
}

export default new SessionController();
