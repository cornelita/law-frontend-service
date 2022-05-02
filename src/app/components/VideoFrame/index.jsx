import React from 'react';
import { View, Text } from 'react-native-web';
import PropTypes from 'prop-types';
import { ArrowDownward } from '@mui/icons-material';

function VideoFrame(props) {
  const { idVideo } = props;

  if (idVideo !== "") {
    return (
      <iframe
        width="480"
        height="270"
        src={`https://www.youtube.com/embed/${idVideo}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    )
  }

  return (
    <View
      style={{
        width: 480,
        height: 270,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#C4C4C4',
      }}
    >
      <Text style={{ font: 'inherit' }}>
        Let's generate your first random video!
        <br />
        <Text style={{ display: 'flex' }}>
          Click "Generate"
          <ArrowDownward />
        </Text>
      </Text>
    </View>
  )
}

VideoFrame.defaultProps = {
  idVideo: "",
};

VideoFrame.propTypes = {
  idVideo: PropTypes.string,
};

export default VideoFrame;
