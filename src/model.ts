import { MongoClient, ObjectID } from 'mongodb';
import { IEmployee } from './interfaces.js';

const conn = 'mongodb://localhost:27017';
const client = new MongoClient(conn);

const accessDatabase = async (done: (db: any) => void) => {
	await client.connect();
	const db = client.db('northwind');
	done(db);
};

export const getEmployees = () => {
	return new Promise((resolve, reject) => {
		try {
			accessDatabase(async (db) => {
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
			reject(e)
		}
	})
}

export const addEmployee = async (employee: IEmployee) => {
	return new Promise((resolve, reject) => {
		try {
			accessDatabase(async (db) => {
				const employeesCollection = db.collection("employees");
				const result = await employeesCollection.insertOne(employee);
				resolve({
					status: "success",
					newId: result.insertedId
				})
			});
		}
		catch (e) {
			reject(e);
		}
	})
}

export const deleteEmployee = async (_id: string) => {
	return new Promise((resolve, reject) => {
		try {
			accessDatabase(async (db) => {
				const employeesCollection = db.collection("employees");
				const result = await employeesCollection.deleteOne({ _id: new ObjectID(_id) });
				if (result.deletedCount === 1) {
					resolve({
						status: "success",
						message: `item with id "${_id}" was deleted`
					})
				} else {
					reject({
						status: "error",
						message: `item with id "${_id}" was not deleted`
					})
				}
			});
		}
		catch (e) {
			reject(e);
		}
	})
}

export const editEmployee = async (_id: string, employee: IEmployee) => {
	return new Promise((resolve, reject) => {
		try {
			accessDatabase(async (db) => {
				const employeesCollection = db.collection("employees");
				const result = await employeesCollection.updateOne({ _id: new ObjectID(_id) }, { $set: {...employee} });
				if (result.modifiedCount === 1) {
					resolve({
						status: "success",
						message: `item with id "${_id}" was edited`
					})
				} else {
					reject({
						status: "error",
						message: `item with id "${_id}" was not edited`
					})
				}
			});
		}
		catch (e) {
			reject(e);
		}
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
<li>GET <a href="employees">/employees</a> - get all employees</li>
</ul>
	`;
}


