const Header = ({ course }) => <h1>{course.name}</h1>;

const Content = ({ course }) => (
  <>
    {course.parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </>
);

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Total = ({ course }) => {
  let sum = course.parts
    .map((part) => part.exercises)
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
  return <p>Total of {sum} exercises</p>;
};

const Course = ({ course }) => (
  <>
    <Header course={course} />
    <Content course={course} />
    <Total course={course} />
  </>
);

export default Course;
