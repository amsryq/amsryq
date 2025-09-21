const glob = new Bun.Glob('sponsorkit/*.{svg,png}');

const repo = process.env.GITHUB_REPO;
if (!repo) {
    console.error('GITHUB_REPO env is not set');
    process.exit(1);
}

for await (const file of glob.scan()) {
    const url = `https://purge.jsdelivr.net/gh/${repo}/sponsorkit/${file}`;
    const res = await fetch(url).then(r => r.json()) as { status: string };

    if (res.status !== 'finished') {
        console.error(`Failed to purge: ${file} - ${JSON.stringify(res)}`);
    } else {
        console.log(`Purged: ${file}`);
    }
}