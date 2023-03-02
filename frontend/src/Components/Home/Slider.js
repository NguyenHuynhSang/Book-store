import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import { useEffect, useReducer } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const Slider = () => {
  const reducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_REQ':
        return { ...state, loading: true };
      case 'FETCH_SUCCESS':
        return { ...state, books: action.payload, loading: false };
      case 'FETCH_FAIL':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  const [{ loading, error, books }, dispatch] = useReducer(reducer, {
    books: [],
    loading: true,
    error: '',
  });
  // const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQ' });
      try {
        const result = await axios.get('api/books');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });

        // setBooks(result.data);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, []);

  return (
    <section className="home" id="home">
      <div className="row">
        <div className="content">
          <h3>ĐIỂM TIN SÁCH</h3>
          <p>
            Nhiều chương trình ưu đãi sốc từ các nhà sách trên sàn TMĐT Đừng bỏ
            lỡ các chương trình ưu đãi rất hấp dẫn với hơn 40.000 đầu sách được
            ưu đãi đến 40% trong tháng 9 này trên các sàn TMĐT từ các nhà sách
            và nhà xuất bản lớn
          </p>
          <Link className="btn">Xem ngay</Link>
        </div>

        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={3}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          //   navigation
        >
          {books.map((x, index) => (
            <SwiperSlide key={x._id} virtualIndex={index}>
              <Link className="swiper-slider" to={`/book/${x.slug}`}>
                <img src={x.image} alt="" />
              </Link>
            </SwiperSlide>
          ))}
          <img src="assets/image/bstand.png" className="stand" alt="" />
          <img
            src={require('../../Asset/image/bstand.png')}
            className="stand"
            alt=""
          />
        </Swiper>
      </div>
    </section>
  );
};
export default Slider;
