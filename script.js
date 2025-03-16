document.getElementById('riskForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const age = parseInt(document.getElementById('age').value, 10);
  const bmiChecked = document.querySelector('input[name="bmi"]:checked');
  const bmiValue = bmiChecked ? bmiChecked.value : null;
  const bpChecked = document.querySelector('input[name="bloodPressure"]:checked');
  const bpValue = bpChecked ? bpChecked.value : null;
  const familyDisease = Array.from(
    document.querySelectorAll('input[name="familyDisease"]:checked')
  ).map(checkbox => checkbox.value);

  const data = {
    age: age,
    bmi: bmiValue,
    bloodPressure: bpValue,
    familyDisease: familyDisease
  };

  fetch('https://health-insurance-calculator-exfhhhggf0hgb8fu.uaenorth-01.azurewebsites.net', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(resultData => {
      const resultDiv = document.getElementById('result');
      resultDiv.textContent = `Your total points: ${resultData.totalPoints}. Your risk level is: ${resultData.riskLevel}`;
    })
    .catch(error => {
      const resultDiv = document.getElementById('result');
      resultDiv.textContent = 'An error occurred while calculating risk.';
      console.error('Error:', error);
    });
});
