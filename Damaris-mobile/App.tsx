import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AudioRecord from "./src/screens/AudioRecord";

export type RootStackNav = {
	AudioRecord: undefined;
};

const Stack = createNativeStackNavigator<RootStackNav>();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name="AudioRecord"
					component={AudioRecord}
					options={{ title: "Audio record", headerTitleAlign: "center" }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
