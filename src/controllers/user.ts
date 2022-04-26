import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
const uuid = require('uuid');
import db from '../database/models';

class UserController {
  static getAllUser = async (req: Request, res: Response) => {
    try {
      return await db.User.findAll().then((users: any) => {
        return res.status(200).json({ status: 200, message: users });
      });
    } catch {
      return res.status(500).json({ status: 500, message: 'Internal Server Error.' });
    }
  };

  static getUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      return await db.User.findOne({
        where: { id },
      }).then((user: any) => {
        if (user) return res.status(200).json({ status: 200, message: user });
        return res.status(404).json({ status: 404, message: 'Data not found' });
      });
    } catch {
      return res.status(500).json({ status: 500, message: 'Internal Server Error.' });
    }
  };

  static createUser = async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;
      const emailExist = await db.User.findOne({ where: { email } });

      if (emailExist) return res.status(409).json({ message: 'Email taken.' });

      const hash = await bcrypt.hash(password, 10);

      return await db.User.create({
        id: uuid.v4(),
        name,
        email,
        password: hash,
      })
        .then((user: any) => res.status(201).json({ status: 201, message: user }))
        .catch((e: any) => res.status(500).json({ error: e, message: 'Failed to Create User' }));
    } catch {
      return res.status(500).json({ status: 500, message: 'Internal Server Error.' });
    }
  };

  static updateUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, password } = req.body;
      let hash: string;

      return await db.User.findOne({
        where: { id },
      })
        .then((user: any) => {
          if (name) {
            user.update({ name });
          }
          if (password) {
            hash = bcrypt.hashSync(password, 10);
            user.password = hash;

            user.save();
          }
          return res.status(200).json({ status: 200, message: 'User Edited' });
        })
        .catch((e: any) => res.status(500).json({ error: e }));
    } catch {
      return res.status(500).json({ status: 500, message: 'Internal Server Error.' });
    }
  };

  static deleteUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      return await db.User.destroy({ where: { id } })
        .then((user: any) => {
          if (user) return res.status(200).json({ status: 200, message: 'User Deleted.' });
        })
        .catch((e: any) => res.status(500).json({ error: e }));
    } catch {
      return res.status(500).json({ status: 500, message: 'Internal Server Error.' });
    }
  };
}

export default UserController;
