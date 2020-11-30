import { Op } from 'sequelize';

import * as Yup from 'yup';
import Repository from '../models/Repository';
import User from '../models/User';

class RepositoryController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const repositories = await Repository.findAll({
      where: { user_id: req.userId },
      order: ['name'],
      limit: 4,
      offset: (page - 1) * 4,
      attributes: ['id', 'name', 'description', 'public'],
      include: [{ model: User, as: 'whoStarred', attributes: ['name'] }],
    });

    return res.json(repositories);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string(),
      public: Yup.boolean().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const repoExists = await Repository.findOne({
      where: {
        [Op.or]: [{ name: req.body.name }],
      },
    });

    if (repoExists) {
      return res.status(400).json({ error: 'Repository already exists.' });
    }

    const { name, description } = req.body;

    const user = await User.findByPk(req.userId);

    const repository = await Repository.create({
      name,
      description,
      public: req.body.public,
      slug: `${user.username}-${name}`,
      user_id: req.userId,
    });

    return res.json(repository);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string(),
      public: Yup.boolean().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { name, description } = req.body;

    const repository = await Repository.findByPk(req.params.id);

    if (name !== repository.name) {
      const repoExists = await Repository.findOne({
        where: {
          [Op.or]: [{ name: req.body.name }],
        },
      });

      if (repoExists) {
        return res.status(400).json({ error: 'Repository already exists.' });
      }
    }

    await repository.update(req.body);

    const user = await User.findByPk(req.userId);

    return res.json({
      name,
      description,
      public: req.body.public,
      slug: `${user.username}-${name}`,
    });
  }

  async delete(req, res) {
    const repository = await Repository.findByPk(req.params.id);

    await repository.destroy();

    return res.status(200).json({ ok: 'Repository has been deleted.' });
  }
}

export default new RepositoryController();
