const Header = ({name}) => {
  return (
    <h1>{name}</h1>
  )
}

const Course = ({course}) => {
  return (
    <>
      <CourseHeader name={course.name}></CourseHeader>
      <Content parts={course.parts}></Content>
    </>
  )
}

const CourseHeader = ({name}) => {
  return (
    <h2>{name}</h2>
  )
}

const Content = ({parts}) => {
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises}></Part>
      ))}
      <Total parts={parts}></Total>
    </>
  )
}

const Part = ({name, exercises}) => {
  return (
    <p>{name} {exercises}</p>
  )
}

const Total = ({parts}) => {
  return (
    <b>total of {parts.reduce((acc, part) => acc + part.exercises, 0)} exercises</b>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <Header name='Web development curriculum'></Header>
      {courses.map((course) =>
        <Course key={course.id} course={course}></Course>
      )}
    </div>
  )
}

export default App