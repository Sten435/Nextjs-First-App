import MeetupList from '../components/meetups/MeetupList';
import { MongoClient } from 'mongodb';
import Head from 'next/head';

const HomePage = (props) => {
	return (
		<>
			<Head>
				<title>Next MeetUp Page</title>
				<meta name='description' content='Web App where you can create and view MeetUps' />
			</Head>
			<MeetupList meetups={props.meetups} />
		</>
	);
};

export async function getStaticProps() {
	const client = await MongoClient.connect(process.env.connectquery);

	const db = client.db();
	const meetUpsCollection = db.collection('meetups');
	const meetups = await meetUpsCollection.find().toArray();
	client.close();

	return {
		props: {
			meetups: meetups.map((meetup) => ({
				title: meetup.title,
				image: meetup.image,
				address: meetup.address,
				description: meetup.description,
				id: meetup._id.toString(),
			})),
		},
		revalidate: 1,
	};
}

export default HomePage;
