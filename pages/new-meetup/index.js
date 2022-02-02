import Head from 'next/head';
import { useRouter } from 'next/router';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';

const NewMeetupPage = () => {
	const router = useRouter();

	const onAddMeetupHandler = async (enteredMeetupData) => {
		const result = await fetch('/api/new-meetup', {
			method: 'POST',
			body: JSON.stringify(enteredMeetupData),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const data = await result.json();
		router.replace('/');
	};
	return (
		<>
			<Head>
				<title>Create MeetUp</title>
				<meta name='description' content='Add your own meetups to our database.' />
			</Head>
			<NewMeetupForm onAddMeetup={onAddMeetupHandler} />
		</>
	);
};

export default NewMeetupPage;
