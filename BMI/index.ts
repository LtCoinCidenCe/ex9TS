import express from 'express';
import { calculateBmi, calculateExercises } from './myModule';

const app=express();
app.use(express.json());

app.get('/hello', (_request, response) => {
  return response.send('Hello Full Stack!');
});

app.get('/bmi', (request, response) =>
{
  const weight = Number(request.query.weight);
  const height = Number(request.query.height);
  if (!isNaN(weight) && !isNaN(height))
  {
    const words = calculateBmi(height, weight);
    return response.json({
      weight: weight,
      height: height,
      bmi: words
    });
  }
  else
    return response.status(401).json({
      error: "malformatted parameters"
    });
});

app.post('/exercises', (request, response) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
  const daily_exercises: Array<number> = request.body.daily_exercises;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
  const target: number = request.body.target;
  if (daily_exercises && target)
  {
    if (!isNaN(target))
      if (Array.isArray(daily_exercises) && daily_exercises.length > 0 && daily_exercises.every(a => !isNaN(a)))
        return response.json(calculateExercises(daily_exercises, target)); // bingo
    return response.status(401).json({ error: "malformatted parameters" }); // take charge of two ifs above
  }
  else return response.status(401).json({ error: "parameters missing" });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
