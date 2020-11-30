import Follower from '../models/Follower';
import User from '../models/User';

class FollowerController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const repositories = await Follower.findAll({
      where: { user_id: req.userId },
      order: ['name'],
      limit: 4,
      offset: (page - 1) * 4,
      attributes: ['id', 'name', 'description', 'public'],
    });

    return res.json(repositories);
  }

  async store(req, res) {
    const followExists = await Follower.findOne({
      where: {
        user_id: req.userId,
        follower_id: req.params.id,
      },
    });

    if (followExists) {
      return res.status(400).json({ error: 'User already follows.' });
    }

    const user = await User.findByPk(req.params.id);

    if (user.id === req.userId) {
      return res.status(400).json({ error: 'User cannot follow himself.' });
    }

    const follower = await Follower.create({
      user_id: req.userId,
      follower_id: req.params.id,
    });

    return res.json(follower);
  }

  async delete(req, res) {
    const follower = await Follower.findOne({
      where: {
        user_id: req.userId,
        follower_id: req.params.id,
      },
    });

    await follower.destroy();

    return res.status(200).json({ ok: 'Follower has been deleted.' });
  }
}

export default new FollowerController();
