import React from "react";
import {View , Text , StyleSheet, SafeAreaView, TouchableOpacity, FlatList,KeyboardAvoidingView, TextInput, Keyboard, Animated} from "react-native";
import colors from "../colors"
import tempdata from "../tempdata";
import {AntDesign} from "@expo/vector-icons"
import {Ionicons} from "@expo/vector-icons"
import {Swipeable} from "react-native-gesture-handler"

export default class ListeModal extends React.Component{
    state={
        newtodo:""
    };

    toggleTodoCompleted = index =>{
        let liste=this.props.liste
        liste.todos[index].completed = !liste.todos[index].completed
        this.props.updateList(liste);
    };

    ekleListe=()=>{
        let liste=this.props.liste;
        liste.todos.push({title:this.state.newtodo, completed:false});
        this.props.updateList(liste);
        this.setState({newtodo:""});

        Keyboard.dismiss();
    };
    deleteListe=index=>{
        let liste=this.props.liste;
        liste.todos.splice(index,1);
        this.props.updateList(liste);

    };

    renderListe = (todo,index) =>{
        return(
            <Swipeable renderRightActions={(_, graX)=>this.rightActions(graX,index)}>
            <View style={styles.ListeContainer}>
               <TouchableOpacity onPress={()=>this.toggleTodoCompleted(index)}>
                   <Ionicons name={todo.completed ? "ios-square":"ios-square-outline"} size={24} color={colors.gray} style={{width:32}}></Ionicons>
               </TouchableOpacity>
                <Text style={styles.liste , {textDecorationLine:todo.completed?'line-through':'none', color:todo.completed ? colors.gray:colors.black}}>{todo.title}</Text>
            </View>
            </Swipeable>
        )
    };

    rightActions =(dragX , index) =>{
        const scale=dragX.interpolate({
            inputRange:[-100,0],
            outputRange:[1,0.9],
            extrapolate:"clamp"
        });

        const opacity =dragX.interpolate({
            inputRange:[-100,-20,0],
            outputRange:[1,0.9,0],
            extrapolate:"clamp"
        });
        return(
            <TouchableOpacity onPress={()=>this.deleteListe(index)}>
                <Animated.View style={[styles.silbuton ,{opacity:opacity}] }>
                    <Animated.Text style={{color:colors.white , fontWeight:"800",transform:[{scale}]}}>
                        Sil
                    </Animated.Text>
                </Animated.View>
            </TouchableOpacity>
        );
    };

    render(){
        const liste=this.props.liste;
        const taskCount=liste.todos.length
        const completedCount=liste.todos.filter(todo=>todo.completed).length

    return(
        <KeyboardAvoidingView style={{flex:1}} behavior="padding">
            <SafeAreaView style={styles.container}>
                <TouchableOpacity style={{position:'absolute', top:30, right:12,zIndex:10}} onPress={this.props.closeModal}>
                    <AntDesign name="close" size={24} color={colors.black}></AntDesign>
                </TouchableOpacity>

                <View style={[styles.section , styles.header ,{borderBottomColor:liste.color}]}>
                    <View>
                      <Text style={styles.baslik}>{liste.name}</Text>
                      <Text style={styles.listeİcerik}>
                        Tamamlanan {completedCount} Toplam {taskCount}
                      </Text>
                    </View>
                </View>
                <View style={[styles.section , {flex:3 , marginVertical:16}]}>
                    <FlatList data={liste.todos} 
                              renderItem={({item , index})=>this.renderListe(item, index)} 
                              keyExtractor={item=>item.title}
                              showsVerticalScrollIndicator={false}></FlatList>
                </View>

                <View style={[styles.section , styles.footer]}>
                    <TextInput style={[styles.girdi , {borderColor:liste.color}]} onChangeText={text=>this.setState({newtodo:text})}value={this.state.newtodo}></TextInput>
                    <TouchableOpacity style={[styles.yeniyapilacak , {backgroundColor:liste.color}]} onPress={() => this.ekleListe()}>
                        <AntDesign name="plus" size={16} color={colors.white}></AntDesign>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    section:{
        alignSelf:"stretch"
    },
    header:{
        justifyContent:"flex-end",
        marginLeft:64,
        borderBottomWidth:3,
        paddingTop:26
    },
    baslik:{
        fontSize:30,
        fontWeight:"800",
        color:colors.black
    },
    taskCount:{
        marginTop:4,
        marginBottom:16,
        color:colors.gray,
        fontWeight:"600"
    },
    footer:{
        paddingHorizontal:32,
        flexDirection:"row",
        alignItems:"center",
        paddingVertical:16
    },
    girdi:{
        flex:1,
        height:48,
        borderWidth:StyleSheet.hairlineWidth,
        borderRadius:6,
        marginRight:8,
        paddingHorizontal:8
    },
    yeniyapilacak:{
        borderRadius:4,
        padding:16,
        alignItems:"center",
        justifyContent:"center"
    },
    ListeContainer:{
        paddingVertical:16,
        flexDirection:"row",
        alignItems:"center",
        paddingLeft:32
    },
    liste:{
        color:colors.black,
        fontWeight:"700",
        fontSize:16
    },
    silbuton:{
        flex:1,
        backgroundColor:colors.red,
        justifyContent:"center",
        alignItems:"center",
        width:80
    }
    
});