import { useState } from "react";
import "./App.css"; // Import the CSS separately

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

        🏋️ Monday - Upper Body Strength
        - Bench Press: 4 sets x 8-10 reps
        - Pull-ups: 3 sets x max reps
        - Overhead Press: 3 sets x 10 reps
        - Bicep Curls: 3 sets x 12 reps

        🏃 Wednesday - Cardio & Core
        - 30 min moderate intensity run
        - Plank: 3 sets x 60 seconds
        - Russian Twists: 3 sets x 20 reps
        - Mountain Climbers: 3 sets x 15 reps

        🦵 Friday - Lower Body Power
        - Squats: 4 sets x 8-10 reps
        - Deadlifts: 3 sets x 8 reps
        - Lunges: 3 sets x 12 reps per leg
        - Calf Raises: 3 sets x 15 reps

        Remember to warm up before each session and stay hydrated!`);
      setIsLoading(false);
    }, 1500);
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
          <button
            onClick={generateWorkoutPlan}
            disabled={!userInput.trim() || isLoading}
            className="generate-button"
          >
            {isLoading ? "Generating..." : "Generate Workout Plan"}
          </button>
        </div>

        {/* Response Section */}
        {workoutPlan && (
          <div className="response-section">
            <h2 className="response-title">Your Personalized Workout Plan</h2>
            <p className="response-text">{workoutPlan}</p>
          </div>
        )}
      </div>
    </div>
  );
}
