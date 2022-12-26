import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./screens/Home";
import Settings from "./screens/Settings";
import InGame from "./screens/InGame";
import EndGame from "./screens/EndGame";

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="HomeScreen">
				<Stack.Screen name="SettingsScreen" component={Settings} />
				<Stack.Screen name="HomeScreen" component={Home} />
				<Stack.Screen name="InGameScreen" component={InGame} />
				<Stack.Screen name="EndGameScreen" component={EndGame} />
			</Stack.Navigator>
			<StatusBar style="auto" />
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
