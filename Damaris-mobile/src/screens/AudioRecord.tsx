import { Audio } from "expo-av";
import {
	AndroidAudioEncoder,
	AndroidOutputFormat,
	IOSAudioQuality,
	IOSOutputFormat,
	Recording,
} from "expo-av/build/Audio";
import {
	Button,
	StyleSheet,
	View,
	Text,
	ImageBackground,
	Pressable,
	Image,
} from "react-native";
import { useEffect, useState } from "react";
import * as FileSystem from "expo-file-system";
import transcribeAudioFromMicrophone from "../Components/Speech/audioToText";
import convertTextToSpeech from "../Components/Speech/textToAudio";
import analyzeUserInputForDamarisIntent from "../Components/Intent/userIntent";
import audioToTextFromFile from "../Components/Speech/audioToTextFromFile";
import {getSentimentScore} from "../Components/Sentiment/textSentimentAnalysis";
import {askOpenAI, openAICall} from "../Components/AzureOpenAI/openAI";
import customEntityExtraction from "../Components/CustomEntityExtraction/customeEntityExtraction";
import {getGeneralUserSentiment} from "../Components/Sentiment/sentiment";
import {getAnswersFromQNA} from "../Components/QnA/qna";


const AudioRecord = () => {
	const [recording, setRecording] = useState<Recording>();
	const [isRecording, setIsRecording] = useState(false);
	const [transcript, setTranscript] = useState("");
	const [permissionResponse, requestPermission] = Audio.usePermissions();

	const startRecording = async () => {
		try {
		/*	if (permissionResponse?.status !== "granted") {
				console.log("Requesting permission..");
				await requestPermission();
			}
			await Audio.setAudioModeAsync({
				allowsRecordingIOS: true,
				playsInSilentModeIOS: true,
			});

			console.log("Starting recording..");
			const { recording } = await Audio.Recording.createAsync({
				isMeteringEnabled: true,
				android: {
					extension: ".wav",
					outputFormat: AndroidOutputFormat.DEFAULT,
					audioEncoder: AndroidAudioEncoder.DEFAULT,
					sampleRate: 44100,
					numberOfChannels: 2,
					bitRate: 128000,
				},
				ios: {
					extension: ".wav",
					outputFormat: IOSOutputFormat.MPEG4AAC,
					audioQuality: IOSAudioQuality.MAX,
					sampleRate: 44100,
					numberOfChannels: 2,
					bitRate: 128000,
					linearPCMBitDepth: 16,
					linearPCMIsBigEndian: false,
					linearPCMIsFloat: false,
				},
				web: {
					mimeType: "audio/webm",
					bitsPerSecond: 128000,
				},
			});
			setRecording(recording);
			setIsRecording(true);
			console.log("Recording started");


		 */

			//This is what we will use to capture user's audio stream and transcribe it into text for analysis
			// const firstContact = await transcribeAudioFromMicrophone();

			 //Analyzing text for intent: Shipping Intent, Tracking Intent, Shipping Info Intent etc.
			//await analyzeUserInputForDamarisIntent(firstContact);
				let query = "Customer Service Rep (CSR): Good morning! Thank you for calling our shipping service. My name is Alex. How can I assist you today?\n" +
					"\n" +
					"Sally: Hi Alex! I’m Sally, a nurse at St. Mary’s Hospital. I need to ship an x-ray machine to a doctor in Arkansas. Can you help me with that?\n" +
					"\n" +
					"\n" +
					"Sally: Sure! The x-ray machine measures 36 inches in length, 24 inches in width, and 48 inches in height.\n" +
					"\n" +
					"\n" +
					"\n" +
					"Sally: It weighs approximately 150 pounds.\n" +
					"\n" +
					"CSR: Perfect. Now, let’s move on to the destination address. Could you provide the complete street address where the x-ray machine needs to be delivered?\n" +
					"\n" +
					"Sally: Certainly! The address is 123 Main Street, Little Rock, Arkansas.\n" +
					"\n" +
					"CSR: Thank you, Sally. And the zip code for Little Rock?\n" +
					"\n" +
					"Sally: The zip code is 72201.\n" +
					"\n" +
					"CSR: Got it. Next, let’s talk about the service level. How quickly would you like the shipment to arrive? We offer several options:\n" +
					"\n" +
					"Overnight\n" +
					"2-day\n" +
					"3-day\n" +
					"1-day\n" +
					"Ground\n" +
					"Express Saver (which you mentioned earlier)\n" +
					"Sally: I need it as quickly as possible. Let’s go with Express Saver.\n" +
					"\n" +
					"CSR: Excellent choice! Finally, for communication purposes, could you share your email address and phone number?\n" +
					"\n" +
					"Sally: Certainly. My email is sally.nurse@example.com, and my phone number is (555) 123-4567.\n" +
					"\n" +
					"CSR: Thank you, Sally! I’ll calculate the rates based on this information and proceed with placing the shipment order. Is there anything else I can assist you with?\n" +
					"\n" +
					"Sally: No, that covers everything. Thank you, Alex!\n" +
					"\n" +
					"CSR: You’re welcome, Sally! Have a great day, and safe shipping!\n" +
					"\n" ;

				query = await transcribeAudioFromMicrophone();
				console.log("User Message: " + query);
			 	//let sentimentScore = await getSentimentScore(query);
				//let userTone = await getGeneralUserSentiment();
				//console.log("Sentiment Analysis user message:  " + userTone + ": " + sentimentScore);

			     //const entity = await customEntityExtraction(query);

				//const systemReply = await askOpenAI(query);
				//convertTextToSpeech(systemReply);

				const systemReply2 = await openAICall(query, true);
				convertTextToSpeech(systemReply2);


			//This is what we will use to Give a voice to the system when it talks to the user
			 //convertTextToSpeech(transcription);
		} catch (error) {
			console.error("Failed to start recording", error);
		}
	};

	const stopRecording = async () => {
		console.log("Stopping recording..");
		setRecording(undefined);
		await recording?.stopAndUnloadAsync();
		await Audio.setAudioModeAsync({
			allowsRecordingIOS: false,
		});
		const uri = recording!.getURI()!;

		const fileName = `recording-${Date.now()}.caf`;

		// Move the recording to the new directory with the new file name
		await FileSystem.makeDirectoryAsync(
			FileSystem.documentDirectory + "recordings/",
			{ intermediates: true }
		);
		await FileSystem.moveAsync({
			from: uri,
			to: FileSystem.documentDirectory + "recordings/" + `${fileName}`,
		});

		// This is for simply playing the sound back
		// const playbackObject = new Audio.Sound();
		// await playbackObject.loadAsync({
		// 	uri: FileSystem.documentDirectory + "recordings/" + `${fileName}`,
		// });
		// await playbackObject.playAsync();

		try {
			const audio = (await FileSystem.readAsStringAsync(
				FileSystem.documentDirectory + "recordings/" + `${fileName}`
			)) as unknown as Buffer;
			const transcription = await audioToTextFromFile(audio);

			setTranscript(transcription);
		} catch (error) {
			console.log(
				"Failed to transcript the text because of the error: ",
				error
			);
		} finally {
			setIsRecording(false);
			console.log("Recording stopped and stored at", uri);
		}
	};

	useEffect(() => {}, [isRecording]);

	return (
		<ImageBackground
			source={require("../../assets/BackgroundImage-2.jpg")}
			style={styles.background}
		>
			<View style={styles.container}>
				<Pressable
					style={styles.pressable}
					onPress={recording ? stopRecording : startRecording}
				>
					<Image
						source={require("../../assets/interaction.png")}
						style={styles.image}
					/>
				</Pressable>
				<Text>{transcript}</Text>
			</View>
		</ImageBackground>
	);
};

// @ts-ignore
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
	},
	pressable: {
		flex: 1,
		height: 75,
		justifyContent: "center",
	},
	background: {
		flex: 1,
		justifyContent: "center",
		resizeMode: "cover",
		width: "100%",
		height: "100%",
		opacity: 1
	},
	image: {
		flex: 0,
		height: 175,
		width: 175,
		margin: "auto",
	},
});

export default AudioRecord;
