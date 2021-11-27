import { GetServerSideProps } from 'next';
import { Grid, Button } from 'semantic-ui-react';
import { Data } from 'src/interfaces/Data';
import { useRouter } from 'next/router';

import { DataList } from 'src/components/data/DataList';
import { Layout } from 'src/components/Layout';
interface Props {
	data: Data[];
}
const Home = ({ data }: Props) => {
	const { push } = useRouter();

	return (
		<Layout>
			{data.length === 0 ? (
				<Grid
					columns={3}
					centered
					verticalAlign="middle"
					style={{ height: '70%' }}
				>
					<Grid.Row>
						<Grid.Column>
							<h2>No data</h2>
							<Button onClick={() => push('/data/new')}>Add data</Button>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			) : (
				<DataList data={data} />
			)}
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async () => {
	const res = await fetch('http://localhost:3000/api/data');
	const data = await res.json();

	return {
		props: {
			data,
		},
	};
};

export default Home;
