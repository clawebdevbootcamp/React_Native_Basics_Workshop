import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Pressable, Modal, TextInput } from 'react-native';
import {useState,  useEffect} from "react";
import {AntDesign} from "@expo/vector-icons";

export default function App() {
  const [todoList, setTodoList] = useState([]);
  const [todo, setTodo] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddTodo = () => {
    if(todo == "") console.log("empty text");
    setTodoList([...todoList, {id: todoList.length + 1, title: todo}]);
    setModalVisible(!modalVisible);
    setTodo("");
  };

  const handleRemoveTodo = (id) => {
    const copy = todoList.filter((element) => {
      return element.id.toString() != id.toString();
    });
    setTodoList(copy);
  }

  const todoElement = ({item}) => (
    <View key={item.id} style={styles.todoElement}>
      <Text style={styles.todoText}>{item.title}</Text>
      <Pressable onPress={() => handleRemoveTodo(item.id)}>
      <AntDesign name="closecircle" size={24} color="#FA8072"/>
      </Pressable>

    </View>
  );
  
    useEffect(()=> {
      fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((json) => {
        const filteredList = json.map((element) => {
          return {
            id: element.id,
            title: element.title
          }
        });
        setTodoList(filteredList);
      });
    }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.titleText}>My TODO List</Text>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        >
        <View style={styles.modalView}>
          <TextInput
            onChangeText={(text) => setTodo(text)}
            value={todo}
            placeholder="Todo title here..."
            style={styles.input}
          />
          <Pressable 
          style={styles.modalButton}
          onPress={handleAddTodo}>
            <Text style={styles.modalText}>Add</Text>
          </Pressable>
        </View>

      </Modal>
      <FlatList 
        data={todoList}
        renderItem={todoElement}
        keyExtractor={element => element.id}
        style={styles.list}
      />

      {!modalVisible && <Pressable
      onPress={() => setModalVisible(!modalVisible)}
      style={styles.button}>
      <Text style={styles.buttonText}>Add TODO</Text>
      </Pressable>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B264F',
    justifyContent: 'center',
  },
  titleText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 25,
    marginTop: 40,
    marginLeft: 15,
  },
  list: {
    marginBottom: 80,
    marginTop: 10
  },
  todoElement: {
    backgroundColor: "#576CA8",
    padding:25,
    margin: 15,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  todoText: {
    fontSize: 16,
    color: "white",
    width: "80%"
  },
  button: {
    backgroundColor: "#F25C54",
    padding: 20,
    margin :20,
    position: "absolute",
    bottom: 10,
    right: 10,
    left: 10,
    borderRadius: 10
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18
  },
  modalView: {
    backgroundColor: "white",
    margin: 20,
    padding: 25,
    justifyContent: "center",
    borderRadius: 20
  },
  input: {
    height: 48,
    padding: 10,
    margin: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "grey"
  },
  modalText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center"
  },
  modalButton: {
    padding: 20,
    backgroundColor: "#F25C54",
    margin: 20,
    borderRadius: 10,
  }

});
