import React, {Component} from 'react'
import Shelf from './Shelf'
import {Link} from 'react-router-dom'

let currentlyReadingBooks= [];
let wantToReadBooks = [];
let readBooks = [];
class MainPage extends Component {
   

    render() {
        currentlyReadingBooks= [];
        wantToReadBooks = [];
        readBooks = [];

        this.props.books.forEach(book => {
            if (book.shelf === 'currentlyReading') {
                currentlyReadingBooks.push(book)
            }else if (book.shelf === 'wantToRead') {
                wantToReadBooks.push(book)
            }else if (book.shelf === 'read') {
                readBooks.push(book)
            }
        });

        return (
            <div className="list-books">
                <div className="list-books-content">
                    <div className="list-books-title">
                        <h1>MyReads</h1>
                    </div>
                    
                    {currentlyReadingBooks.length > 0 && <Shelf
                        books = {currentlyReadingBooks}
                        shelf_name='Currently Reading'
                        onSelectChange={this.props.onSelectChange}
                        />  }
                     
                    {wantToReadBooks.length > 0 && <Shelf
                        books = {wantToReadBooks}
                        shelf_name='Want To Read'
                        onSelectChange={this.props.onSelectChange}
                        />  }

                    {readBooks.length > 0 && <Shelf
                        books = {readBooks}
                        shelf_name='Read'
                        onSelectChange={this.props.onSelectChange}
                    /> }

                    <Link 
                        className='open-search'
                        to='/search' >
                        <button >Add a book</button>
                    </Link>

                </div>
            </div>
        )
    }


}

export default MainPage;