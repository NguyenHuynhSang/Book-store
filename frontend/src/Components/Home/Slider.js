const Slider = () => {
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
          <a className="btn">Xem ngay</a>
        </div>
        <div className=" book-slider">
          <div className="swiper-wrapper"></div>

          <img src="assets/image/bstand.png" className="stand" alt=""></img>
          <div className="swiper-pagination"></div>
        </div>
      </div>
    </section>
  );
};
export default Slider;
