export const calculateBmi = (height: number, weight: number): string => {
  // height in centimeters, weight in kilograms
  const h = height / 100;
  const bmi = weight / (h * h);
  // console.log('bmi:', bmi);
  if (bmi < 16) return 'Underweight (Severe thinness)';
  else if (bmi >= 16 && bmi < 17) return 'Underweight (Moderate thinness)';
  else if (bmi >= 17 && bmi < 18.5) return 'Underweight (Mild thinness)';
  else if (bmi >= 18.5 && bmi < 25) return 'Normal (healthy weight)';
  else if (bmi >= 25 && bmi < 30) return 'Overweight (Pre-obese)';
  else if (bmi >= 30 && bmi < 35) return 'Obese (Class I)';
  else if (bmi >= 35 && bmi < 40) return 'Obese (Class II)';
  else if (bmi >= 40) return 'Obese (Class III)';
  else return 'Invalid value'; // no case
};

interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

export const calculateExercises = (dailyHours: Array<number>, target: number): Result => {
  const result = {
    periodLength: dailyHours.length,
    trainingDays: dailyHours.filter(a => a > 0).length,
    success: false, // raw
    rating: 0, // raw
    ratingDescription: '', // raw
    target,
    average: dailyHours.reduce((a, b) => a + b) / dailyHours.length
  };
  if (result.average >= target) {
    result.success = true;
    result.rating = 3;
    result.ratingDescription = 'good job, you reached your target';
  }
  else {
    result.success = false;
    if (result.average > target / 2) {
      result.rating = 2;
      result.ratingDescription = 'not too bad but could be better';
    }
    else {
      result.rating = 1;
      result.ratingDescription = 'you were being lazy';
    }
  }
  return result;
};
