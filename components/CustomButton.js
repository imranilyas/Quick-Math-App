import {
	Pressable,
	View,
	Text,
	StyleSheet,
	useWindowDimensions,
} from "react-native";

const CustomButton = ({ children, onPress, style, disable }) => {
	return (
		<View style={styles.container}>
			<Pressable
				onPress={onPress}
				style={({ pressed }) => pressed && styles.pressed}
				disabled={disable}
			>
				<View style={styles.innerContainer}>
					<Text style={[styles.text, style]}>{children}</Text>
				</View>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginVertical: 15,
		alignSelf: "center",
		width: "80%",
	},

	pressed: {
		opacity: 0.5,
	},

	innerContainer: {
		backgroundColor: "#cccccc",
	},

	text: {
		padding: 10,
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center",
		borderWidth: 2,
	},
});

export default CustomButton;
