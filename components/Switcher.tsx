'use client';

import { Switch } from '@/components/ui/switch';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Label } from './ui/label';
import DynamicIcon from './DynamicIcon';
import MiniSpinner from './MiniSpinner';

const Switcher = () => {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	const handleChange = (checked: boolean) => {
		console.log(theme);
		if (checked) {
			setTheme('dark');
		} else {
			setTheme('light');
		}
	};

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return <MiniSpinner />;

	return (
		<div className='flex items-center gap-1'>
			<Label htmlFor='theme'>
				{/* <DynamicIcon size={20} name={`${theme === 'dark' ? 'moon' : 'sun'}`} /> */}
			</Label>
			<Switch
				defaultChecked={theme === 'dark'}
				onCheckedChange={handleChange}
				id='theme'
			/>
		</div>
	);
};
export default Switcher;
