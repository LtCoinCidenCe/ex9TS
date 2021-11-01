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
    trainingDays: dailyHours.filter(a => a > 0).length,
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

const parseHours = (): { target: number, days: Array<number> } => {
  if (process.argv.length < 4) throw new Error('Not enough arguments');
  let allHours=[];
  for (let i = 2; i < process.argv.length; i++) {
    const parameter = process.argv[i];
    if (!isNaN(Number(parameter)))
      allHours.push(Number(parameter));
    else
      throw new Error('Provided values were not numbers!');
  }
  return { target: allHours[0], days: allHours.slice(1) };
}

try {
  const { target, days } = parseHours();
  console.log(calculateExercises(days, target));
}
catch (error: unknown) {
  let errorMessage = '';
  if (error instanceof Error) {
    errorMessage = ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
