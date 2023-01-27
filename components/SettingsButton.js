import { View, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SettingsButton = ({ onPress }) => {
	return (
		<View style={styles.btncontainer}>
			<Pressable
				onPress={onPress}
				style={({ pressed }) => pressed && styles.pressed}
			>
				<View style={styles.innerContainer}>
					<Ionicons name="ios-settings" color="#9c9c9c" size={32} />
				</View>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	btncontainer: {
		marginHorizontal: 20,
		marginVertical: 5,
		alignSelf: "flex-end",
	},

	innerContainer: {
		backgroundColor: "white",
		padding: 5,
		borderRadius: 1000000 / 2,
		borderColor: "#585858",
		borderWidth: 1.5,
	},

	pressed: {
		opacity: 0.5,
	},
});

export default SettingsButton;
