import { MongoClient } from 'mongodb';

const handler = async (req, res) => {
	if (req.method === 'POST') {
		const body = req.body;
		const client = await MongoClient.connect(process.env.connectquery);

		const db = client.db();
		const meetUpsCollection = db.collection('meetups');
		const result = await meetUpsCollection.insertOne(body);

		client.close();
		res.status(201).json({
			status: 'ok',
		});
	}
};

export default handler;
