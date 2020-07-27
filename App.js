import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  FlatList,
  Modal,
  TouchableOpacity,
  StatusBar,
  Animated,
} from 'react-native';
import colors from './colors';
import tempdata from './tempdata';
import Listele from './components/Listele';
import ListeModal from './components/ListeModal';
import {AntDesign} from "@expo/vector-icons";
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default class App extends React.Component{
  state={
    addListeVisible:false,
    listeler:tempdata
  };

  toggleAddListeModal(){
    this.setState({addListeVisible: !this.state.addListeVisible})
  }

  renderListele= listele=>{
    return <Listele liste={listele} updateList={this.updateList} ></Listele>
  }

  updateList= liste=>{
   this.setState({
     listeler:this.state.listeler.map(item =>{
       return item.id===liste.id?liste:item;
     })
   })
  };

  yeniliste = liste=>{
    this.setState({listeler:[...this.state.listeler, {...liste, id:this.state.listeler.length + 1 , todos:[] }]});
  };
  render(){
    return(
    <View style={styles.container}>

      <Modal animationType="slide" visible={this.state.addListeVisible} onRequestClose={()=>this.toggleAddListeModal()}>
        <ListeModal closeModal={()=>this.toggleAddListeModal()} yeniliste={this.yeniliste}></ListeModal>
      </Modal>
      <View style={{flexDirection:"row"}}>
        <View style={styles.dvider}/>
        <Text style={styles.title}>Yapılacaklar<Text style={{fontWeight:"300",color:colors.blue}}>App</Text></Text> 
        <View style={styles.dvider}/>
      </View>

      <View style={{marginVertical:48}}>
        <TouchableOpacity style={styles.addList} onPress={()=>this.toggleAddListeModal()}>
          <AntDesign name="plus" size={16} color={Colors.blue}></AntDesign>
        </TouchableOpacity>

        <Text style={styles.add}>Yeni Liste</Text>
      </View>

      <View style={{height:275,paddingLeft:32}}>
        <FlatList data={this.state.listeler}
         keyExtractor={item=>item.name} 
         horizontal={true}
         showsHorizontalScrollIndicator={false} 
         renderItem={({item})=> this.renderListele(item)}
         keyboardShouldPersistTaps="always"/>
      </View>

    </View>
  );
  }
  
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#fff",
    alignItems:"center",
    justifyContent:"center",
  },
  dvider:{
    backgroundColor:colors.lightblue,
    height:1,
    flex:1,
    alignSelf:"center"
  },
  title:{
    color:colors.black,
    fontWeight:"800",
    fontSize:38,
    paddingHorizontal:20

  },
  addList:{
    borderColor:colors.lightblue,
    borderWidth:2,
    borderRadius:4,
    padding:16,
    alignItems:"center",
    justifyContent:"center"
  },
  add:{
    color:colors.blue,
    fontWeight:"600",
    fontSize:14,
    marginTop:8
  }
});

