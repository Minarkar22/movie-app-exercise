
const SearchBar = (props) => {
    return (
        <div>
            <input className="search-bar" type="text"
                   placeholder="Search..."
                    value={props.value}
                    onChange={(event)=> props.setSearchValue(event.target.value)}/>
        </div>
    )
}

export default SearchBar;