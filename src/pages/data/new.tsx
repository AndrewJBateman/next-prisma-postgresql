import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Card, Form, Icon, Button } from 'semantic-ui-react';
import { useRouter } from 'next/router';

import { Data } from 'src/interfaces/Data';
import { Layout } from 'src/components/Layout';

const inititalState = {
  title: "",
  description: "",
};

const NewPage = (): JSX.Element => {
	const [data, setData] = useState<Data>(inititalState)
	const router = useRouter();

	const handleChange = ({
		target: { name, value },
	}: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
		setData({ ...data, [name]: value });

	const createData = async (data: Data) => {
		await fetch('http://localhost:3000/api/data', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
	};

	const loadData = async (id: string) => {
		const res = await fetch('http://localhost:3000/api/data/' + id);
		const data = await res.json();
		setData({ title: data.title, description: data.description });
	};

	const updateData = async (id: string, data: Data) => {
		await fetch('http://localhost:3000/api/data' + id, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			if (router.query.id) {
				console.log('updating');
			} else {
				await createData(data);
				router.push('/');
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (typeof router.query.id === 'string') loadData(router.query.id);
	}, [router.query]);

	return (
		<Layout>
			<Card>
				<Card.Content>
					<Form onSubmit={handleSubmit}>
						<Form.Field>
							<label htmlFor="title">Title:</label>
							<input
								type="text"
								placeholder="Add data title"
								name="title"
								onChange={handleChange}
								value={data.title}
							/>
						</Form.Field>
						<Form.Field>
							<label htmlFor="description">Description:</label>
							<textarea
								name="description"
								id="description"
								rows={2}
								placeholder="Write a Description"
								onChange={handleChange}
								value={data.description}
							></textarea>
						</Form.Field>
						<Button>
							<Icon name="save" />
							Save
						</Button>
					</Form>
				</Card.Content>
			</Card>
		</Layout>
	);
};

export default NewPage;
