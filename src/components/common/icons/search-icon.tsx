export default function SearchIcon({
	size = 24,
	strokeWidth = 1.5,
	width = 18,
	height = 18,
	...props
}) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			fill='none'
			viewBox='0 0 24 24'
			strokeWidth={strokeWidth}
			stroke='currentColor'
			className='size-6'
			focusable='false'
			height={height || size}
			role='presentation'
			width={width || size}
			{...props}
		>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				d='m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
			/>
		</svg>
	);
}
