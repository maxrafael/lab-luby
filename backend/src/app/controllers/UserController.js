import { Op } from 'sequelize';

import * as Yup from 'yup';
import User from '../models/User';
import File from '../models/File';
import Repository from '../models/Repository';
import Follower from '../models/Follower';

class UserController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const users = await User.findOne({
      where: { id: req.userId },
      order: ['name'],
      limit: 20,
      offset: (page - 1) * 20,
      attributes: ['id', 'name', 'email', 'username', 'bio'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'name', 'url'],
        },
      ],
    });

    const { count: followers } = await Follower.findAndCountAll({
      where: { follower_id: req.userId },
    });

    const { count: following } = await Follower.findAndCountAll({
      where: { user_id: req.userId },
    });

    const { count: repositories } = await Repository.findAndCountAll({
      where: { user_id: req.userId },
    });

    return res.json({ users, followers, following, repositories });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      location: Yup.string().required(),
      username: Yup.string().required(),
      bio: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const userExists = await User.findOne({
      where: {
        [Op.or]: [
          { name: req.body.name },
          { email: req.body.email },
          { username: req.body.username },
        ],
      },
    });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const { id, name, email, location, username, bio } = await User.create(
      req.body
    );

    return res.json({
      id,
      name,
      email,
      location,
      username,
      bio,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      location: Yup.string().required(),
      username: Yup.string().required(),
      bio: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { name, location, bio, email, username } = req.body;

    const user = await User.findByPk(req.userId);

    if (
      name !== user.name ||
      email !== user.email ||
      username !== user.username
    ) {
      const userExists = await User.findOne({
        where: {
          [Op.or]: [
            { name: req.body.name },
            { email: req.body.email },
            { username: req.body.username },
          ],
        },
      });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists.' });
      }
    }

    await user.update(req.body);

    const { id, avatar } = await User.findByPk(req.userId, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json({
      id,
      name,
      email,
      location,
      username,
      bio,
      avatar,
    });
  }

  async delete(req, res) {
    const user = await User.findByPk(req.params.id);

    await user.destroy();

    return res.status(200).json({ ok: 'User has been deleted.' });
  }
}

export default new UserController();
