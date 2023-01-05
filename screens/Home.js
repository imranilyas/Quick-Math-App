import { View, Text, StyleSheet, FlatList } from "react-native";
import CustomButton from "../components/CustomButton";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const choiceArr = [
	{ id: "Addition +", val: "+" },
	{ id: "Subtraction -", val: "-" },
	{ id: "Multiplication x", val: "*" },
	{ id: "Division /", val: "/" },
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
			<Text>Home Screen</Text>
			<CustomButton
				onPress={settingsHandler}
				style={{
					textAlign: "right",
					padding: 20,
				}}
			>
				<Ionicons name="ios-settings" color="#636363" size={32} />
			</CustomButton>

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
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {},
});

export default Home;
