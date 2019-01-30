import React from 'react';
import Counter from '../components/Counter';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
  View,
  ListView,
  DatePickerAndroid
} from 'react-native';


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Compte à rebours',
  };
  constructor(props) {
    super(props);
    const tmpds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      date: new Date(),
      ds: tmpds,
      Countdowns: tmpds.cloneWithRows([]),
      data: [
      ],
      start: null,
      stop: null,
      title: '',
      error: false
    };
    this.state.Countdowns = this.state.ds.cloneWithRows(this.state.data);
  }
  async datePickerClick(isForStart) {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        date: new Date()
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        const date = new Date(`${month > 9 ? month : `0${month+1}`}/${day > 9 ? day : `0${day}`}/${year}`);
        date.setHours(1);
        if(isForStart) {
          this.setState({start: date, error: false})
        }
        else {
          this.setState({stop: date, error: false})
        }
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }
  deleteitem(title) {
    if(!title) return;
    const tmp = this.state.data;
    tmp.splice(tmp.indexOf(e => e.title === title), 1);
    this.setState({start: null, stop: null, title: '', data: tmp, Countdowns: this.state.ds.cloneWithRows(tmp), error: false})
  }
  add() {
    if(this.state.start && this.state.stop && this.state.title && this.state.data.indexOf(e => e.title === this.state.title) === -1) {
      const tmp = this.state.data;
      tmp.push({
        start: this.state.start,
        stop: this.state.stop,
        title: this.state.title
      })
      this.setState({start: null, stop: null, title: '', data: tmp, Countdowns: this.state.ds.cloneWithRows(tmp), error: false})
    } else {
      this.setState({start: null, stop: null, title: '', error: true})
    }
  }
  formatDate(date) {
    return ` ${date.getMonth() > 9 ? date.getMonth() : `0${date.getMonth()+1}`}/${date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`}/${date.getFullYear()}`;
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <ListView
            style={styles.listItemsContainer}
            dataSource={this.state.Countdowns}
            enableEmptySections={true}
            renderRow={(counter) => <Counter delete={(title) => this.deleteitem(title)} data={counter} />} />
        </ScrollView>
        <View style={styles.bottomContainer}>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1, padding: 10}}
            onChangeText={(text) => this.setState({title: text, error: false})}
            value={this.state.title}
          />
          <View style={styles.bottomContainerContent}>
            {
              this.state.error &&
              <Text style={styles.error}>
                Please choose a title and two dates before adding.
              </Text>
            }
            {
              this.state.start &&
              <Text>
                Selected: {this.formatDate(this.state.start)}
              </Text>
            }
            <Button onPress={() => this.datePickerClick(true)} title={'Choose start date'}>
            </Button>
            {
              this.state.stop &&
              <Text>
                Selected: {this.formatDate(this.state.stop)}
              </Text>
            }
            <Button onPress={() => this.datePickerClick(false)} title={'Choose end date'}>
            </Button>
            <Button onPress={() => this.add()} title={'Add'}>
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  contentContainer: {
  },
  listItemsContainer: {
  },
  bottomContainer: {
    padding: 20,
    borderTopWidth: 3,
    borderTopColor: 'rgba(0,0,0,.04)',
    flex: 1,
    backgroundColor: '#FFF',
    fontSize: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  error: {
    color: 'red',
    opacity: 0.8
  },
  bottomContainerContent: {
    flex: 1,
    fontSize: 6,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  }
});
