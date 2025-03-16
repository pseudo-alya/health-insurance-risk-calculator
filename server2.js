// server.js
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

// Parse JSON in request bodies
app.use(express.json());
//directiory
app.use(express.static(path.join(__dirname)));

// Your POST endpoint for calculating risk WE WILL TRY AZURE URL
app.post('/calculate-risk', (req, res) => {
  const { age, bmi, bloodPressure, familyDisease } = req.body;
  let totalPoints = 0;

  // 1. Age
  if (age < 30) totalPoints += 0;
  else if (age < 45) totalPoints += 10;
  else if (age < 60) totalPoints += 20;
  else totalPoints += 30;

  // 2. BMI
  if (bmi === 'normal') totalPoints += 0;
  else if (bmi === 'overweight') totalPoints += 30;
  else totalPoints += 75;

  // 3. Blood Pressure
  switch (bloodPressure) {
    case 'normal':
      totalPoints += 0;
      break;
    case 'elevated':
      totalPoints += 15;
      break;
    case 'stage1':
      totalPoints += 30;
      break;
    case 'stage2':
      totalPoints += 75;
      break;
    case 'crisis':
      totalPoints += 100;
      break;
  }

  // 4. Family Disease
  if (Array.isArray(familyDisease)) {
    if (familyDisease.includes('diabetes')) totalPoints += 10;
    if (familyDisease.includes('cancer')) totalPoints += 10;
    if (familyDisease.includes('alzheimer')) totalPoints += 10;
  }

  // Determine risk level
  let riskLevel = '';
  if (totalPoints <= 20) riskLevel = 'Low Risk';
  else if (totalPoints <= 50) riskLevel = 'Moderate Risk';
  else if (totalPoints <= 75) riskLevel = 'High Risk';
  else riskLevel = 'Uninsurable';

  // Respond with JSON
  res.json({ totalPoints, riskLevel });
});

// Start the server
app.listen(PORT, () => {
  console.log('Server running at http://localhost:${PORT}');
});
