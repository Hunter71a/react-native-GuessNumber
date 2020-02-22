import React from 'react';
import { Image, StyleSheet, View } from 'react-native';


// class ImageFrame extends Component {
//   static propTypes = {
//     placeholderSource: PropTypes.any,
//     placeholderStyle: PropTypes.any,
//     source: PropTypes.any,
//     style: PropTypes.any
//   };
//   constructor(props) {
//     super(props);
//     this.state = { isLoaded: false, isError: false };
//   }
// }
// onLoadEnd() {
//   this.setState({ isLoaded: true });
// }
// onError() {
//   this.setState({ isError: true });
// }
// render() {
//   return (
//     { this.state.isLoaded & amp;& amp; !this.state.isError ? null :  }
// 	);
// }


const ImageFrame = props => {
  return (
    <Image
      source={props.imageID}
      style={{ ...styles.image, ...props.style }}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    resizeMode: "cover",
  },
  imageContainer: {
    borderRadius: 100,
    borderWidth: 3,
    borderColor: 'black',
    width: 200,
    height: 200,
    overflow: 'hidden',
    marginTop: 30,
    padding: 30,
  },
});

export default ImageFrame;