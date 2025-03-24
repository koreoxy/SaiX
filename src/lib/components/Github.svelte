<script lang="ts">
	import { onMount } from 'svelte';
	import { PUBLIC_GITHUB_USERNAME } from '$env/static/public';

	type ContributionDay = {
		date: string;
		contributionCount: number;
	};

	let selectedDay: ContributionDay | null = null;

	function handleMouseEnter(day: ContributionDay) {
		selectedDay = day;
	}

	function handleMouseLeave() {
		selectedDay = null;
	}

	let contributions: ContributionDay[] = [];
	let weeks: ContributionDay[][] = [];
	let months: { name: string; position: number }[] = [];
	let totalContributions = 0;
	let loading = true;

	const fetchGitHubContributions = async () => {
		loading = true;
		const username = PUBLIC_GITHUB_USERNAME;
		const token = import.meta.env.VITE_GITHUB_TOKEN;
		const today = new Date();
		const year = today.getFullYear();
		const startDate = new Date(year, 0, 1);
		const endDate = new Date(year, 11, 31);

		const query = `{
			user(login: "${username}") {
				contributionsCollection(from: "${startDate.toISOString()}", to: "${endDate.toISOString()}") {
					contributionCalendar {
						weeks {
							contributionDays {
								date
								contributionCount
							}
						}
					}
				}
			}
		}`;

		try {
			const response = await fetch('https://api.github.com/graphql', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: token ? `Bearer ${token}` : ''
				},
				body: JSON.stringify({ query })
			});

			if (!response.ok) throw new Error('Failed to fetch GitHub contributions');

			const data = await response.json();
			if (data?.data?.user?.contributionsCollection?.contributionCalendar?.weeks) {
				let allWeeks = data.data.user.contributionsCollection.contributionCalendar.weeks.map(
					(week: { contributionDays: ContributionDay[] }) => week.contributionDays
				);

				let allDays = allWeeks.flat();

				contributions = allDays.filter((day: ContributionDay) => {
					const dateObj = new Date(day.date);
					return dateObj.getFullYear() === year;
				});

				totalContributions = contributions.reduce((sum, day) => sum + day.contributionCount, 0);

				const fullYearGrid: Record<string, ContributionDay> = {};
				for (let month = 0; month < 12; month++) {
					for (let day = 1; day <= 31; day++) {
						const date = new Date(year, month, day);
						if (date.getMonth() !== month) break;
						fullYearGrid[date.toISOString().split('T')[0]] = {
							date: date.toISOString(),
							contributionCount: 0
						};
					}
				}

				contributions.forEach((day) => {
					fullYearGrid[day.date] = day;
				});

				weeks = Object.values(fullYearGrid).reduce((acc, day, i) => {
					const weekIndex = Math.floor(i / 7);
					if (!acc[weekIndex]) acc[weekIndex] = [];
					acc[weekIndex].push(day);
					return acc;
				}, [] as ContributionDay[][]);

				const monthPositions = new Map<string, number>();

				weeks.forEach((week, weekIndex) => {
					week.forEach((day) => {
						const dateObj = new Date(day.date);
						const month = dateObj.toLocaleString('en-US', { month: 'short' });

						if (!monthPositions.has(month)) {
							monthPositions.set(month, weekIndex);
						}
					});
				});

				months = Array.from(monthPositions)
					.map(([name, position]) => ({ name, position }))
					.sort(
						(a, b) =>
							new Date(`${a.name} 1, ${year}`).getTime() -
							new Date(`${b.name} 1, ${year}`).getTime()
					);
			}
		} catch (error) {
			console.error('Error fetching contributions:', error);
		}

		loading = false;
	};

	onMount(fetchGitHubContributions);

	function getColor(count: number): string {
		if (count === 0) return '#161b22';
		if (count > 0 && count < 5) return '#0e4429';
		if (count >= 5 && count < 10) return '#006d32';
		if (count >= 10 && count < 20) return '#26a641';
		return '#39d353';
	}
</script>

{#if loading}
	<div class="loading mt-8 w-full items-center justify-center text-center">
		Fetching contributions...
	</div>
{:else}
	<section class="contributions mt-8 rounded-md border border-zinc-700 backdrop-blur-xs">
		<h1 class="p-2 text-center text-sm text-[#1bf9ab]">
			Contribute to Github this year <strong>{totalContributions}</strong>
		</h1>

		<div class="grid-container">
			<div class="months">
				{#each months as { name, position }}
					<span class="month-label" style="grid-column-start: {position + 1};">{name}</span>
				{/each}
			</div>

			<div class="grid-wrapper">
				<div class="grid">
					{#each weeks as week}
						<div class="week">
							{#each week as day}
								<button
									class="grid-item"
									title={`Date: ${day.date}, Contributions: ${day.contributionCount}`}
									style="background-color: {getColor(day.contributionCount)}"
									aria-label="button"
									on:mouseenter={() => handleMouseEnter(day)}
									on:mouseleave={handleMouseLeave}
								></button>
							{/each}
						</div>
					{/each}
				</div>
			</div>
		</div>

		<span class="flex flex-row justify-end p-2 text-sm text-[#1bf9ab]">
			{#if selectedDay}
				{selectedDay.contributionCount} contributions on
				{new Date(selectedDay.date).toLocaleString('en-US', {
					month: 'short',
					day: 'numeric',
					year: 'numeric'
				})}
			{:else}
				<span>Hover over a contribution to see details</span>
			{/if}
		</span>
	</section>
{/if}

<style>
	.contributions {
		color: #ffffff;
		padding: 5px;
		width: 100%;
	}

	.loading {
		font-size: 16px;
		color: #bbb;
		animation: blink 1.5s infinite;
	}

	@keyframes blink {
		0% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
		100% {
			opacity: 1;
		}
	}

	.grid-container {
		overflow-x: auto;
		padding-bottom: 10px;
		scrollbar-width: thin;
		scrollbar-color: #373737 #1a1919;
		-webkit-overflow-scrolling: touch;
	}

	.grid-container::-webkit-scrollbar {
		height: 8px;
	}
	.grid-container::-webkit-scrollbar-track {
		background: #333;
	}
	.grid-container::-webkit-scrollbar-thumb {
		background: #888;
		border-radius: 100px;
	}
	.grid-container::-webkit-scrollbar-thumb:hover {
		background: #555;
	}

	@media (max-width: 768px) {
		.grid-container {
			overflow-x: hidden;
		}
	}

	.months {
		display: grid;
		grid-template-columns: repeat(60, minmax(13px, 15px));
		gap: 2px;
		font-size: 12px;
		color: #aaa;
	}

	.grid-wrapper {
		display: flex;
	}

	.grid {
		display: flex;
		gap: 2px;
	}

	.week {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.grid-item {
		width: 12px;
		height: 12px;
		border-radius: 2px;
		cursor: pointer;
		transition: transform 0.2s ease-in-out;
	}

	.grid-item:hover {
		transform: scale(1.2);
	}
</style>
