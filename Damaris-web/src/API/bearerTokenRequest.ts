async function fetchPitneyBowesBearerToken(): Promise<void> {
	try {
		//API INFO
		const pitneyBowesApiToken =
			import.meta.env.VITE_PITNEY_BOWES_TOKEN_API || "auth/api/v1/token";
		const pitneyBowesApiBase =
			import.meta.env.VITE_PITNEY_BOWES_BASE_URL || "auth/api/v1/token";

		//Create Dev Credentials
		const devID = "0oa23mqyqphkRmG330h8";
		const devKey =
			"AkPYtcI6ehbrZabc-ILFUip2sPkpf6e2o_jUXm8NuVw7hCtbUuArYNT-hV_5HufZ";
		const devCredentials = `${devID}:${devKey}`;

		const apiUrl = pitneyBowesApiBase + pitneyBowesApiToken;
		const resp = await fetch(apiUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				//Authorization: 'Basic ' + Buffer.from('0oa23mqyqphkRmG330h8:AkPYtcI6ehbrZabc-ILFUip2sPkpf6e2o_jUXm8NuVw7hCtbUuArYNT-hV_5HufZ').toString('base64'),
				Authorization:
					"Basic " + Buffer.from(devCredentials).toString("base64"),
			},
		});

		if (resp.ok) {
			const data = await resp.json();
			console.log(data); // Handle the retrieved token data as needed
		} else {
			console.error(
				"Error fetching Pitney Bowes bearer token:",
				resp.status,
				resp.statusText
			);
		}
	} catch (error) {
		console.error("An error occurred while fetching the token:", error);
	}
}

export default fetchPitneyBowesBearerToken;
