const Filter = ( {setSearchTerm} ) => {

  const filterHandler = (event) => {
    setSearchTerm(event.target.value.toLowerCase())
  }
  /*const filterHandler = (event) => {
    setFiltered(countries.filter(c => (
      c.name.common.toLowerCase().includes(event.target.value.toLowerCase())
    )))
  }*/

  return (
    <div>
      find countries <input onChange={filterHandler}></input>
    </div>
  )
}

export default Filter