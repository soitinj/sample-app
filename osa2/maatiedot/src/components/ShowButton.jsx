const ShowButton = ({country, setSelected}) => {
    const selectHandler = () => {
        setSelected(country)
    }
    return <button onClick={selectHandler}>show</button>
}

export default ShowButton