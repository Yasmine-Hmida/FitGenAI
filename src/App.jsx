import { useState } from "react";
import { jsPDF } from "jspdf"; // For a pdf download
import download from "./assets/download.png";
import "./App.css";

export default function App() {
  const [userInput, setUserInput] = useState("");
  const [workoutPlan, setWorkoutPlan] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generateWorkoutPlan = () => {
    if (!userInput.trim()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setWorkoutPlan(`Based on your goals: "${userInput}", here's your personalized workout plan:

        - Jumping Jacks: 2 sets * 20 reps
        - Supermans: 3 sets x 10-15 reps
        - Couch Squats: 2 sets * 10-15 reps
        - Step, Step, Jump: 3 sets * 10 reps
        - Plank twists: 2 sets * 10 reps
        - Side Lying Arm Rotations: 3 sets * 10-15 reps

        Remember to warm up before each session and stay hydrated!`);
      setIsLoading(false);
    }, 1500);
  };

  const handleDownloadPDF = (planText) => {
    if (!planText) return;

    const doc = new jsPDF({
      orientation: "p",
      unit: "pt",
      format: "a4",
    });

    // Title
    doc.setTextColor(238, 186, 11);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("Your Personalized Workout Plan", 40, 60);

    // Body text
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    const lines = doc.splitTextToSize(planText, 500);
    doc.text(lines, 40, 100);

    // Save file
    doc.save("workout_plan.pdf");
  };

  return (
    <div className="app-container">
      <div className="app-content">
        {/* Logo */}
        <div className="logo-container">
          <h1 id="logoOne">Fit</h1>
          <h1 id="logoTwo">Gen</h1>
          <h1 id="logoThree">AI</h1>
        </div>

        {/* Description */}
        <p className="app-description">
          Redefine your fitness routine with the Best Generated Workout plans
          that evolve with you!
        </p>

        {/* Input Section */}
        <div className="input-section">
          <label htmlFor="userInput" className="input-label">
            Describe your fitness goals:
          </label>
          <textarea
            id="userInput"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Tell us about your current fitness level, available equipment, and any limitations..."
            className="input-textarea"
          />

          {/* Generate Button */}
          {isLoading ? (
            <div className="loadingIconContainer">
              <img src="/gym.png" alt="Dumbbell Icon" className="loadingIcon" />
            </div>
          ) : (
            <button
              onClick={generateWorkoutPlan}
              disabled={!userInput.trim() || isLoading}
              className="generate-button"
            >
              Generate Workout Plan
            </button>
          )}
        </div>

        {/* Response Section */}
        {workoutPlan && (
          <div className="response-section">
            <h2 className="response-title">Your Personalized Workout Plan</h2>
            <p className="response-text">{workoutPlan}</p>
            <img
              className="downloadIcon"
              src={download}
              alt="Download Icon"
              onClick={() => handleDownloadPDF(workoutPlan)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
