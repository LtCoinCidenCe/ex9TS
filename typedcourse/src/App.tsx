import React from 'react';

interface course {
  name: string;
  exerciseCount: number;
}

const Header = ({ courseName }: { courseName: string }) => {
  return <h1>{courseName}</h1>
};

const Content = ({ courseParts }: { courseParts: Array<course>}) => {
  return <div>
    {courseParts.map((part) => <p key={part.name}>{part.name} {part.exerciseCount}</p>)}
  </div>
}

const Total = ({ courseParts }: { courseParts: Array<course>}) => {
  return <p>
    Number of exercises {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>
};

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;
