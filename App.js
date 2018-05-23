/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import styles from './style.js';

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,Button,TextInput,TouchableOpacity,NavigatorIOS
} from 'react-native';



import SQLite from 'react-native-sqlite-storage';
import AddContacts from './AddContacts.js'

export default class NavigatorIOSApp extends React.Component {

  constructor(props, context) {
    super(props, context);
    //this._onForward = this._onForward.bind(this);
  }
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: App,
          title:'Home',
          passProps: {index: 1},
          navigationBarHidden: true,
        }}
        style={{flex: 1}}
      />
    );
  }
}


class App extends Component<Props> {


  _add=()=>{
    this.props.navigator.push({
      component: AddContacts,
    });
  }

  errorCB=(err)=> {
    console.log("SQL Error: " + err);
  }

  successCB=() =>{
    console.log("SQL executed fine");
  }

  openCB=() =>{
    console.log("Database OPENED");
  }

  add=()=>{
    var db = SQLite.openDatabase({name: 'my.db', location: 'default'}, this.successCB, this.errorCB);
    db.transaction((tx) => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS Contact111('+
                      'column_1 NOT NULL INTEGER PRIMARY KEY,'+
                      'LastName varchar(255),'+
                      'FirstName varchar(255),'+
                      'Address varchar(255),'+
                      'City varchar(255));');

      console.log("Query completed");
      tx.executeSql("Insert into Contact111 values(23,'adf','m','asdf','df');")
      console.log("Query completed");

      tx.executeSql('SELECT * FROM Contact111',[], (tx, results) => {
      console.log("Query completed");

      // Get rows with Web SQL Database spec compliance.

      var len = results.rows.length;
      for (let i = 0; i < len; i++) {
        let row = results.rows.item(i);
        console.log(row);
      }
      });
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchnadd}>
          <TextInput
          style={styles.inputs}
          secureTextEntry={false}
          placeholder="Username"
          keyboardType="default"
          auto-capitalization={false}
          />

        <TouchableOpacity style={styles.submit} onPress={this._add}>
          <Text style={{  color: 'white'}}>Add</Text>
          </TouchableOpacity>


        </View>

      </View>
    );
  }
}
