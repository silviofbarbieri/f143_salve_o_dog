const [ longitude, setLongitude ] = useState(0);
  const [ latitude, setLatitude ] = useState(0);
  const [ offsetStart, setOffsetStart ] = useState(0);
  const [ index, setIndex ] = useState(0)
  const x = new Animated.Value(0);

  const updatePosition = (index) => {
    setLatitude(Locations[index].lat);
    setLongitude(Locations[index].lon);
  }

  useEffect(() => {
    updatePosition(0)
  }, [])
  
  const updateState = (event) => {
    let position = event.nativeEvent.contentOffset.x;
    let i = Math.floor((position - offsetStart) / CARD_WIDTH)
    if(index !== i){
      updatePosition(i);
      setIndex(i);
    }
  }

  const onScroll = Animated.event(
    [{ nativeEvent: { 
      contentOffset: { x } 
    }}], { 
      listener: (event) => updateState(event), 
      useNativeDriver: true , 
    }
  );

  const _updateRangePositions = (offsetStart) => {
    setOffsetStart(offsetStart)
  }
