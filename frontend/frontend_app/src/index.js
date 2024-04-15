import React from 'react';
import CodeEditor from './components/CodeEditor.jsx';
import ReactDOM from 'react-dom';
const crypto = require('crypto-js');
const seedrandom = require('seedrandom');


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
// ************************ MATCHING SERVICE + FUNCTIONS ************************
$("#startMatchingBtn").on("click", function (event) {
    $('#matchingModal').modal('show');
    $("#matchingForm").css('display', 'block');
    $("#loadingFeedback").css('display', 'none');
    $("#matchFound").css('display', 'none');
    $("#matchNotFound").css('display', 'none');
});

function matchingFormValidation(topic, difficulty) {
    var isValid = true;
    
    // Clear error messages first to reset
    $(".error").text("");

    // Check each field for empty input
    if (topic === null) {
        $("#matchingTopicError").text("Topic is required");
        console.log("Topic is required");
        isValid = false;
    }

    if (difficulty === null) {
        $("#matchingDifficultyError").text("Difficulty is required");
        console.log("Difficulty is required");
        isValid = false;
    }

    return isValid;
}

function startTimer() {
    // Initialize timer value
    var timerValue = 5;

    // Display initial timer value
    $('#timer').text(timerValue);

    // Function to update timer every second
    var countdown = setInterval(function() {
        timerValue--;
        $('#timer').text(timerValue);

        if (timerValue <= 0) {
            clearInterval(countdown);
            $('#timer').text('0');
        }
    }, 1000); // Update timer every 1000ms (1 second)
}

function generateSeed(seed1, seed2, topic, difficulty){
    const seed = crypto.SHA256(`${seed1}-${seed2}-${topic}-${difficulty}`).toString(crypto.enc.Hex);
    return seed
}

$("#matchingForm").on("submit", function (event) {
    event.preventDefault();
    var userId = localStorage.getItem("userId");
    var username = localStorage.getItem("username");
    var topic = $("#matchingTopic").val();
    var difficulty = $("#matchingDifficulty").val();
    console.log(topic);
    console.log(difficulty);

    // Perform form validation
    var isValid = matchingFormValidation(topic, difficulty);
    if (!isValid) {
        event.preventDefault();
        return;
    }
    
    // Show loading spinner and start the timer on the matching modal
    $("#loadingFeedback").css('display', 'flex');
    $("#matchingForm").css('display', 'none');
    startTimer();
    
    $.ajax({
        url: "http://localhost:3002/match",
        //url: "http://localhost:8765/matching-service/match",
        type: "POST",
        timeout: 5000,
        contentType: 'application/json',
        data: JSON.stringify({
            userId: userId,
            username: username,
            topic: topic,
            difficulty: difficulty
        }),
        success: function (response) {
            console.log("Success:", response);
            $("#player1").text(response.matchedUsers[0].username)
            $("#player2").text(response.matchedUsers[1].username)
            // Display Match Found view in matching modal
            $("#loadingFeedback").css('display', 'none');
            $("#matchFound").css('display', 'flex');
            var seed1 = response.matchedUsers[0].matchid
            var seed2 = response.matchedUsers[1].matchid
            var seed = generateSeed(seed1,seed2,response.topic,response.difficulty)
            console.log("seed should be the same: ", seed)
            $("matchSeed").text(seed)
            // generate a seed for the 

            $("#matched-qn-info-category").text(response.topic)
            $("#matched-qn-info-complexity").text(response.difficulty)

        },
        error: function (xhr, status, error) {
            console.error("Error:", error);
            $("#loadingFeedback").css('display', 'none');
            $("#matchNotFound").css('display', 'flex');
        }
    }).then(()=>{
        $.ajax({
            //url: "http://localhost:8080/api/questions",
            url: "http://localhost:8765/question-service/api/questions",
            type: "GET",
            success: function (response) {
                // get random question
                const category = $("#matched-qn-info-category").text()
                const complexity = $("#matched-qn-info-complexity").text()

                function checkResponse(question){
                    return (question.category.includes(category) && complexity === question.complexity)
                }

                const rng = seedrandom($("matchSeed").text()); // Initialize PRNG with seed

                // Use PRNG to select a random question from the list

                var filteredQns = response.filter(checkResponse)
                const randomIndex = Math.floor(rng() * filteredQns.length);
                // const randomIndex = Math.floor(Math.random() * filteredQns.length);
                var selectedQuestion = filteredQns[randomIndex]
      
                // handle scenario where filered questions is 0 
                if (filteredQns.length === 0){
                    // display some error message here
                    return
                }

                $("#matched-qn-info-title").text(selectedQuestion.title);
                $("#matched-qn-info-desc").text(selectedQuestion.description);
                $("#matched-qn-id").text(selectedQuestion._id);
                console.log("this is matched-q-id: ",$("#matched-qn-id").text())
                console.log("this is selected qn:", selectedQuestion)

                $.ajax({
                    url: "http://localhost:4001/api/collab",
                    //url: "http://localhost:8765/collaboration-service/api/collab",
                    type: 'POST',
                    contentType: 'application/json',
                    // users are also given by matching service api
                    data: JSON.stringify({"users": [$("#player1").text(), $("#player2").text()],  "questionID": $("#matched-qn-id").text() }),
                    success: (roomID)=>{
                        renderReactComponent(roomID._id);
                        console.log("this is the room id returned:", roomID._id)
                        // Default room is room 0
                        $('#collaborate').click();
                        $('#codeEditorModal').modal('show');

                        $('#exitSession').on("click", ()=>{
                            console.log("exiting session...")
                            $('#matchingModal').modal('hide');
                            $('#codeEditorModal').modal('hide');
                        })

                    }
                })
      
            },
            error: function (xhr, status, error) {
                console.error("Error in retrieving questions:", error);
            }
        })
    })
    // Prevents page from reloading (the default action)
});