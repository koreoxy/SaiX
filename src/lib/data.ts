import IconBrowse from '~icons/tabler/world-www';
import IconPhone from '~icons/majesticons/iphone-x-apps-line';

export type Project = {
	id: number;
	title: string;
	description: string;
	subTitle: string;
	link: string;
	status?: string;
	tech: { name: string }[];
	icon?: typeof IconBrowse;
};

const projects: Project[] = [
	{
		id: 1,
		title: 'SaiX',
		description:
			'My 3D portfolio website is built using Svelte, Gsap and Three.js. You can check the code on my GitHub.',
		subTitle: 'Website',
		icon: IconBrowse,
		link: 'https://github.com/koreoxy/SaiX',
		status: 'Recent',
		tech: [{ name: 'Svelte' }, { name: 'TailwindCSS' }, { name: 'Three.js' }, { name: 'gsap' }]
	},
	{
		id: 2,
		title: 'NutrixSense',
		description:
			'The NutrixSense application is a web-based application that aims to calculate daily calories and nutrition in Indonesia using object detection from the YOLOv8 model. This application also allows users to calculate food calories and nutrients manually.',
		subTitle: 'Website',
		icon: IconBrowse,
		link: 'https://nutrixsense.xyz',
		tech: [
			{ name: 'Next.js' },
			{ name: 'TailwindCSS' },
			{ name: 'YOLOv8' },
			{ name: 'Typescript' },
			{ name: 'Prisma' },
			{ name: 'Supabase' }
		]
	},
	{
		id: 3,
		title: 'Tootoro',
		description:
			'Tootoro is a simple habit-tracking app built with React Native, Expo, Zustand, and react-native-mmkv for local storage to save user data on the device.',
		subTitle: 'Mobile App',
		icon: IconPhone,
		link: 'https://github.com/koreoxy/tootoro',
		tech: [
			{ name: 'React Native' },
			{ name: 'Expo' },
			{ name: 'Zustand' },
			{ name: 'react-native-mmkv' }
		]
	},
	{
		id: 4,
		title: 'Sihati Siswa',
		description:
			'Sihati Siswa is an online counseling platform for middle school students to share school related struggles and seek support in a safe space.',
		subTitle: 'Website',
		icon: IconBrowse,
		link: 'https://sihati-siswa.vercel.app/',
		tech: [{ name: 'Next.js' }, { name: 'TailwindCSS' }, { name: 'Prisma' }, { name: 'Supabase' }]
	},
	{
		id: 5,
		title: 'Calendar Hijriah',
		description:
			'Calender-Hijriah is a web tool for converting the Gregorian calendar to the Hijri calendar, available in Arabic and Acehnese languages.',
		subTitle: 'Website',
		icon: IconBrowse,
		link: 'https://calender-hijriah.netlify.app',
		tech: [{ name: 'React' }, { name: 'TailwindCSS' }]
	}
];

export default projects;
