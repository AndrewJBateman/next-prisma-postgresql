import React from 'react';
import { Data } from 'src/interfaces/Data';
interface Props {
	data: Data[];
}
export default function index({ data }: Props) {
	return <>{data.length === 0 ? <h2>There is no data</h2> : <h2>Data</h2>}</>;
}

export const getServerSideProps = async () => {
	const res = await fetch('http://localhost:3000/api/data');
	const data = await res.json();
  console.log('data: ', data)

	return {
		props: {
			data,
		},
	};
};
