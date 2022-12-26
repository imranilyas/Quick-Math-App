import { Pressable, View, Text, StyleSheet } from "react-native";

const CustomButton = () => {
	return (
		<View>
			<Pressable>
				<View>
					<Text>Button</Text>
				</View>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {},
});

export default CustomButton;
