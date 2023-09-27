import bcrypt from 'bcryptjs';
const data = {
  links: [
    {
      name: 'Home',
      url: '/',
      alt: '',
      icon: '',
      target: '_blank',
      type: 'navbar',
    },
    {
      name: 'Hot',
      url: '/hot',
      alt: '',
      icon: '',
      target: '_blank',
      type: 'navbar',
    },
    {
      name: 'Incomming',
      url: '/incomming',
      alt: '',
      icon: '',
      target: '_blank',
      type: 'navbar',
    },
    {
      name: 'Blog',
      url: '/blog',
      alt: '',
      icon: '',
      target: '_blank',
      type: 'navbar',
    },
    {
      name: 'About Us',
      url: '/aboutus',
      alt: '',
      icon: '',
      target: '_blank',
      type: 'navbar',
    },
  ],
  users: [
    {
      username: 'booklover',
      email: 'booklover@gmail.com',
      password: bcrypt.hashSync('booklover'),
    },
    {
      username: 'admin',
      email: 'admin',
      password: bcrypt.hashSync('admin'),
    },
  ],
  books: [
    {
      name: 'Hành Tinh Của Một Kẻ Nghĩ Nhiều',
      type: '',
      slug: 'book-1',
      PublishYear: '2022',
      author: 'Nguyễn Đoàn Minh Thư',
      image: '/imgs/n.jpg',
      price: '1000',
      countInStock: 10,
      numPage: 200,
      rating: 3,
      numRev: 10,
      des: 'Good stuff',
      caterories: [
        { name: 'Tam ly', order: 1 },
        { name: 'Vien tuong', order: 2 },
      ],
    },
    {
      name: 'Nhà Giả Kim (Tái Bản 2020)',
      type: '',
      slug: 'book-2',
      PublishYear: '2022',
      author: 'Nguyễn Đoàn Minh Thư',
      image: '/imgs/n1.webp',
      price: '1000',
      countInStock: 10,
      numPage: 200,
      rating: 5,
      numRev: 10,
      des: 'Good stuff',
      caterories: [
        { name: 'Tam ly', order: 1 },
        { name: 'Ton giao', order: 3 },
      ],
    },
    {
      name: 'Thư Viện Nửa Đêm',
      type: '',
      slug: 'book-3',
      PublishYear: '2022',
      author: 'Nguyễn Đoàn Minh Thư',
      image: '/imgs/n2.webp',
      price: '400000',
      countInStock: 10,
      numPage: 200,
      rating: 1,
      numRev: 10,
      des: 'Good stuff',
      caterories: [
        { name: 'Tam ly', order: 1 },
        { name: 'Trinh tham', order: 4 },
      ],
    },
    {
      name: 'Cân bằng cảm xúc cả lúc bão giông',
      type: '',
      slug: 'book-4',
      PublishYear: '2022',
      author: 'Nguyễn Đoàn Minh Thư',
      image:
        'https://book365.vn/upload/resize_cache/iblock/2bd/570_490_1/2bd9969831f3589e1859d14b5ec7bd17.jpeg',
      price: '1000000',
      countInStock: 10,
      numPage: 200,
      rating: 1,
      numRev: 10,
      des: 'Good stuff',
      caterories: [{ name: 'Tam ly', order: 1 }],
    },
    {
      name: 'Người Giàu Có Nhất Thành Babylon',
      type: '',
      slug: 'book-5',
      PublishYear: '2022',
      author: 'Nguyễn Đoàn Minh Thư',
      image:
        'https://book365.vn/upload/resize_cache/iblock/6d7/570_490_1/6d7fac801463e9c2d998754e77890e3a.jpeg',
      price: '200000',
      countInStock: 10,
      numPage: 200,
      rating: 1,
      numRev: 10,
      des: 'Good stuff',
      caterories: [
        { name: 'Tam ly', order: 1 },
        { name: 'Lich su', order: 5 },
      ],
    },
    {
      name: 'Percy Jackson and the Olympians: The Chalice of the Gods',
      type: '',
      slug: 'book-6',
      PublishYear: '2022',
      author: 'Rick Riordan',
      description: `The original heroes from The Lightning Thief are reunited for their biggest challenge yet: getting Percy to college when the gods are standing in his way.

      After saving the world multiple times, Percy Jackson is hoping to have a normal senior year. Unfortunately, the gods aren’t quite done with him. Percy will have to fulfill three quests in order to get the necessary three letters of recommendation from Mount Olympus for college. 
      
      The first quest is to help Zeus’s cup-bearer retrieve his goblet before it falls into the wrong hands. Can Percy, Grover, and Annabeth find it in time? 
      
      Readers new to Percy Jackson (this book can be enjoyed as a standalone) and fans who have been awaiting this reunion for more than a decade will delight equally in this latest hilarious take on Greek mythology.`,
      image:
        'https://book365.vn/upload/resize_cache/iblock/6d7/570_490_1/6d7fac801463e9c2d998754e77890e3a.jpeg',
      price: '2000000',
      countInStock: 20,
      numPage: 200,
      rating: 5,
      numRev: 10,
      des: 'Good stuff',
      caterories: [
        { name: 'Child book', order: 6 },
        { name: 'Fantasy', order: 7 },
      ],
    },

    {
      name: 'The Great Hunt (Wheel of Time, 2) ',
      type: '',
      slug: 'book-7',
      PublishYear: '2022',
      author: 'Robert Jordan',
      description: `The Wheel of Time is now an original series on Prime Video, starring Rosamund Pike as Moiraine!

      In The Great Hunt, the second novel in Robert Jordan’s #1 New York Times bestselling epic fantasy series, The Wheel of Time®, Rand al’Thor and his companions set out to retrieve a powerful artifact from The Dark One’s Shadowspawn.
      
      For centuries, gleemen have told the tales of The Great Hunt of the Horn. So many tales about each of the Hunters, and so many Hunters to tell of...`,
      image: 'https://m.media-amazon.com/images/I/91doczWVrOL._SL1500_.jpg',
      price: '140000',
      countInStock: 20,
      numPage: 300,
      rating: 4,
      numRev: 10,
      des: 'Good stuff',
      caterories: [
        { name: 'Adventure', order: 8 },
        { name: 'Fantasy', order: 7 },
      ],
    },
    {
      name: 'Holly',
      type: '',
      slug: 'book-8',
      PublishYear: '2022',
      author: 'Stephen King',
      description: `Holly Gibney, one of Stephen King’s most compelling and ingeniously resourceful characters, returns in this thrilling novel to solve the gruesome truth behind multiple disappearances in a midwestern town.

      “Sometimes the universe throws you a rope.” —BILL HODGES`,
      image: 'https://m.media-amazon.com/images/I/815oQ6G6HDL._SL1500_.jpg',
      price: '1200000',
      countInStock: 20,
      numPage: 200,
      rating: 4,
      numRev: 10,
      des: 'Good stuff',
      caterories: [
        { name: 'Adventure', order: 8 },
        { name: 'Fantasy', order: 7 },
      ],
    },
  ],
};
export default data;
