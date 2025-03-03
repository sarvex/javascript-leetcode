const findItinerary = (tickets) => {
	const g = {};
	tickets.sort((a, b) => b[1].localeCompare(a[1]));
	for (const [f, t] of tickets) {
		g[f] = g[f] || [];
		g[f].push(t);
	}
	const ans = [];
	const dfs = (f) => {
		while (g[f] && g[f].length) {
			const t = g[f].pop();
			dfs(t);
		}
		ans.push(f);
	};
	dfs("JFK");
	return ans.reverse();
};
