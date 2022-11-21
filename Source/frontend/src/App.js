import data from './tempdata';

function App() {
  return (
    <div>
      <header>
        <a href="/">Shop ban hang</a>
      </header>
      <main>
        <h1>Products</h1>
        <div className="books">
          {data.books.map((book) => (
            <div className="book" key={book.slug}>
              <a href={`/product/${book.slug}`}>
                <img src={book.image} alt={book.name}></img>
              </a>
              <div className="book-infor">
                <p>{book.name}</p>
                <p>VND {book.price}</p>
                <br></br>
                <button>Mua hang</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
