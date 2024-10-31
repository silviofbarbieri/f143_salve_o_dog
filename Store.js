export const ratio = 228 / 250;
export const MARGIN = 5;
const { width } = Dimensions.get("window");
export const CARD_WIDTH = width * 0.6;
export const CARD_HEIGHT = CARD_WIDTH * ratio;
export const HEIGHT = CARD_HEIGHT + MARGIN * 2;

const Store = ({item, x, index, updateRangePositions }) => {
    
    const contentInset = () => {
        const insetHorizontal = ( width - CARD_WIDTH) / 2
        return { 
            top: 0, 
            right: insetHorizontal,
            bottom: 0, 
            left: insetHorizontal 
        };
    };
    

    const offsetForItem = (index) => {
        return CARD_WIDTH * index - contentInset().left;
    };

    const offsetCenter = offsetForItem(index);
    const offsetStart = offsetCenter - CARD_WIDTH / 2;
    const offsetEnd = offsetCenter + CARD_WIDTH / 2;

    useEffect(() => {
        index === 0 && updateRangePositions(offsetStart)
    }, [])
      
    return (
        <Animated.View
        style={[styles.storeCard, 
            {
                transform: [
                    {
                      scale: x.interpolate({
                        inputRange: [ offsetStart, offsetCenter, offsetEnd ],
                        outputRange: [ 0.9, 1.0, 0.9 ],
                        extrapolate: "clamp" 
                      })
                    }
                  ]
             }
        ]}
        key={index}>
            <View>
                <Image
                style={styles.image}
                source={{ uri: item.image }}
                resizeMode="stretch"
                />
                <Text style={styles.name}>{item.name}</Text>
            </View>
        </Animated.View>
    );
};
