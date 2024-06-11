

async function fetchPitneyBowesBearerToken(): Promise<string> {
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
			mode: "cors"
		});

		if (resp.ok) {
			const data = await resp.json();
			return data;
		} else {
			console.error(
				"Error fetching Pitney Bowes bearer token:",
				resp.status,
				resp.statusText

			);
			return "eyJraWQiOiJaS3dDcjJKUjN6a2UxVnZkd3lCSVJILVUzNTB6MnlURVAxa0dCUTZnQkVnIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULlRRcXh2VFRvVFdpT2hsN0poOGtsTzNvOG9kWlE3QXNFQWFKZVk2MEdmb3ciLCJpc3MiOiJodHRwczovL3BpdG5leWJvd2VzLm9rdGFwcmV2aWV3LmNvbS9vYXV0aDIvYXVzMWxzNXpmZWJrOXZ6bWUwaDgiLCJhdWQiOiJodHRwczovL2FwaS5waXRuZXlib3dlcy5jb20iLCJzdWIiOiJBUEktU1AzNjAtZVhSNE1qa1EyWUotUFBEIiwiaWF0IjoxNzE4MDU1NDQxLCJleHAiOjE3MTgwNjk4NDEsImNpZCI6IjBvYTIzbXF5cXBoa1JtRzMzMGg4Iiwic2NwIjpbInBzYXBpIl0sInN2Y1ZlciI6IjMuMCIsImNsYWltX3BzYXBpIjp7ImVudElEIjoiU3VtbWl0IiwidWlkIjoiMG9hMjNtcXlxcGhrUm1HMzMwaDgiLCJzdWJJRCI6InN1bW1pdF9wcm9qZWN0IiwiY250cnkiOiJVUyIsInBsYW5zIjpbIlNFTkRJTkdfU0hJUEFDQ0VMX0VOVEVSUFJJU0UiLCJTSElQQUNDRUxfRU5URVJQUklTRV9QTEFURk9STSIsIkNPTkZJR1VSQUJMRV9VSV9QTEFOIiwiUE9TVEFMX0FQUF9QTEFOX0VDT01NRVJDRSIsIkFOQUxZVElDUzM2MF9TSElQUElOR19QTEFOIiwiQU5BTFlUSUNTMzYwX0FEVkFEVklTT1JfUExBTiIsIkFQSV9NQU5BR0UiLCJBUElfQkFTSUMiLCJBUElfU0VORElOR19CQVNJQyJdfX0.43pN50Di4I-nIKJKnYTc2IaIFwbKSKPmNCMJ_wJWkm91q5MRG-bzFQysoMG-LRueNT1J51x70mi0CiB4zhgdWvUDoXKEwRHZfMTXA9FyMcTZ0hFxf1nDVyF7aLov_75y9UwShwyVR7qSEckE6boEGIPejRiF0h3OeUzOhF4Hy1UjLPHgGzi4apA0xA6K-Jhk7B5cfbLJp0DOBs_5GH7XGnyKM4v34OUT3U5RXYyrXi7opyzP7gNryCBU0gEgVRvUNRz2ZgNDAzRDWaYqowinkrJ8NgEKv4_UKvzzffgEthBqNcbrTVeVHTMMcSdNDgtoOKLxCd3YdGdAdP18ftJYAw";
;
		}
	} catch (error) {
		return "eyJraWQiOiJaS3dDcjJKUjN6a2UxVnZkd3lCSVJILVUzNTB6MnlURVAxa0dCUTZnQkVnIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULlRRcXh2VFRvVFdpT2hsN0poOGtsTzNvOG9kWlE3QXNFQWFKZVk2MEdmb3ciLCJpc3MiOiJodHRwczovL3BpdG5leWJvd2VzLm9rdGFwcmV2aWV3LmNvbS9vYXV0aDIvYXVzMWxzNXpmZWJrOXZ6bWUwaDgiLCJhdWQiOiJodHRwczovL2FwaS5waXRuZXlib3dlcy5jb20iLCJzdWIiOiJBUEktU1AzNjAtZVhSNE1qa1EyWUotUFBEIiwiaWF0IjoxNzE4MDU1NDQxLCJleHAiOjE3MTgwNjk4NDEsImNpZCI6IjBvYTIzbXF5cXBoa1JtRzMzMGg4Iiwic2NwIjpbInBzYXBpIl0sInN2Y1ZlciI6IjMuMCIsImNsYWltX3BzYXBpIjp7ImVudElEIjoiU3VtbWl0IiwidWlkIjoiMG9hMjNtcXlxcGhrUm1HMzMwaDgiLCJzdWJJRCI6InN1bW1pdF9wcm9qZWN0IiwiY250cnkiOiJVUyIsInBsYW5zIjpbIlNFTkRJTkdfU0hJUEFDQ0VMX0VOVEVSUFJJU0UiLCJTSElQQUNDRUxfRU5URVJQUklTRV9QTEFURk9STSIsIkNPTkZJR1VSQUJMRV9VSV9QTEFOIiwiUE9TVEFMX0FQUF9QTEFOX0VDT01NRVJDRSIsIkFOQUxZVElDUzM2MF9TSElQUElOR19QTEFOIiwiQU5BTFlUSUNTMzYwX0FEVkFEVklTT1JfUExBTiIsIkFQSV9NQU5BR0UiLCJBUElfQkFTSUMiLCJBUElfU0VORElOR19CQVNJQyJdfX0.43pN50Di4I-nIKJKnYTc2IaIFwbKSKPmNCMJ_wJWkm91q5MRG-bzFQysoMG-LRueNT1J51x70mi0CiB4zhgdWvUDoXKEwRHZfMTXA9FyMcTZ0hFxf1nDVyF7aLov_75y9UwShwyVR7qSEckE6boEGIPejRiF0h3OeUzOhF4Hy1UjLPHgGzi4apA0xA6K-Jhk7B5cfbLJp0DOBs_5GH7XGnyKM4v34OUT3U5RXYyrXi7opyzP7gNryCBU0gEgVRvUNRz2ZgNDAzRDWaYqowinkrJ8NgEKv4_UKvzzffgEthBqNcbrTVeVHTMMcSdNDgtoOKLxCd3YdGdAdP18ftJYAw";

	}
}

export default fetchPitneyBowesBearerToken;
