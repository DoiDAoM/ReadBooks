import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import MainPage from './MainPage'
import { Route } from 'react-router-dom'
import SearchPage from './SearchPage';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    bookList: [],

    showSearchPage: false
  }

  componentDidMount() {
     BooksAPI
      .getAll()
      .then((result) => {
        this.setState({
          bookList: result,
        })       
      })
  } 
  
  onSelectChange = (event, book) => {
    let shelf = event.target.value
    BooksAPI.update(book, shelf)
    
    let isBooksMatched = false;

    //const newItems = [...this.state.bookList];

    let newBooks = this.state.bookList.map((mBook, index) => {
      if(mBook.id === book.id) {
        isBooksMatched = true
        book.shelf = shelf
        return book;
      } return mBook
    }) 

    if(isBooksMatched) {  
      this.setState(prevState => ({
        bookList: newBooks,
      }))
    }else {
      book.shelf = shelf
      this.setState(currentState => ({
        bookList: [...currentState.bookList, book]
      }))
    }
          
  }

  render() {
    return (
      <div className="app">
          <Route path='/search' render={() => (
                <SearchPage
                  shelfBooks = {this.state.bookList}
                  onSelectChange={this.onSelectChange}
                />
            )} />
       
          <Route exact path='/'
            render={() => (
              <MainPage
                books={this.state.bookList}
                onSelectChange={this.onSelectChange}/> 
            )} />
      </div>
    )
  }
}

export default BooksApp
