import React, {Component, createRef} from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
  Dimensions,
} from 'react-native';
import Indicator from './Indicator';
import ChildItem from './ChildItem';

export default class FlatListSlider extends Component {
  slider = createRef();

  static defaultProps = {
    data: [],
    initialScrollIndex: 0,
    imageKey: 'imageUrl',
    local: false,
    width: Math.round(Dimensions.get('window').width-45),
    height: 165,
    separatorWidth: 7,
    loop: true,
    indicator: true,
    indicatorStyle: {},
    indicatorContainerStyle: {},
    indicatorActiveColor: '#3498db',
    indicatorInActiveColor: '#bdc3c7',
    indicatorActiveWidth: 6,
    animation: true,
    autoscroll: true,
    timer: 3000,
    onPress: {},
    contentContainerStyle: {},
    component: <ChildItem/>,
    removeClippedSubviews: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      index: this.props.initialScrollIndex,
      data: this.props.data,
    };
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  componentDidMount() {
    if( this.props.onRef){
      this.props.onRef(this)
    }
    if (this.props.autoscroll) {
      this.startAutoPlay();
    }
  }

  componentWillUnmount() {
    if( this.props.onRef){
      this.props.onRef(undefined)
    }
   
    if (this.props.autoscroll) {
      this.stopAutoPlay();
    }
  }

  render() {
    const itemWidth = this.props.width;
    const separatorWidth = this.props.separatorWidth;
    const totalItemWidth = itemWidth + separatorWidth;

    return (
      <View>
        <FlatList
          ref={this.slider}
          windowSize={3}
          initialNumToRender={5}
          maxToRenderPerBatch={5}
          removeClippedSubviews={this.props.removeClippedSubviews}
          horizontal
          pagingEnabled={true}
          snapToInterval={totalItemWidth}
          decelerationRate="fast"
          bounces={false}
          contentContainerStyle={this.props.contentContainerStyle}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) =>
            React.cloneElement(this.props.component, {
              style: {width: this.props.width,borderRadius:5},
              item: item,
              imageKey: this.props.imageKey,
              onPress: this.props.onPress,
              index: this.state.index % this.props.data.length,
              active: index === this.state.index,
              local: this.props.local,
              height: this.props.height,
            })
          }
          ItemSeparatorComponent={() => (
            <View style={{width: this.props.separatorWidth}} />
          )}
          keyExtractor={(item, index) => item.toString() + index}
          onViewableItemsChanged={this.onViewableItemsChanged}
          viewabilityConfig={this.viewabilityConfig}
          getItemLayout={(data, index) => ({
            length: totalItemWidth,
            offset: totalItemWidth * index,
            index,
          })}
          data={this.state.data}
        />
        {this.props.indicator && (
          <Indicator
            itemCount={this.props.data.length}
            currentIndex={this.state.index % this.props.data.length}
            indicatorStyle={this.props.indicatorStyle}
            indicatorContainerStyle={[
              styles.indicatorContainerStyle,
              this.props.indicatorContainerStyle,
            ]}
            indicatorActiveColor={this.props.indicatorActiveColor}
            indicatorInActiveColor={this.props.indicatorInActiveColor}
            indicatorActiveWidth={this.props.indicatorActiveWidth}
            style={{...styles.indicator, ...this.props.indicatorStyle}}
          />
        )}
      </View>
    );
  };

  onViewableItemsChanged = ({viewableItems, changed}) => {
    if (viewableItems.length > 0) {
      let currentIndex = viewableItems[0].index;
      if (
        currentIndex % this.props.data.length === this.props.data.length - 1 &&
        this.props.loop
      ) {
        this.setState({
          index: currentIndex,
          data: [...this.state.data, ...this.props.data],
        });
      } else {
        this.setState({index: currentIndex%this.props.data.length});
      }

      if (this.props.currentIndexCallback) {
        this.props.currentIndexCallback(currentIndex);
      }
    }
  };

  viewabilityConfig = {
    viewAreaCoveragePercentThreshold: 50,
  };

   incrementSliderListIndex = () => {
     let newIndex = this.state.index + 1;
    if (this.props.animation) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
    this.setState({index: newIndex});
    this.slider.current.scrollToIndex({
      index: newIndex%this.props.data.length,
      animated: true,
    });
  };

  decrementSliderListIndex = () => {
    if( this.state.index>0){
      let newIndex = this.state.index - 1;
      if (this.props.animation) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      }
      this.setState({index: newIndex});
      this.slider.current.scrollToIndex({
        index: newIndex%this.props.data.length,
        animated: true,
      });
    }
  };

  startAutoPlay = () => {
    this.sliderTimer = setInterval(
      this.incrementSliderListIndex,
      this.props.timer,
    );
  };

  stopAutoPlay = () => {
    if (this.sliderTimer) {
      clearInterval(this.sliderTimer);
      this.sliderTimer = null;
    }
  };
}

const styles = StyleSheet.create({
  image: {
    height: 200,
    resizeMode: 'stretch',
  },
  indicatorContainerStyle: {
    marginTop: 18,
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {width: 3, height: 3},
        shadowOpacity: 0.4,
        shadowRadius: 10,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});
