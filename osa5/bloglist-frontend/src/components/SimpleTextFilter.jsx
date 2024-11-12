import { Form } from 'react-bootstrap'

const SimpleTextFilter = ({ data, setData, filterLabel, filterField }) => {
  
  const handleFilterChange = (e) => {
    const filtered = [...data].filter(element => {
      const fval = filterField ? element[filterField] : element
      return fval.toLowerCase().includes(e.target.value.toLowerCase())
    })
    setData(filtered)
  }

  return (
    <Form.Group>
      <Form.Control id='asd' type="text" placeholder={`Filter ${filterLabel}...`} onChange={handleFilterChange}/>
    </Form.Group>
  )
}

export default SimpleTextFilter