import { View, Text, StyleSheet } from "react-native";
import CustomButton from "../components/CustomButton";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
	const navigation = useNavigation();
	const settingsHandler = () => {
		navigation.navigate("SettingsScreen");
	};

	return (
		<View>
			<Text>Home Screen</Text>
			<CustomButton onPress={settingsHandler}>
				<Ionicons name="ios-settings" color="#636363" size={24} />
			</CustomButton>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {},
});

export default Home;
