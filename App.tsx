import { SafeAreaView, Text, StyleSheet, StatusBar } from 'react-native'
import React from 'react'
import Screens from './src/screen'

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor={"#FFF"} />
      <Screens />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  }
})

