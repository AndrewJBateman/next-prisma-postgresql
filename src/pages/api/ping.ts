import { NextApiRequest, NextApiResponse } from 'next';
import {conn} from '../../utils/database'

type Data = {
  message: string;
  time: string;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	const response = await conn.query('SELECT NOW()');
	console.log('response: ', response);
	return res.status(200).json({ message: 'tested', time: response.rows[0].now });
};
