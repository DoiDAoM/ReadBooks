import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Shelf from './Shelf'
import BookListItem from './BookListItem'

let currentlyReadingBooks= [];
let wantToReadBooks = [];
let readBooks = [];
let noneBooks = [];

class SearchPage extends Component {

  constructor(props){
    super(props);
    this.state = {
       searchedBooks: []
    };
  }

  updateQuery = (query) => {

      BooksAPI
      .search(query)
      .then((result) => {
        if(typeof result === 'undefined' ) {
          this.setState({
            searchedBooks: this.props.shelfBooks,
          })
        } else {
          this.setState({
            searchedBooks: result,
          })   
        }
       
      })
  }

  getBooksWithShelves = () => {
    const { shelfBooks } = this.props
    const { searchedBooks } = this.state

    let books = [];
    let isInShelf = false;

    if(searchedBooks.length > 0) {
      const newSearchedBooks = [...searchedBooks];

      newSearchedBooks.forEach((searchedBook, index) => {
        isInShelf = false;
        shelfBooks.forEach(shelfBook => {
          if(shelfBook.id === searchedBook.id) {
            isInShelf = true;
            books.push(shelfBook)
            return;
          }
        });
        if(!isInShelf) {
          searchedBook.shelf = 'none'
          books.push(searchedBook)
        }
      });

    }
    return books;
  }

  render() {
    currentlyReadingBooks= [];
    wantToReadBooks = [];
    readBooks = [];
    noneBooks = [];

    let mBooks = this.getBooksWithShelves();

    mBooks.forEach(book => {
      if (book.shelf === 'currentlyReading') {
        currentlyReadingBooks.push(book)
      }else if (book.shelf === 'wantToRead') {
        wantToReadBooks.push(book)
      }else if (book.shelf === 'read') {
        readBooks.push(book)
      }else if (book.shelf === 'none') {
        noneBooks.push(book)
    }
    });

    let noneBookItems = noneBooks.map((noneBook) => {
      return (
        <BookListItem
            key = {noneBook.id}
            book = {noneBook}
            onSelectChange = {this.props.onSelectChange}
        />
      )
    })

    return (
        <div className="search-books">
        <div className="search-books-bar">
        <Link
        to='/'><button className="close-search">Close</button> </Link>
          
          <div className="search-books-input-wrapper">
            
            <input type="text" placeholder="Search by title or author" onChange={(event) => this.updateQuery(event.target.value)}/>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {noneBookItems}
          </ol>
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

      </div>
    )
  }


}

export default SearchPage;