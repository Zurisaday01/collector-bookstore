'use client';

import * as React from 'react';
import { X } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Command, CommandGroup, CommandItem } from '@/components/ui/command';
import { Command as CommandPrimitive } from 'cmdk';

type Option = Record<'value' | 'label', string>;

export function MultiSelect({
	placeholder,
	options,
	defaultSelected,
	onChange,
	disabled,
}: {
	placeholder: string;
	options: { value: string; label: string }[];
	defaultSelected: { value: string; label: string }[];
	onChange: (value: string) => void;
	disabled: boolean;
}) {
	const inputRef = React.useRef<HTMLInputElement>(null);
	const [open, setOpen] = React.useState(false);
	const [selected, setSelected] = React.useState<Option[]>([
		...defaultSelected,
	]);
	const [inputValue, setInputValue] = React.useState('');

	React.useEffect(() => {
		onChange(
			selected.map(option => `#${option.value}:${option.label}`).join(', ')
		);
		return () => {};
	}, [selected, onChange]);

	const handleUnselect = React.useCallback((option: Option) => {
		setSelected(prev => prev.filter(s => s.value !== option.value));
	}, []);

	const handleKeyDown = React.useCallback(
		(e: React.KeyboardEvent<HTMLDivElement>) => {
			const input = inputRef.current;
			if (input) {
				if (e.key === 'Delete' || e.key === 'Backspace') {
					if (input.value === '') {
						setSelected(prev => {
							const newSelected = [...prev];
							newSelected.pop();
							return newSelected;
						});
					}
				}
				// This is not a default behaviour of the <input /> field
				if (e.key === 'Escape') {
					input.blur();
				}
			}
		},
		[]
	);

	const selectables = options.filter(option => !selected.includes(option));

	return (
		<Command
			onKeyDown={handleKeyDown}
			className='overflow-visible bg-transparent border border-none'>
			<div className='group border border-input px-3 py-2 text-sm  rounded-md focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-0'>
				<div className='flex gap-1 flex-wrap'>
					{selected.map(option => {
						return (
							<Badge key={option.value}>
								{option.label}
								<button
									disabled={disabled}
									className='ml-1 rounded-full outline-none '
									onKeyDown={e => {
										if (e.key === 'Enter') {
											handleUnselect(option);
										}
									}}
									onMouseDown={e => {
										e.preventDefault();
										e.stopPropagation();
									}}
									onClick={() => handleUnselect(option)}>
									<X className='h-3 w-3 text-white' />
								</button>
							</Badge>
						);
					})}
					{/* Avoid having the "Search" Icon */}
					<CommandPrimitive.Input
						ref={inputRef}
						value={inputValue}
						onValueChange={setInputValue}
						onBlur={() => setOpen(false)}
						onFocus={() => setOpen(true)}
						placeholder={placeholder}
						disabled={disabled}
						className='ml-2 bg-transparent outline-none right-0 placeholder:text-muted-foreground flex-1 border-none'
					/>
				</div>
			</div>
			<div className='relative mt-2'>
				{open && selectables.length > 0 ? (
					<div className='absolute w-full z-10 top-0 rounded-md border  text-popover-foreground shadow-md outline-none animate-in'>
						<CommandGroup className='h-full overflow-auto bg-popover'>
							{selectables.map(option => {
								return (
									<CommandItem
										key={option.value}
										onMouseDown={e => {
											e.preventDefault();
											e.stopPropagation();
										}}
										onSelect={value => {
											setInputValue('');
											setSelected(prev => [...prev, option]);
										}}
										className={'cursor-pointer'}>
										{option.label}
									</CommandItem>
								);
							})}
						</CommandGroup>
					</div>
				) : null}
			</div>
		</Command>
	);
}
