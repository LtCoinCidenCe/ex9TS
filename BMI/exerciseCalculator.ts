interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (dailyHours: Array<number>, target: number): Result => {
  let result = {
    periodLength: dailyHours.length,
    trainingDays: dailyHours.map(a => a > 0).length,
    success: false, // raw
    rating: 0, // raw
    ratingDescription: '', // raw
    target,
    average: dailyHours.reduce((a, b) => a + b) / dailyHours.length
  }
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
}

console.log(calculateExercises([3, 2, 1, 1.5], 4));
console.log(calculateExercises([3, 0, 6, 1, 1.5, 0.25, 3], 3));
console.log(calculateExercises([3, 4, 6, 1, 1.5, 4, 3], 2.5));

