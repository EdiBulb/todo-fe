import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import TodoBoard from "./components/TodoBoard";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useState } from "react";
import api from "./utils/api"
import { useEffect } from "react";

function App() {
  const [todoList, setTodoList] = useState([]); // 리스트를 저장할 state
  //입력값 저장
  const [todoValue, setTodoValue] = useState('');

  //백엔드에 todolist를 요청할 함수
  const getTasks=async()=>{
    const response = await api.get('/tasks'); // tasks 주소로 get을 하고 response를 받는다.
    console.log("rrrrrrr", response); // response 형태 출력 테스트
    setTodoList(response.data.data);
  }

  // addTask 함수 생성 - '추가' 누르면 서버에 저장하는 api함수
  const addTask = async()=>{
    try{
      const response = await api.post('/tasks',{
        task: todoValue,
        isComplete: false,
      }); // 이 주소로 post 메서드를 보낸다.
      if(response.status===200){
        console.log("성공")
        //1. 입력한 값이 안사라짐 에러 해결
        setTodoValue("");
        //2. 추가한 값이 안보임 에러 해결 - 다시 함수를 불러야함
        getTasks();

      }else{
        throw new Error('task can not be added')
      }
    }catch(err){
      console.log("error", err)
    }
  }

  // 업데이트 api 함수
  const updateTask = async (id, currentStatus) => {
  try {
    const response = await api.put(`/tasks/${id}`, {
      isComplete: !currentStatus, // 현재 상태의 반대로 토글
    });
    if (response.status === 200) {
      getTasks();
    }
  } catch (err) {
    console.error("update error", err);
  }
};


// 삭제 api 함수
const deleteTask = async (id) => {
  try {
    const response = await api.delete(`/tasks/${id}`);
    if (response.status === 200) {
      getTasks(); // 삭제 후 목록 새로고침
    }
  } catch (err) {
    console.error("delete error", err);
  }
};

  

  // 페이지가 시작하자마자 get을 하는 것이므로 useEffect를 사용한다.
  useEffect(()=>{
    getTasks();
  }, [])

  return (
    <Container>
      <Row className="add-item-row">
        <Col xs={12} sm={10}>
          <input
            type="text"
            placeholder="할일을 입력하세요"
            className="input-box"
            value={todoValue} // value로 todoValue를 사용한다.
            onChange={(event)=>setTodoValue(event.target.value)} // 입력한 값 읽어오기
          />
        </Col>
        <Col xs={12} sm={2}>
          <button className="button-add" onClick={addTask}>추가</button>
        </Col>
      </Row>

      <TodoBoard 
      todoList={todoList} 
      updateTask={updateTask} 
      deleteTask={deleteTask}/>
    </Container>
  );
}

export default App;
