import React from "react";
import { Col, Row } from "react-bootstrap";

const TodoItem = ({item, updateTask, deleteTask}) => {
  const itemClass = item.isComplete ? "todo-item done" : "todo-item";

  return (
    <Row>
      <Col xs={12}>
        <div className={`todo-item`}>
          <div className="todo-content">{item.task}</div>

          <div>
            <button className="button-delete" onClick={() => deleteTask(item._id)}>삭제</button>
            <button
            className="button-complete"
            onClick={() => updateTask(item._id, item.isComplete)} // ✅ 현재 상태도 함께 전달
          >
            {item.isComplete ? "완료됨" : "끝남"}
          </button>

          </div>
        </div>
      </Col>
    </Row>
  );
};

export default TodoItem;
