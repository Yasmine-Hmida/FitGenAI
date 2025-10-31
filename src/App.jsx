import { useState } from "react";
import { jsPDF } from "jspdf"; // For a pdf download
import download from "./assets/download.png";
import "./App.css";

export default function App() {
  const [userInput, setUserInput] = useState("");
  const [workoutPlan, setWorkoutPlan] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generateWorkoutPlan = async () => {
    if (!userInput.trim()) return;

    setIsLoading(true);
    setWorkoutPlan("");

    try {
      // Call the FastAPI backend
      const response = await fetch(
        `http://localhost:8000/search?prompt=${encodeURIComponent(userInput)}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch workout plan");
      }

      const data = await response.json();
      const exercises = data.results;

      // Format JSON into a readable text
      let formattedPlan = `Based on your goals: "${userInput}", here's your personalized workout plan:\n\n`;
      exercises.forEach((ex, i) => {
        formattedPlan += `- Exercise ${i + 1}: ${ex.name}\n`;
        formattedPlan += `    • ${ex.sets} sets * ${ex.reps} reps\n`;
        formattedPlan += `    • Target: ${ex.target}\n`;
        formattedPlan += `    • Secondary muscles: ${ex.secondary_muscles_full}\n`;
        formattedPlan += `    • Equipment: ${ex.equipment}\n\n`;
      });

      setWorkoutPlan(formattedPlan);
    } catch (err) {
      console.error(err);
      setWorkoutPlan("Sorry, there was an error generating your workout plan.");
    }

    setIsLoading(false);
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
    doc.save("FitGenAI_workout_plan.pdf");
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
            <h3 className="response-tip">Remember to warm up before each session and stay hydrated!</h3>
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
