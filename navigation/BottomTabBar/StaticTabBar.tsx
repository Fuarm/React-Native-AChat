import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React, { Fragment, useEffect, useState } from "react";
import { Animated, Dimensions, StyleSheet, TouchableWithoutFeedback, View } from "react-native";

interface StaticTabbarProps {
    tabBar: BottomTabBarProps;
    value: Animated.Value;
}


export const { width } = Dimensions.get("window");
export const height = 64;

export default function StaticTabBar(props: StaticTabbarProps) {
    const { tabBar: { state: {routes, index}, descriptors }, value } = props;

    const [values, setValues] = useState<Animated.Value[]>([]);
    const tabWidth = width / routes.length;

    useEffect(() => {
        setValues(() => routes.map((route, index) => 
        new Animated.Value(index === 0 ? 1 : 0)));
    }, [])

    const onPress = (index: number) => () => {
        Animated.sequence([
            Animated.parallel(
                values.map(v => Animated.timing(v, {
                    toValue: 0,
                    duration: 100,
                    useNativeDriver: true,
                })),
            ),
            Animated.parallel([
                Animated.spring(value, {
                    toValue: tabWidth * index,
                    useNativeDriver: true,
                }),
                Animated.spring(values[index], {
                    toValue: 1,
                    useNativeDriver: true,
                }),
            ]),
        ]).start();
    }

    return (
        <View style={styles.container}>
            {
                routes.map((route, routeIndex) => {
                    const { options: {
                        title,
                        tabBarLabel,
                        tabBarIcon
                    }} = descriptors[route.key];

                    const label = 
                        tabBarLabel !== undefined
                        ? tabBarLabel
                        : title !== undefined
                        ? title
                        : route.name;
                    
                    const focused = routeIndex == index;
                    // const color = focused ? activeTintColor : inactiveTintColor;
                    const color = "blue";
                    const size = 24;

                    const translateY = values[routeIndex]?.interpolate({
                        inputRange: [0, 1],
                        outputRange: [64, 0],
                        extrapolate: "clamp",
                    });
                    const cursor = tabWidth * routeIndex;
                    const opacity = values[routeIndex]?.interpolate({
                        inputRange: [0,1],
                        outputRange: [0,1],
                        extrapolate: "clamp",
                    });
                    return (
                        <Fragment key={route.key} >
                            <TouchableWithoutFeedback onPress={onPress(routeIndex)}>
                                <Animated.View style={styles.tabBarContainer}>
                                   {
                                       tabBarIcon?.({focused, color, size})
                                   }
                                </Animated.View>
                            </TouchableWithoutFeedback>
                            <Animated.View
                                style={[styles.activeIconContainer,{
                                    left: tabWidth * routeIndex,
                                    width: tabWidth,
                                    // zIndex: -1,
                                    ...{
                                        opacity,
                                        transform: translateY ? [{ translateY }]: undefined,
                                    }
                                }]}
                                >
                                <View style={styles.activeIcon}>
                                    {
                                        tabBarIcon?.({focused, color, size})
                                    }
                                </View>
                            </Animated.View>
                        </Fragment>
                    );
                })
            }
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
    },
    tabBarContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: height - 10,
    },
    activeIconContainer: {
        position: 'absolute',
        top: -8,
        justifyContent: "center",
        alignItems: "center",
    },
    activeIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'red',
        justifyContent: "center",
        alignItems: "center",
    }
});