import { View, StyleSheet, FlatList, Pressable } from "react-native";
import GameSelectButton from "../components/GameSelectButton";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

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
			<View style={styles.btncontainer}>
				<Pressable
					onPress={settingsHandler}
					style={({ pressed }) => pressed && styles.pressed}
				>
					<View style={styles.innerContainer}>
						<Ionicons
							name="ios-settings"
							color="#9c9c9c"
							size={32}
						/>
					</View>
				</Pressable>
			</View>
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
	btncontainer: {
		marginHorizontal: 20,
		marginVertical: 5,
		alignSelf: "flex-end",
	},

	pressed: {
		opacity: 0.5,
	},

	innerContainer: {
		backgroundColor: "white",
		padding: 5,
		borderRadius: 1000000 / 2,
		borderColor: "#585858",
		borderWidth: 1.5,
	},

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
