import { Pressable, View, Text, StyleSheet } from "react-native";

const CustomButton = ({ children, onPress }) => {
	return (
		<View>
			<Pressable onPress={onPress}>
				<View>
					<Text>{children}</Text>
				</View>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {},
});

export default CustomButton;
