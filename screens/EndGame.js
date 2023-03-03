import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { View, Text, StyleSheet } from "react-native";
import GameSelectButton from "../components/GameSelectButton";

const EndGame = () => {
	const navigation = useNavigation();
	const expressions = useSelector((state) => state.settings.expressions);
	console.log(expressions);
	const returnHandler = () => {
		navigation.navigate("HomeScreen");
	};

	return (
		<View>
			<Text>End-Game Screen</Text>
			<GameSelectButton onPress={returnHandler}>
				Main Menu
			</GameSelectButton>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {},
});

export default EndGame;
