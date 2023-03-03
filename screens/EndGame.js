import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { View, Text, StyleSheet } from "react-native";
import GameSelectButton from "../components/GameSelectButton";

const EndGame = () => {
	const navigation = useNavigation();

	const expressions = useSelector((state) => state.settings.expressions);
	const correct = expressions.filter((item) => item.choice === true);
	const incorrect = expressions.filter((item) => item.choice === false);

	const returnHandler = () => {
		navigation.navigate("HomeScreen");
	};

	return (
		<View style={styles.container}>
			<Text>End-Game Screen</Text>
			<GameSelectButton
				onPress={returnHandler}
				outerStyle={styles.buttonContainer}
				innerStyle={styles.buttonInnerContainer}
				textStyle={styles.buttonText}
			>
				Main Menu
			</GameSelectButton>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		margin: 15,
		flex: 1,
	},

	buttonContainer: {
		marginVertical: 15,
		marginHorizontal: "3%",
		flex: 1,
		justifyContent: "flex-end",
	},

	buttonInnerContainer: {
		backgroundColor: "#cccccc",
		borderRadius: "8%",
		shadowColor: "black",
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 1,
		shadowOpacity: 0.5,
	},

	buttonText: {
		padding: 10,
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center",
	},
});

export default EndGame;
