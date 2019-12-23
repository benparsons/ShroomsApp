import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, ScrollView, TouchableOpacity } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
const details = require("./details.json");

function getPanelById(id):Panel {
  const panel = details.find(p => p.panel === id)
  return panel ? panel : {text:`unknown, can't find${id}`} ;
}

class Panel {
  id:string;
  answer?:string;
}

class IndentifyScreen extends Component<{}, { panels: Panel[] }> {
  constructor(props) {
    const panels:Panel[] = [{"id":"has-gills"}];
    super(props);
    this.state = {panels: panels};
  }
  render() {
    console.log(this.state.panels);
    const currentPanel = this.state.panels[this.state.panels.length-1];
    var buttons = getPanelById(currentPanel.id).buttons.map((button, index) => {
      return (
        <View
          style={styles.container}
          key={button.text}>
          <Button
            title={button.text}
            onPress={() => {
              var newPanels = this.state.panels as Panel[];
              const previous = newPanels.pop();
              previous.answer = index;
              newPanels.push(previous);
              newPanels.push({id: button.panel});
              this.setState({panels: newPanels});
            }}
          />
        </View>
        )
    });
    var answers = this.state.panels.map(panel => {
      return(
        panel != this.state.panels[this.state.panels.length-1] &&
        <TouchableOpacity style={styles.container}
        onPress={(e) => {
          alert(panel);
        }}
        key={panel.id}>
          <Text>{getPanelById(panel.id).text}</Text>
          <Text>{getPanelById(panel.id).buttons[panel.answer].text}</Text>
        </TouchableOpacity>)
    })
    return (
      <ScrollView>
        <View style={styles.container}>
          <Button
            title="Go to Details"
            onPress={() => this.props.navigation.navigate('Details')}
          />
          <Button
            title="Back"
            onPress={() => {
              var newPanels = this.state.panels;
              newPanels.pop();
              this.setState({panels: newPanels});
            }}
          />
        </View>
        {answers}
        <Text style={styles.container}>{getPanelById(currentPanel.id).text}</Text>
        {buttons}
      </ScrollView>
    );
  }
}

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: IndentifyScreen,
    },
    Details: {
      screen: DetailsScreen,
    },
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
//{
//  "panel": "",
//  "text": "",
//  "buttons": [
//    {
//      "text": "",
//      "panel": ""
//    },
//    {
//      "text": "",
//      "panel": ""
//    }
//  ]
//}

function addPanel(panelIndex:Number) {
  this.setState({"theText":"sdf2"})
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
