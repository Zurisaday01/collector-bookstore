'use client';
import Hero from '@/components/Hero';
import TrendingList from '@/components/TrendingList';
import { useUser } from '@clerk/nextjs';

const Home = () => {
	const { user } = useUser();

	console.log(user);

	return (
		<>
			<Hero />
			<TrendingList />
		</>
	);
};
export default Home;
