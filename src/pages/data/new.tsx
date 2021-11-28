import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Card, Form, Confirm, Grid, Icon, Button } from 'semantic-ui-react';
import { useRouter } from 'next/router';

import { Data } from 'src/interfaces/Data';
import { Layout } from 'src/components/Layout';

type ChangeInputHandler = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

const initialState = {
	title: '',
	description: '',
};

const NewPage = (): JSX.Element => {
	const [data, setData] = useState<Data>(initialState);
	const [loading, setLoading] = useState(false);
	const [openConfirm, setOpenConfirm] = useState(false);
	const router = useRouter();

	const createData = async (data: Data) => {
		await fetch('http://localhost:3000/api/data', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
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

		setLoading(true);
		try {
			if (typeof router.query.id === 'string') {
				updateData(router.query.id, data)
			} else {
				createData(data)
			}
      setData(initialState)
      router.push('/');
		} catch (error) {
			console.log(error);
		}
		setLoading(false);
	};

	const handleChange = ({
		target: { name, value },
	}: ChangeInputHandler) =>
		setData({ ...data, [name]: value });

	const loadData = async (id: string) => {
		const res = await fetch('http://localhost:3000/api/data/' + id);
		const data = await res.json();
		setData({ title: data.title, description: data.description });
	};

	const handleDelete = async (id: string) => {
		try {
			const res = await fetch('http://localhost:3000/api/data' + id, {
				method: 'DELETE',
			});
			router.push('/');
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (typeof router.query.id === 'string') loadData(router.query.id);
	}, [router.query]);

	return (
		<Layout>
			<Grid
				centered
				columns="3"
				verticalAlign="middle"
				style={{ height: '70%' }}
			>
				<Grid.Column>
					<Card>
						<Card.Content>
							<Form onSubmit={handleSubmit}>
								<Form.Field>
									<label htmlFor="title">Title</label>
									<input
										type="text"
										placeholder="Add data title"
										name="title"
										onChange={handleChange}
										value={data.title}
                    autoFocus
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
								{router.query.id ? (
									<Button color="teal" loading={loading}>
										<Icon name="save" />
										Update
									</Button>
								) : (
									<Button primary loading={loading}>
										<Icon name="save" />
										Save
									</Button>
								)}
							</Form>
						</Card.Content>
					</Card>

					{router.query.id && (
						<Button inverted color="red" onClick={() => setOpenConfirm(true)}>
							<Icon name="trash" />
							Delete
						</Button>
					)}
				</Grid.Column>
			</Grid>

			<Confirm
				header="Delete data"
				content={`Delete data ${router.query.id} - are you sure?`}
				open={openConfirm}
				onCancel={() => setOpenConfirm(false)}
				onConfirm={() =>
					typeof router.query.id === 'string' && handleDelete(router.query.id)
				}
			/>
		</Layout>
	);
};

export default NewPage;
