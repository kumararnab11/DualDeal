import { useState } from 'react';
import './App.css';
import axios from 'axios';
import Spinner from './spinner';
import ProductCard from './ProductCard';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchQueryFlipkart, setSearchQueryFlipkart] = useState('');
  const [searchQueryAmazon, setSearchQueryAmazon] = useState('');
  const [amazonData, setAmazonData] = useState(null);
  const [flipkartData, setFlipkartData] = useState(null);
  const [error, setError] = useState(null);
  const[flipkartSpinner,setFlipkartSpinner]=useState(0);
  const[amazonSpinner,setAmazonSpinner]=useState(0);

  const fetchData = async (query) => {
    setError(null);
    setAmazonSpinner(1);
    setFlipkartSpinner(1);
    try {   
      // Amazon request
      const amazonResponse = await axios.request({
        method: 'GET',
        url: 'https://real-time-amazon-data.p.rapidapi.com/search',
        params: {
          query: query,
          country: 'IN'
        },
        headers: {
          'x-rapidapi-key': '87d82363c0mshc3a88e5a6b23b40p14c042jsnc480398bb9ff',
          'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com'
        }
      });
      console.log('Amazon Response:', amazonResponse.data);
      setAmazonData(amazonResponse.data.data.products);

      // Flipkart request
      const flipkartResponse = await axios.request({
        method: 'GET',
        url: 'https://real-time-flipkart-api.p.rapidapi.com/product-search',
        params: {
          q: query,
        },
        headers: {
          'x-rapidapi-key': '87d82363c0mshc3a88e5a6b23b40p14c042jsnc480398bb9ff',
          'x-rapidapi-host': 'real-time-flipkart-api.p.rapidapi.com'
        }
      });
      console.log('Flipkart Response:', flipkartResponse.data);
      setFlipkartData(flipkartResponse.data.products);

    } catch (error) {
      console.error('Error fetching data:', error);
      setError(`Error: ${error.response ? error.response.data.message : error.message}`);
    } finally {
      setAmazonSpinner(0);
      setFlipkartSpinner(0);
    }
  };


  const fetchDataAmazon = async (query) => {
    setError(null);
    setAmazonSpinner(1);
    try {
      // Amazon request
      const amazonResponse = await axios.request({
        method: 'GET',
        url: 'https://real-time-amazon-data.p.rapidapi.com/search',
        params: {
          query: query,
          country: 'IN'
        },
        headers: {
          'x-rapidapi-key': '87d82363c0mshc3a88e5a6b23b40p14c042jsnc480398bb9ff',
          'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com'
        }
      });
      console.log('Amazon Response:', amazonResponse.data);
      setAmazonData(amazonResponse.data.data.products);
    }
    catch (error) {
      console.error('Error fetching data:', error);
      setError(`Error: ${error.response ? error.response.data.message : error.message}`);
    } finally {
      setAmazonSpinner(0);
      setFlipkartSpinner(0);
    }
  };



  const fetchDataFlipkart = async (query) => {
    setError(null);
    setFlipkartSpinner(1);
    try {
      const flipkartResponse = await axios.request({
        method: 'GET',
        url: 'https://real-time-flipkart-api.p.rapidapi.com/product-search',
        params: {
          q: query,
        },
        headers: {
          'x-rapidapi-key': '87d82363c0mshc3a88e5a6b23b40p14c042jsnc480398bb9ff',
          'x-rapidapi-host': 'real-time-flipkart-api.p.rapidapi.com'
        }
      });
      console.log('Flipkart Response:', flipkartResponse.data);
      setFlipkartData(flipkartResponse.data.products);

    } catch (error) {
      console.error('Error fetching data:', error);
      setError(`Error: ${error.response ? error.response.data.message : error.message}`);
    } finally {
      setAmazonSpinner(0);
      setFlipkartSpinner(0);
    }
  };

  const handleSearch = () => {
    if (searchQuery) {
      fetchData(searchQuery);
    }
  };

  const handleSearchAmazon = () => {
    if(searchQueryAmazon){
      fetchDataAmazon(searchQueryAmazon)
    }
  }

  const handleSearchFlipkart = () => {
    if(searchQueryAmazon){
      fetchDataFlipkart(searchQueryFlipkart)
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Product Search</h1>
      <div className="flex justify-center mb-4">
        <input 
          type="text" 
          className="border border-gray-300 p-2 rounded-l-md w-2/3" 
          value={searchQuery} 
          onChange={
            (e) =>{
              setSearchQuery(e.target.value);
              setSearchQueryFlipkart(e.target.value)
              setSearchQueryAmazon(e.target.value)
            }
          } 
          placeholder="Enter product name..." 
        />
        <button 
          onClick={handleSearch} 
          className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        <div>
          <div>
          <input 
          type="text" 
          className="border border-gray-300 p-2 rounded-l-md w-1/3" 
          value={searchQueryFlipkart} 
          onChange={(e) => setSearchQueryFlipkart(e.target.value)} 
          placeholder="Search in Flipkart" 
        />
        <button 
          onClick={handleSearchFlipkart} 
          className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600"
        >
          Search
        </button>
          </div>
          <h2 className="text-2xl font-semibold">Flipkart Results:</h2>
          {flipkartSpinner ? (
            <Spinner />
          ) : (
            flipkartData && flipkartData.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 mt-4">
                {flipkartData.slice(0, 15).map((item, index) => (
                  <ProductCard key={index} product={item} company='Flipkart'/>
                ))}
              </div>
            ) : (
              <p>No Flipkart results found.</p>
            )
          )}
        </div>

        <div>
          <div>
            <input 
            type="text" 
            className="border border-gray-300 p-2 rounded-l-md w-1/3" 
            value={searchQueryAmazon} 
            onChange={(e) => setSearchQueryAmazon(e.target.value)} 
            placeholder="Search in Amazon" 
            />
            <button 
              onClick={handleSearchAmazon} 
              className="bg-violet-600 text-white p-2 rounded-r-md hover:bg-violet-700"
            >
              Search
            </button>
          </div>
          <h2 className="text-2xl font-semibold">Amazon Results:</h2>
          {(amazonSpinner==1)?(<Spinner/>):(amazonData && amazonData.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 mt-4">
              {amazonData.slice(0, 15).map((item, index) => (
                <ProductCard key={index} product={item} company='Amazon'/>
              ))}
            </div>
          ) : (
            <p>No Amazon results found.</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
