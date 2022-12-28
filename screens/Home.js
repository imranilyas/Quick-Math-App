import { View, Text, StyleSheet } from "react-native";
import CustomButton from "../components/CustomButton";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

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

			<CustomButton onPress={gameHandler.bind(this, "+")}>
				Addition +
			</CustomButton>
			<CustomButton onPress={gameHandler.bind(this, "-")}>
				Subtraction +
			</CustomButton>
			<CustomButton onPress={gameHandler.bind(this, "*")}>
				Multiplication +
			</CustomButton>
			<CustomButton onPress={gameHandler.bind(this, "/")}>
				Division +
			</CustomButton>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {},
});

export default Home;
