import React from 'react'
import BookListItem from './BookListItem'

function Shelf(props) {
    let books = props.books.map((book) => {
        return (
            <BookListItem
                key = {book.id}
                book = {book}
                onSelectChange = {props.onSelectChange}
            />
        )
    })

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{props.shelf_name}</h2>
            <div className="bookshelf-books">
            <ol className="books-grid">
                {books}
            </ol>
            </div>
        </div>
    )

}

export default Shelf;