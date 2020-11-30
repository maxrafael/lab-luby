import Star from '../models/Star';

class RepositoryStarController {
  async store(req, res) {
    const starExists = await Star.findOne({
      where: {
        repository_id: req.params.id,
        user_id: req.userId,
      },
    });

    if (starExists) {
      return res.status(400).json({ error: 'User already gave star' });
    }

    const star = await Star.create({
      repository_id: req.params.id,
      user_id: req.userId,
    });

    return res.json(star);
  }

  async delete(req, res) {
    const star = await Star.findOne({
      where: {
        repository_id: req.params.id,
        user_id: req.userId,
      },
    });

    await star.destroy();

    return res.status(200).json({ ok: 'Star has been deleted.' });
  }
}

export default new RepositoryStarController();
