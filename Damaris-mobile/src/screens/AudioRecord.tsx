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
import Animated from "react-native-reanimated";
import getAnswersFromQNA from "../Components/QnA/qna";
import {getSentimentScore} from "../Components/Sentiment/textSentimentAnalysis";
import {askOpenAI, chatWithOpenAI} from "../Components/AzureOpenAI/openAI";


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

			 //Analyzing text for intent: Shipping Itent, Tracking Intent, Shipping Info Intent etc
			//await analyzeUserInputForDamarisIntent(firstContact);

			const sentiment = await getSentimentScore("I'm feeling pretty sad today. But I have ot keep on fighting. I don't have a choice. I must win this competition");
			console.log(sentiment);

			const query = await transcribeAudioFromMicrophone();

			const openAIAnswer = await askOpenAI(query);

			//console.log(openAIAnswer);

			//await chatWithOpenAI();
			//const answer = getAnswersFromQNA();

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
