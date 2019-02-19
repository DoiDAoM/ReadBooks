import React from 'react'
function BookListItem(props) {
    let isThumbnailExist = true;
    if (typeof props.book.imageLinks === 'undefined') {
        isThumbnailExist = false;
    } 

    return (     
        <li>
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" 
                        style={{ width: 128, height: 193, backgroundImage: isThumbnailExist ? `url(${props.book.imageLinks.thumbnail})` : null}}>
                    </div>
                    <div className="book-shelf-changer">
                    <select 
                        defaultValue={props.book.shelf} 
                        onChange={(event) => props.onSelectChange(event, props.book)}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                    </div>
                </div>
                <div className="book-title">{props.book.title}</div>
                <div className="book-authors">{props.book.authors !== undefined ? props.book.authors : 'No Author'}</div>
            </div>
        </li>
    )
}

export default BookListItem