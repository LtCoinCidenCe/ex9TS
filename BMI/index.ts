import express from 'express';
import { calculateBmi } from './myModule';

const app=express();

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
