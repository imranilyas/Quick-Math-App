import { Pressable, View, Text, StyleSheet } from "react-native";

const CustomButton = ({ children, onPress, style, disable }) => {
	return (
		<View>
			<Pressable
				onPress={onPress}
				style={({ pressed }) => pressed && styles.pressed}
				disabled={disable}
			>
				<View>
					<Text style={style}>{children}</Text>
				</View>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

	pressed: {
		opacity: 0.5,
	},
});

export default CustomButton;
