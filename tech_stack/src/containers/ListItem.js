import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  LayoutAnimation
} from 'react-native';
import { connect } from 'react-redux';

import { CardSection } from '../components/common';
import * as actions from '../actions';

class ListItem extends Component {
  componentWillUpdate() {
    LayoutAnimation.spring();
  }

  renderDescription() {
    const {
      library: { description },
      expanded
    } = this.props;

    if (expanded) {
      return (
        <CardSection>
          <Text style={{ flex: 1 }}>
            {description}
          </Text>
        </CardSection>
      );
    }
  }

  render() {
    const {
      library: { id, title },
      selectLibrary
    } = this.props;
    const { titleStyle } = styles;

    return (
      <TouchableWithoutFeedback onPress={() => selectLibrary(id)}>
        <View>
          <CardSection>
            <Text style={titleStyle}>{title}</Text>
          </CardSection>
          {this.renderDescription()}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

ListItem.propTypes = {
  library: PropTypes.object.isRequired
};

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
};

const mapStateToProps = (state, ownProps) => {
  const { selectionLibraryId } = state;
  const { id } = ownProps.library;
  return { expanded: selectionLibraryId === id };
};

export default connect(mapStateToProps, actions)(ListItem);
