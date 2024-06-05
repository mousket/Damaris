// Inside MyComponent:
import React, {useEffect} from "react";
import { View, Animated, Image } from 'react-native';

const bipAnim = new Animated.Value(0);

const expandLogo: React.FC = () => {
    useEffect(() => {
        Animated.timing(bipAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false,
        }).start();
    }, [bipAnim]);

    const interpolatedBip = bipAnim.interpolate({
        inputRange: [0, 0.75, 1],
        outputRange: [200, 250, 200],
    });

    return (
        <View>
            <Animated.Image
                source={require('./assets/interaction.png')}
                style={{
                    height: interpolatedBip,
                    width: interpolatedBip,
                    // Other styles...
                }}
            />
        </View>
    );
}
export default expandLogo;