/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next';
import { conn } from '../../../utils/database';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { method, body } = req;

	switch (method) {
		case 'GET': {
			try {
				const query = 'SELECT * FROM data';
				const response = await conn.query(query);
				console.log(response);

				return res.status(200).json('getting tasks');
			} catch (error) {
				console.log(error);
			}
		}

		case 'POST':
			try {
				const { title, description } = body;

				const query =
					'INSERT INTO data(title, description) VALUES ($1, $2) RETURNING *';
				const values = [title, description];

				const response = await conn.query(query, values);

				return res.status(200).json(response.rows[0]);
			} catch (error) {}
		default:
			return res.status(400).json('invalid method');
	}
};
