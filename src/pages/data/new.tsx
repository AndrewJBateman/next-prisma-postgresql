import { Card, Form } from 'semantic-ui-react';

export default function newPage() {
	return (
		<div>
			<Card>
				<Card.Content>
					<Form>
						<Form.Field>
							<label htmlFor="title">Title</label>
							<input
								type="text"
								placeholder="Add data title"
								name="title"
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
							></textarea>
						</Form.Field>
					</Form>
				</Card.Content>
			</Card>
		</div>
	);
}
