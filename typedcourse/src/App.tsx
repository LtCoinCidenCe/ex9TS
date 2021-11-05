import React from 'react';

// new types
interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CoursePartWithDesc extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CoursePartWithDesc {
  type: "normal";
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartWithDesc {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartWithDesc {
  type: "special";
  requirements: string[];
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;










const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Header = ({ courseName }: { courseName: string }) => {
  return <h1>{courseName}</h1>
};

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.type) {
    case "normal":
      return <div style={{ margin: "1em 0" }}>
        <div style={{ fontWeight: "bold" }}>{part.name} {part.exerciseCount}</div>
        <div style={{ fontStyle: "italic" }}>{part.description}</div>
      </div>
    case "groupProject":
      return <div style={{ margin: "1em 0" }}>
        <div style={{ fontWeight: "bold" }}>{part.name} {part.exerciseCount}</div>
        <div>project exercises {part.groupProjectCount}</div>
      </div>
    case "submission":
      return <div style={{ margin: "1em 0" }}>
        <div style={{ fontWeight: "bold" }}>{part.name} {part.exerciseCount}</div>
        <div style={{ fontStyle: "italic" }}>{part.description}</div>
        <div>submit to {part.exerciseSubmissionLink}</div>
      </div>
    case "special":
      return <div style={{ margin: "1em 0" }}>
        <div style={{ fontWeight: "bold" }}>{part.name} {part.exerciseCount}</div>
        <div style={{ fontStyle: "italic" }}>{part.description}</div>
        <div>required skills: {part.requirements.join(',')}</div>
      </div>
    default:
      return assertNever(part);
  }
}

const Content = ({ courseParts }: { courseParts: Array<CoursePart>}) => {
  return <div>
    {courseParts.map((part) => <Part key={part.name} part={part} />)}
  </div>
}

const Total = ({ courseParts }: { courseParts: Array<CoursePart>}) => {
  return <p>
    Number of exercises {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>
};

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
    }
  ]

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;
