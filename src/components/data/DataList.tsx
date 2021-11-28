import { Card } from 'semantic-ui-react';
import { useRouter } from 'next/router';

import { Data } from 'src/interfaces/Data';

interface Props {
	data: Data[];
}

export const DataList = ({ data = [] }: Props) => {
	const router = useRouter();

	return (
		<Card.Group itemsPerRow={4}>
			{data.map((data) => {
				<Card
					key={data.id}
					onClick={() => router.push(`/data/edit/${data.id}`)}
				>
					<Card.Content>
						<Card.Header>{data.title}</Card.Header>
						{data.created_on && (
							<Card.Meta>
								{new Date(data.created_on).toLocaleDateString()}
							</Card.Meta>
						)}
						<Card.Description>{data.description}</Card.Description>
					</Card.Content>
				</Card>
			})}
		</Card.Group>
	);
};
