'use client';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from '@/components/ui/command';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { useState } from 'react';
import { Button } from './ui/button';
import { CheckIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const genres = [
	{
		value: 'fiction',
		label: 'Fiction',
	},
	{
		value: 'romance',
		label: 'Romance',
	},
	{
		value: 'science-fiction',
		label: 'Science Fiction',
	},
	{
		value: 'mystery',
		label: 'Mystery',
	},
];

const ComboboxGenre = () => {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState('');

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant='outline'
					role='combobox'
					aria-expanded={open}
					className='w-[200px] justify-between'>
					{value
						? genres.find(genre => genre.value === value)?.label
						: 'Select genre...'}
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-[200px] p-0'>
				<Command>
					<CommandInput placeholder='Search genre...' className='h-9' />
					<CommandEmpty>No genre found.</CommandEmpty>
					<CommandGroup>
						{genres.map(genre => (
							<CommandItem
								key={genre.value}
								value={genre.value}
								onSelect={currentValue => {
									setValue(currentValue === value ? '' : currentValue);
									setOpen(false);
								}}>
								{genre.label}
								<CheckIcon
									className={cn(
										'ml-auto h-4 w-4',
										value === genre.value ? 'opacity-100' : 'opacity-0'
									)}
								/>
							</CommandItem>
						))}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	);
};
export default ComboboxGenre;
