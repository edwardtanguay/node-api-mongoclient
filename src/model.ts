import { MongoClient } from 'mongodb';
import { IEmployee } from './interfaces.js';

const conn = 'mongodb://localhost:27017';
const client = new MongoClient(conn);

const getData = async (done: (db: any) => void) => {
	await client.connect();
	const db = client.db('northwind');
	done(db);
};

export const getEmployees = () => {
	return new Promise((resolve, reject) => {
		try {
			getData(async (db) => {
				const employees = await db
					.collection('employees')
					.find({})
					.project({ firstName: 1, lastName: 1, title: 1, notes: 1 })
					.toArray();
				if (employees.length === 0) {
					// interpet no records as error
					reject('no data')
				} else {
					resolve(employees);
				}
			});
		}
		catch (e) {
			reject(e.message)
		}
	})
}

export const addEmployee = (employee: IEmployee) => {
	console.log('adding', employee);
	return 'ok';	
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
<li>GET <a href="employees">/employees</a> - get all employees</li>
</ul>
	`;
}


