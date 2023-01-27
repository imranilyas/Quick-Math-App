import { StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";

import SettingsButton from "../components/SettingsButton";
import GameSelectButton from "../components/GameSelectButton";

const choiceArr = [
	{ id: "Addition +", val: "+" },
	{ id: "Subtraction -", val: "-" },
	{ id: "Multiplication ×", val: "*" },
	{ id: "Division ÷", val: "/" },
];

const Home = () => {
	const navigation = useNavigation();

	const settingsHandler = () => {
		navigation.navigate("SettingsScreen");
	};

	const gameHandler = (val) => {
		navigation.navigate("InGameScreen", { gameType: val });
	};

	return (
		<SafeAreaView>
			<SettingsButton onPress={settingsHandler} />

			{/* {//! Custom Title} */}
			{/* <Text>Home Screen</Text> */}
			<FlatList
				data={choiceArr}
				renderItem={(choice) => {
					return (
						<GameSelectButton
							onPress={() => gameHandler(choice.item.val)}
							key={choice.item.val}
							outerStyle={styles.listContainer}
							innerStyle={styles.listInnerContainer}
							textStyle={styles.listText}
						>
							{choice.item.id}
						</GameSelectButton>
					);
				}}
				alwaysBounceVertical={false}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	// Flatlist styling
	listContainer: {
		marginVertical: 15,
		alignSelf: "center",
		width: "80%",
	},

	listInnerContainer: {
		backgroundColor: "#cccccc",
	},

	listText: {
		padding: 10,
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center",
		borderWidth: 2,
	},
});

export default Home;
