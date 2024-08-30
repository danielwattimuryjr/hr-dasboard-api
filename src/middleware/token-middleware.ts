// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';


// export const verifyToken = (req: Request, res: Response, next: NextFunction) => {

//   if (!token) {
//     throw new Error("No token provided")
//   }

//   try {
//     const decoded = jwt.verify(token, 'test');
//     req.user = decoded.user;
//     next();
//   } catch (error) {
//     throw new Error("Invalid token")
//   }
// };

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { query } from '../libs/pg';

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  // Mengambil token dari header Authorization
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, 'test');
    console.log(decoded);
    const { user } = decoded as {
      user: {
        id: number;
        email: string;
        full_name: string;
        username: string;
        role_name: string;
        display_name: string;
      }
    }

    const checkQuery = await query<{ id: number; }>(
      `
    SELECT id
    FROM public."users"
    WHERE email=$1
    `,
      [user.email]
    )

    if (checkQuery.rowCount === 0) {
      return res.status(401).json({ message: 'User does not exist' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};