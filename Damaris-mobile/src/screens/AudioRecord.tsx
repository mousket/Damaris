import { Audio } from "expo-av";
import { Recording } from "expo-av/build/Audio";
import { Button, StyleSheet, View } from "react-native";
import { useState } from "react";
import * as FileSystem from "expo-file-system";
import transcribeAudioFromMicrophone from "../Components/Speech/audioToText";
import convertTextToSpeech from "../Components/Speech/textToAudio";
import analyzeUserInputForDamarisIntent from "../Components/Intent/userIntent";

const AudioRecord = () => {
	const [recording, setRecording] = useState<Recording>();
	const [permissionResponse, requestPermission] = Audio.usePermissions();

	const startRecording = async () => {
		try {
			// if (permissionResponse?.status !== "granted") {
			// 	console.log("Requesting permission..");
			// 	await requestPermission();
			// }
			// await Audio.setAudioModeAsync({
			// 	allowsRecordingIOS: true,
			// 	playsInSilentModeIOS: true,
			// });

			// console.log("Starting recording..");
			// const { recording } = await Audio.Recording.createAsync(
			// 	Audio.RecordingOptionsPresets.HIGH_QUALITY
			// );
			// setRecording(recording);
			// console.log("Recording started");

			//This is what we will use to capture user's audio stream and transcribe it into text for analysis
			const transcription = await transcribeAudioFromMicrophone();

			//This is what we will use to Give a voice to the system when it talks to the user
			convertTextToSpeech(transcription);

			//Analyzing text for intent: Shipping Itent, Tracking Intent, Shippint Info Intent etc
			await analyzeUserInputForDamarisIntent(transcription);
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
		const playbackObject = new Audio.Sound();
		await playbackObject.loadAsync({
			uri: FileSystem.documentDirectory + "recordings/" + `${fileName}`,
		});
		await playbackObject.playAsync();

		console.log("Recording stopped and stored at", uri);
	};

	return (
		<View style={styles.container}>
			<Button
				title={recording ? "Stop Recording" : "Start Recording"}
				onPress={recording ? stopRecording : startRecording}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		backgroundColor: "#ecf0f1",
		padding: 10,
	},
});

export default AudioRecord;
