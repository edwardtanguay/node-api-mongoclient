import { MongoClient } from 'mongodb';

const conn = 'mongodb://localhost:27017';
const client = new MongoClient(conn);

const getData = async (done: (db: any) => void) => {
	await client.connect();
	const db = client.db('northwind');
	done(db);
};

export const getEmployees = () => {
	getData(async (db) => {
		const employees = await db
			.collection('employees')
			.find({})
			.project({ firstName: 1, lastName: 1 })
			.toArray();
		console.log(employees);
	})
}

export const getApiInstructions = () => {
	return `
<style>
	body {
		background-color: #444;
		padding: 1rem;
		color: #fff;
		font-family: courier;
	}
	code {
		background-color: #333;
	}
	a {
		color: orange;
	}
</style>
<h1>Book Site API</h1>
<ul>
<li><a href="employees">/employees</a> - get all employees</li>
</ul>
	`;
}

