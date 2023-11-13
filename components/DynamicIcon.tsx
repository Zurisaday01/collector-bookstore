import dynamic from 'next/dynamic';
import { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import { memo } from 'react';

interface IconProps extends LucideProps {
	name: keyof typeof dynamicIconImports;
}

const _Icon = ({ name, ...props }: IconProps) => {
	const LucideIcon = dynamic(dynamicIconImports[name]);

	return <LucideIcon {...props} />;
};

// Fix for unnecesary re-renders
const DynamicIcon = memo(_Icon);

export default DynamicIcon;
