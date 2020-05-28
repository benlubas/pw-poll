import React, { useState, useEffect } from "react";
import { useSecureFetch } from "../../../hooks/useSecureFetch";
import { url } from "./../../../url";
import LoadingScreen from "./../../loadingScreen/LoadingScreen";
import QuestionCard from "./QuestionCard";
import Card from "./../../card/Card";
import AddQuestion from "./AddQuestion";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { securePut } from "./../../../hooks/securePut";

export default function QuestionList({ selectedPoll, remove, ...props }) {
  const [questionData] = useSecureFetch(url + "question/");
  const [questions, setQuestions] = useState(questionData);
  const [filtered, setFiltered] = useState([]);
  useEffect(() => {
    setQuestions(questionData);
  }, [questionData]);
  useEffect(() => {
    if (questions)
      setFiltered(questions.filter((val) => selectedPoll === val.pollID));
  }, [selectedPoll, questions]);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    // console.log("result: ", result);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    // console.log("reordered: ", result);

    return result;
  };
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    let newOrder = reorder(
      filtered,
      result.source.index,
      result.destination.index
    );
    for (let i = 0; i < newOrder.length; i++) {
      securePut(url + "question/order/" + newOrder[i]._id, {
        number: i + 1,
      });
    }
    setQuestions(newOrder);
  };

  let shownQuestions = 0;
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="questionList">
        {(provided, outterSnapshot) => {
          return (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="questionList"
            >
              {questions === [] ? (
                <LoadingScreen />
              ) : (
                filtered.map((question, index) => (
                  <Draggable
                    key={question._id}
                    draggableId={"" + question._id}
                    index={index}
                  >
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                        >
                          <QuestionCard
                            dragHandleProps={provided.dragHandleProps}
                            key={question._id}
                            info={question}
                            index={
                              !outterSnapshot.isDraggingOver ? index + 1 : "x"
                            }
                            remove={(list, id, index) => {
                              let c = [...questions];
                              c.splice(index - 1, 1);
                              setQuestions(c);
                              remove(list, id, index);
                            }}
                          />
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Draggable>
                ))
              )}
              {selectedPoll === null || selectedPoll === "newPoll" ? (
                <div className="noQuestions questionWrapper">
                  <div>Choose a poll</div>
                </div>
              ) : filtered.length === 0 && !props.showAddQuestion ? (
                <div className="noQuestions questionWrapper">
                  <div>
                    <div>There aren't any questions yet</div>
                    <button
                      onClick={() => props.setShowAddQuestion(true)}
                      className="btn primary"
                    >
                      Add One!
                    </button>
                  </div>
                </div>
              ) : props.showAddQuestion && !outterSnapshot.isDraggingOver ? (
                <div className="questionWrapper">
                  <Card
                    title={
                      <div className="flex-space-between">
                        <div>New Question</div>
                        <div>
                          <button
                            onClick={() => props.setShowAddQuestion(false)}
                            className="btn btn-small"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    }
                  >
                    <AddQuestion
                      save={(saved) => {
                        console.log(saved);
                        setQuestions([...questions, saved]);
                        props.setShowAddQuestion(false);
                      }}
                      number={shownQuestions + 1}
                      _id={selectedPoll}
                    />
                  </Card>
                </div>
              ) : !outterSnapshot.isDraggingOver ? (
                <Card title="Add a Question">
                  {props.showAddQuestion ? (
                    <AddQuestion number={filtered} _id={selectedPoll} />
                  ) : (
                    <button
                      onClick={() => props.setShowAddQuestion(true)}
                      className="btn primary wide"
                    >
                      Add
                    </button>
                  )}
                </Card>
              ) : null}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
}
