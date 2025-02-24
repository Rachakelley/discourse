import { FaceSmileIcon } from '@heroicons/react/24/outline';
import { Avatar } from '@heroui/react';

interface UserAvatarProps {
	src?: string;
	alt: string;
	size: 'sm' | 'md' | 'lg';
	className?: string;
	fallback?: React.ReactNode;
}

export default function UserAvatar({
	src,
	alt,
	size,
	className,
	fallback,
}: UserAvatarProps) {
	return (
		<Avatar
			src={src}
			alt={alt}
			size={size}
			className={`${className} flex-shrink-0`}
			fallback={
				fallback ? (
					fallback
				) : (
					<FaceSmileIcon
						className='size-8 flex-shrink-0'
						width={32}
						height={32}
					/>
				)
			}
		/>
	);
}
