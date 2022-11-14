import data from './tempdata';

function App() {
  return (
    <div>
      <header>
        <a href="/">Shop ban hang</a>
      </header>
      <main>
        <h1>Products</h1>
        <div className="products">
          {data.product.map((product) => (
            <div className="product" key={product.slug}>
              <a href={`/product/${product.slug}`}>
                <img src={product.image} alt={product.name}></img>
              </a>
              <div className="product-infor">
                <p>{product.name}</p>
                <p>VND {product.price}</p>
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
