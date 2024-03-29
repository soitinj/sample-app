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
      {parts.map((part) =>
        <Part key={part.id} name={part.name} exercises={part.exercises}></Part>
      )}
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

export default Course