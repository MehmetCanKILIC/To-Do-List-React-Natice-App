import React from 'react';
import {StyleSheet,Text,View, TouchableOpacity,Modal} from 'react-native';
import colors from '../colors';
import ListeiciModal from './ListeiciModal'


export default class Listele extends React.Component{

    state={
        showListVisible:false
    }

    toggleListModal(){
        this.setState({showListVisible: !this.state.showListVisible})
    }

    render(){

        const liste=this.props.liste;

    const completedCount = liste.todos.filter(todo => todo.completed).length;
    const RemainningCount = liste.todos.length-completedCount;
    return(
        <View>
            <Modal animationType="slide" visible={this.state.showListVisible} onRequestClose={() =>this.toggleListModal()}>
                <ListeiciModal liste={liste} closeModal={()=> this.toggleListModal()} updateList={this.props.updateList}></ListeiciModal>
            </Modal>
            <TouchableOpacity style={[styles.listContainer,{backgroundColor:liste.color}]} onPress={() =>this.toggleListModal()}>
        <Text style={styles.listtitle} numberOfLines={1}>
            {liste.name}
        </Text>

        <View style={{alignItems:"center"}}>
        <Text style={styles.count}>{RemainningCount}</Text>
        <Text style={styles.subtitle}>Kalan</Text>
    </View>

    <View style={{alignItems:"center"}}>
        <Text style={styles.count}>{completedCount}</Text>
        <Text style={styles.subtitle}>Tamamlanan</Text>
    </View>
    </TouchableOpacity>
        </View>
    



    );

    }
};

const styles=StyleSheet.create({

    listContainer:{
        paddingVertical:32,
        paddingHorizontal:16,
        borderRadius:6,
        marginHorizontal:12,
        alignItems:"center",
        width:200
    },
    listtitle:{
        fontSize:24,
        fontWeight:"700",
        color:colors.white,
        marginBottom:18
    },
    count:{
        fontSize:48,
        fontWeight:"200",
        color:colors.white,
    },

    subtitle:{
        fontSize:12,
        fontWeight:"700",
        color:colors.white
    }



});