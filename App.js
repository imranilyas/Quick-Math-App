import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./screens/Home";
import Settings from "./screens/Settings";
import InGame from "./screens/InGame";
import EndGame from "./screens/EndGame";

import { store } from "./redux/store";
import { Provider } from "react-redux";

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<>
			<StatusBar style="auto" />
			<Provider store={store}>
				<NavigationContainer>
					<Stack.Navigator initialRouteName="HomeScreen">
						<Stack.Screen
							name="SettingsScreen"
							component={Settings}
							options={{
								animation: "slide_from_bottom",
								presentation: "modal",
								title: "Settings",
							}}
						/>
						<Stack.Screen
							name="HomeScreen"
							component={Home}
							options={
								{
									// headerShown: false,
								}
							}
						/>
						<Stack.Screen name="InGameScreen" component={InGame} />
						<Stack.Screen
							name="EndGameScreen"
							component={EndGame}
							options={{
								// headerShown: false,
								headerBackVisible: false,
							}}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</Provider>
		</>
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
