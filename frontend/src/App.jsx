import { useState } from "react";





function App() {
  const [result, setResult] = useState(null);

  const [formData, setFormData] = useState({
    Age: "",
    Gender: "Male",
    Country: "",
    Academic_Level: "Undergraduate",
    Most_Used_Platform: "Facebook",
    Purpose_Of_Use: "Education",
    Avg_Daily_Usage_Hours: "",
    Daily_Unlocks: "",
    Study_Hours: "",
    Physical_Activity_Hours: "",
    Sleep_Hours_Per_Night: "",
    Stress_Level: "Low",
  });


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("https://student-mental-health-score-predictor.onrender.com/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,

        // convert numbers from string to number
        Age: Number(formData.Age),
        Avg_Daily_Usage_Hours: Number(formData.Avg_Daily_Usage_Hours),
        Daily_Unlocks: Number(formData.Daily_Unlocks),
        Study_Hours: Number(formData.Study_Hours),
        Physical_Activity_Hours: Number(formData.Physical_Activity_Hours),
        Sleep_Hours_Per_Night: Number(formData.Sleep_Hours_Per_Night),
      }),
    });



    console.log(response.status);
    const text = await response.text();
    console.log(text);


    
    const data = await response.json();

    setResult(data.predicted_mental_health_score);
  };


  const platforms = [
    "Facebook",
    "LinkedIn",
    "Instagram",
    "Snapchat",
    "Twitter",
    "YouTube",
    "TikTok",
    "LINE",
    "KakaoTalk",
    "VKontakte",
    "WhatsApp",
    "WeChat",
  ];


  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-5">

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-xl"
      >

        <h1 className="text-3xl font-bold mb-6 text-center">
          Student Mental Health Prediction
        </h1>


        {/* Age */}
        <input
          className="input"
          name="Age"
          placeholder="Age"
          type="number"
          onChange={handleChange}
        />


        {/* Gender */}
        <select
          className="input"
          name="Gender"
          onChange={handleChange}
        >
          <option>Male</option>
          <option>Female</option>
        </select>


        {/* Country */}
        <input
          className="input"
          name="Country"
          placeholder="Country"
          onChange={handleChange}
        />


        {/* Academic Level */}
        <select
          className="input"
          name="Academic_Level"
          onChange={handleChange}
        >
          <option>Undergraduate</option>
          <option>Graduate</option>
          <option>High School</option>
        </select>


        {/* Platform */}
        <select
          className="input"
          name="Most_Used_Platform"
          onChange={handleChange}
        >
          {platforms.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>


        {/* Purpose */}
        <select
          className="input"
          name="Purpose_Of_Use"
          onChange={handleChange}
        >
          <option>Networking</option>
          <option>Education</option>
          <option>Entertainment</option>
          <option>News</option>
        </select>


        <input
          className="input"
          name="Avg_Daily_Usage_Hours"
          placeholder="Daily Usage Hours"
          type="number"
          step="0.1"
          onChange={handleChange}
        />


        <input
          className="input"
          name="Daily_Unlocks"
          placeholder="Daily Unlocks"
          type="number"
          onChange={handleChange}
        />


        <input
          className="input"
          name="Study_Hours"
          placeholder="Study Hours"
          type="number"
          step="0.1"
          onChange={handleChange}
        />


        <input
          className="input"
          name="Physical_Activity_Hours"
          placeholder="Physical Activity Hours"
          type="number"
          step="0.1"
          onChange={handleChange}
        />


        <input
          className="input"
          name="Sleep_Hours_Per_Night"
          placeholder="Sleep Hours"
          type="number"
          step="0.1"
          onChange={handleChange}
        />


        {/* Stress */}
        <select
          className="input"
          name="Stress_Level"
          onChange={handleChange}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
          <option>Very High</option>
        </select>



        <button
          className="w-full bg-blue-600 text-white py-2 rounded-lg mt-5 hover:bg-blue-700"
        >
          Predict
        </button>


        {result && (
          <div className="mt-5 text-center text-xl font-semibold">
            Mental Health Score: {result}
          </div>
        )}

      </form>

    </div>
  );
}

export default App;