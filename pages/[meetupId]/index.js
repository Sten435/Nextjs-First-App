import Head from 'next/head';
import MeetUpDetail from '../../components/meetups/MeetUpDetail';
import { MongoClient, ObjectId } from 'mongodb';

const MeetUpDetails = (props) => {
	return (
		<>
			<Head>
				<title>{props.meetup.title}</title>
				<meta name='description' content={props.meetup.description} />
			</Head>
			<MeetUpDetail
				image={props.meetup.image}
				title={props.meetup.title}
				address={props.meetup.address}
				description={props.meetup.description}
			/>
		</>
	);
};

export async function getStaticPaths() {
	const client = await MongoClient.connect(process.env.connectquery);
	const db = client.db();
	const meetUpsCollection = db.collection('meetups');
	const meetups = await meetUpsCollection.find({}, { _id: 1 }).toArray();
	client.close();

	return {
		fallback: false,
		paths: meetups.map((meetup) => ({ params: { meetupId: meetup._id.toString() } })),
	};
}

export async function getStaticProps(context) {
	const meetupId = context.params.meetupId;

	const client = await MongoClient.connect(process.env.connectquery);

	const db = client.db();
	const meetUpsCollection = db.collection('meetups');
	const meetups = await meetUpsCollection.findOne({ _id: ObjectId(meetupId) });
	client.close();

	return {
		props: {
			meetup: {
				title: meetups.title,
				image: meetups.image,
				address: meetups.address,
				description: meetups.description,
				id: meetups._id.toString(),
			},
		},
	};
}

export default MeetUpDetails;
