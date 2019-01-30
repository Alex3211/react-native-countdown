import React from 'react';
import {
  Text,
  ProgressBarAndroid,
  StyleSheet,
  View,
  Button
} from 'react-native';

export default class TabBarIcon extends React.Component {
  constructor(props) {
    super(props);
  }
  calcucateProgress(start, stop) {
    const today = new Date().getTime();
    const tmp = Number((((stop.getTime() - today) / (stop.getTime()- start.getTime()) - 1) * -1).toPrecision(2));
    return tmp
  }
  render() {
    return (
      <View>
        <View style={styles.container}>
          <Text style={styles.subItem}>{this.props.data.title}</Text>
          <Text style={styles.item}>
            { ` (${this.props.data.stop.getMonth() > 9 ? this.props.data.stop.getMonth() : `0${this.props.data.stop.getMonth()+1}`}/${this.props.data.stop.getDate() > 9 ? this.props.data.stop.getDate() : `0${this.props.data.stop.getDate()}`}/${this.props.data.stop.getFullYear()}) ` }
          </Text>
          <View style={styles.btn} >
            <Button onPress={() => this.props.delete(this.props.data.title)} title={'Delete'}>
            </Button>
          </View>
        </View>
        <ProgressBarAndroid
          style={styles.pgbar}
          styleAttr="Horizontal"
          indeterminate={false}
          progress={this.calcucateProgress(this.props.data.start, this.props.data.stop)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 3,
    borderTopColor: 'rgba(0,0,0,.05)',
    padding: 5,
    height: '20%',
    width: '100%',
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#F5FCFF',
    fontSize: 10,
    flexGrow: 1,
    fontWeight: 'bold',
    flexDirection: 'row',
    justifyContent: 'flex-start',

  },
  item: {
    opacity: 0.4
  },
  btn: {
    position: 'absolute',
    right: 5,
    top: 5
  },
  pgbar: {
    width: '70%'
  },
  subItem: {
    paddingLeft: 8
  }
});