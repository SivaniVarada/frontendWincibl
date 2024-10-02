import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

function PptUploader() {
  const questionsList = [
    "How often do you feel overwhelmed by your academic workload?",
    "On a scale of 1 to 10, how would you rate your current level of stress?",
    "In the past week, have you felt consistently sad or hopeless, or had difficulty enjoying things you used to?",
    "Do you often feel anxious or worried about things, even when there isn't an immediate reason?",
    "Have you experienced difficulty sleeping, or do you often feel tired or unrested during the day?",
    "Have you ever thought about harming yourself or had feelings of hopelessness or suicidal thoughts?",
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [videoStream, setVideoStream] = useState(null);
  const [responses, setResponses] = useState([]); // Store question-response pairs
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [recognitionActive, setRecognitionActive] = useState(false);
  const [surveyComplete, setSurveyComplete] = useState(false);
  const [currentTranscript, setCurrentTranscript] = useState("");
  const [mentalHealthData, setMentalHealthData] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state for the submit button

  const videoRef = useRef(null);
  const recognitionRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  useEffect(() => {
    startVideoRecording();
    return () => {
      stopVideoRecording();
    };
  }, []);

  const startVideoRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setVideoStream(stream);
      videoRef.current.srcObject = stream;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = handleDataAvailable;
      mediaRecorderRef.current = mediaRecorder;
    } catch (error) {
      console.error("Error accessing video/audio:", error);
    }
  };

  const stopVideoRecording = () => {
    if (videoStream) {
      videoStream.getTracks().forEach((track) => track.stop());
      if (mediaRecorderRef.current.state === "recording") {
        mediaRecorderRef.current.stop();
      }
    }
  };

  const handleDataAvailable = (event) => {
    if (event.data.size > 0) {
      setRecordedChunks((prev) => [...prev, event.data]);
    }
  };

  const startSpeechRecognition = () => {
    if (!recognitionActive && "webkitSpeechRecognition" in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join("");
        setCurrentTranscript(transcript);

        if (event.results[0].isFinal) {
          // Capture the audio response with the corresponding question
          const currentQuestion = questionsList[currentQuestionIndex];
          setResponses((prevResponses) => [
            ...prevResponses,
            { question: currentQuestion, response: transcript },
          ]);
          setCurrentTranscript("");
        }
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event);
      };

      recognitionRef.current = recognition;
      recognition.start();
      setRecognitionActive(true);
    }
  };

  const stopSpeechRecognition = () => {
    if (recognitionActive && recognitionRef.current) {
      recognitionRef.current.stop();
      setRecognitionActive(false);
    }
  };

  const handleMicClick = () => {
    if (!isRecording) {
      setIsRecording(true);
      mediaRecorderRef.current.start();
      startSpeechRecognition();
    } else {
      setIsRecording(false);
      mediaRecorderRef.current.stop();
      stopSpeechRecognition();
      handleNextQuestion();
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questionsList.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setSurveyComplete(true);
      stopVideoRecording();
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true); // Start loading
      // Prepare FormData
      const formData = new FormData();
      formData.append("responses", JSON.stringify(responses));
      const blob = new Blob(recordedChunks, { type: "video/webm" });
      formData.append("video", blob, "recording.webm");

      // Send the data
      const response = await axios.post(
        "http://localhost:5009/api/emotion",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      let responseData = response.data.response;
      console.log("Raw response data:", responseData);

      // Clean the data: Remove the json and extra newlines
      responseData = responseData.replace(/json|```/g, "").trim();
      console.log("Cleaned response data:", responseData);

      // Parse the JSON string
      const parsedData = JSON.parse(responseData);
      console.log("Parsed Data:", parsedData);

      // Now you can use parsedData to create cards for each mental health metric
      // Example: You might store it in the state
      setMentalHealthData(parsedData);

      console.log("Successfully submitted the data");
    } catch (error) {
      console.error("Error submitting data:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-4 text-teal-500 text-center">
        EMBARK ON YOUR JOURNEY FOR A HEALTHIER YOU!
      </h1>

      <div className="flex flex-col items-center space-y-6">
        {!surveyComplete && (
          <>
            <video
              ref={videoRef}
              autoPlay
              muted
              className="w-1/2 h-auto bg-gray-200 rounded-lg shadow-md"
            ></video>
            <p className="text-xl font-semibold">
              {questionsList[currentQuestionIndex]}
            </p>
            <p className="text-lg italic text-gray-500 mt-2">
              {currentTranscript || "Listening..."}
            </p>
            <button
              onClick={handleMicClick}
              className={`mt-4 px-6 py-2 font-bold text-white ${
                isRecording ? "bg-red-500" : "bg-green-500"
              } rounded`}
            >
              {isRecording ? "Stop Recording" : "Start Recording"}
            </button>
          </>
        )}

        {surveyComplete && (
          <>
            <p className="text-xl text-green-600 font-semibold">
              Your responses have been recorded!
            </p>
            <button
              onClick={handleSubmit}
              disabled={loading} // Disable the button while loading
              className={`mt-4 px-6 py-2 font-bold text-white ${
                loading
                  ? "bg-gray-400"
                  : isRecording
                  ? "bg-red-500"
                  : "bg-green-500"
              } rounded`}
            >
              {loading ? "Submitting..." : "Submit Responses"}
            </button>
            {loading && <div className="mt-2">Loading...</div>}{" "}
            {/* Loader text */}
          </>
        )}
      </div>

      {/* Display mental health data after responses are received */}
      {mentalHealthData && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(mentalHealthData).map(([key, value]) => (
            <div key={key} className="border p-4 rounded shadow-lg bg-white">
              <h2 className="text-xl font-bold mb-2">{key}</h2>
              <p className="text-lg font-semibold">{value}%</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PptUploader;
