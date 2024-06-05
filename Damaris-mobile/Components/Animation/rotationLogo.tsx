import React, { useEffect } from 'react';
import { View, Animated, Image } from 'react-native';

const rotationLogo: React.FC = () => {
    const rotateAnim = new Animated.Value(0);

    useEffect(() => {
        Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start();
    }, [rotateAnim]);

    const interpolatedRotate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View>
            <Animated.Image
                source={require('./img/interaction.png')}
                style={{
                    transform: [{ rotate: interpolatedRotate }],
                    // Other styles...
                }}
            />
        </View>
    );
};

export default rotationLogo;
