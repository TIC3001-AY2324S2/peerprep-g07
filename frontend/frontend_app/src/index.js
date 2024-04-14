import React from 'react';
import CodeEditor from './components/CodeEditor.jsx';
import ReactDOM from 'react-dom';


// ReactDOM.render(
//     <React.StrictMode>
//       <CodeEditor />
//     </React.StrictMode>,
//     document.getElementById('editor')
// );

function renderReactComponent(roomID) {
  console.log("rendering react component with: ", roomID)
  const editorElem = document.getElementById('editor'); // Specify the DOM element to render into
  ReactDOM.render(<CodeEditor room={roomID} />, editorElem); // Render your React component into the specified DOM element
}

$("#editorButtonDummy").on("click", ()=>{
  var matchedQTitle = $("#matched-qn-info-title");
  var matchedQDesc = $("#matched-qn-info-desc");
  var matchedQCat = $("#matched-qn-info-category");
  var matchedQCom = $("#matched-qn-info-complexity");
  var matchedQid = $("#matched-qn-id");
  // given by the matching api
  var category = "Strings"
  var complexity = "Medium"
  
  $.ajax({
      url: "http://localhost:8080/api/questions",
      type: "GET",
      success: function (response) {
          // get random question
          function checkResponse(question){
              return (question.category.includes(category) && complexity === question.complexity)
          }

          var filteredQns = response.filter(checkResponse)
          const randomIndex = Math.floor(Math.random() * filteredQns.length);
          var selectedQuestion = filteredQns[randomIndex]

          matchedQTitle.text(selectedQuestion.title);
          matchedQDesc.text(selectedQuestion.description);
          matchedQCat.text(selectedQuestion.category);
          matchedQCom.text(selectedQuestion.complexity);
          matchedQid.text(selectedQuestion._id);
          console.log("this is selected qn:", selectedQuestion)

      },
      error: function (xhr, status, error) {
          console.error("Error in retrieving questions:", error);
      }
  })
  .then(()=>{
      $.ajax({
          url: "http://localhost:4001/api/collab",
          type: 'POST',
          contentType: 'application/json',
          // users are also given by matching service api
          data: JSON.stringify({"users": [1, 2],  "questionID": matchedQid.text() }),
          success: (roomID)=>{
              renderReactComponent(roomID._id);
              console.log('matched QID: ',  matchedQid.text())
              console.log("this is the room id returned:", roomID._id)
              // Default room is room 0
              $('#collaborate').click();
              $('#codeEditorModal').modal('show');
          }
      })
  });
})
