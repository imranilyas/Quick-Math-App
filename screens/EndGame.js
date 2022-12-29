import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";
import CustomButton from "../components/CustomButton";

const EndGame = () => {
	const navigation = useNavigation();
	const returnHandler = () => {
		navigation.navigate("HomeScreen");
	};

	return (
		<View>
			<Text>End-Game Screen</Text>
			<CustomButton onPress={returnHandler}>Main Menu</CustomButton>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {},
});

export default EndGame;
