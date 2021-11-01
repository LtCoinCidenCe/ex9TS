import { calculateExercises } from "./myModule";

const parseHours = (): { target: number, days: Array<number> } => {
  if (process.argv.length < 4) throw new Error('Not enough arguments');
  const allHours=[];
  for (let i = 2; i < process.argv.length; i++) {
    const parameter = process.argv[i];
    if (!isNaN(Number(parameter)))
      allHours.push(Number(parameter));
    else
      throw new Error('Provided values were not numbers!');
  }
  return { target: allHours[0], days: allHours.slice(1) };
};

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
