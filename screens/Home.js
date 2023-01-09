import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import CustomButton from "../components/CustomButton";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

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
		<View>
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

			{/* Custom Title */}
			<Text>Home Screen</Text>

			<FlatList
				data={choiceArr}
				renderItem={(choice) => {
					return (
						<CustomButton
							onPress={() => gameHandler(choice.item.val)}
							key={choice.item.val}
						>
							{choice.item.id}
						</CustomButton>
					);
				}}
				alwaysBounceVertical={false}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	btncontainer: {
		margin: 20,
		alignSelf: "flex-end",
	},

	pressed: {
		opacity: 0.5,
	},

	innerContainer: {
		backgroundColor: "white",
		padding: 5,
		borderRadius: 1000000 / 2,
		borderColor: "black",
		borderWidth: 1,
	},
});

export default Home;
