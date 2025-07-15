import IconBrowse from '~icons/tabler/world-www';
import IconPhone from '~icons/majesticons/iphone-x-apps-line';
import IconGithub from '~icons/mdi/github';
import IconInstagram from '~icons/mdi/instagram';
import IconYoutube from '~icons/mdi/youtube';
import IconWakatime from '~icons/simple-icons/wakatime';
import IconLinkin from '~icons/mdi/linkedin';

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

export type Social = {
	id: number;
	name: string;
	link: string;
	icon?: typeof IconBrowse;
};

const projects: Project[] = [
	{
		id: 1,
		title: 'Totorobit',
		description:
			'A simple and intuitive habit tracking app built with React Native and Expo. Track your daily habits and maintain streaks to build lasting positive behaviors.',
		subTitle: 'Mobile App',
		icon: IconPhone,
		link: 'https://github.com/Koreoxy1SH/totorobit',
		status: 'Recent',
		tech: [{ name: 'React Native' }, { name: 'Expo' }]
	},
	{
		id: 2,
		title: 'SaiX',
		description:
			'My 3D portfolio website is built using Svelte, Gsap and Three.js. You can check the code on my GitHub.',
		subTitle: 'Website',
		icon: IconBrowse,
		link: 'https://github.com/koreoxy/SaiX',
		tech: [{ name: 'Svelte' }, { name: 'TailwindCSS' }, { name: 'Three.js' }, { name: 'gsap' }]
	},
	{
		id: 3,
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

const socials: Social[] = [
	{
		id: 1,
		name: 'Github',
		link: 'https://github.com/koreoxy',
		icon: IconGithub
	},
	{
		id: 2,
		name: 'Instagram',
		link: 'https://www.instagram.com/ifulufi',
		icon: IconInstagram
	},
	{
		id: 3,
		name: 'Youtube',
		link: 'https://www.youtube.com/@1sh1sh',
		icon: IconYoutube
	},
	{
		id: 4,
		name: 'Wakatime',
		link: 'https://wakatime.com/@koreoxy',
		icon: IconWakatime
	},
	{
		id: 5,
		name: 'Linkedin',
		link: 'https://www.linkedin.com/in/saifullah-iful/',
		icon: IconLinkin
	}
];

export { projects, socials };
