import React from 'react';
import { MdSearch, MdOutlineClear } from 'react-icons/md';

const Search = ({ placeholder, onHandlerChange, onHandlerBlur, defaultValue, onHandlerClearRepoText }) => {

    const onChange = (e) => {
        console.log(100);
        onHandlerChange(e.target.value);
    }

    const onBlur = (e) => {
        console.log(200);
        onHandlerBlur();
    }

    const onClickHandler = () => {
        console.log(300);
        onHandlerClearRepoText();
    }

    return (
        <div className='search'>
            <MdSearch className='search-icons' size='1.3em' />
            <input type='text'
                placeholder={placeholder}
                onChange={onChange}
                onClick={onBlur} 
                defaultValue={defaultValue} 
                autoFocus={true}/>
            <button
                className="btn"
                onClick={onBlur}
            >Lookup</button>
            {/* <MdOutlineClear className='search-icons' size='1.3em' onClick={onClickHandler} /> */}
        </div>
    )
}

export default Search;