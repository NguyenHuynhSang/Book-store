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
      username: 'user1',
      email: 'user1@gmail.com',
      password: bcrypt.hashSync('user1'),
      address: [
        {
          location: '102 Tan Phu, Thu Duc, tp HCM',
          isDefault: true,
          phone: '0123456789',
        },
      ],
    },
    {
      username: 'booker',
      email: 'booker',
      password: bcrypt.hashSync('booker'),
      role: 'admin',
    },
  ],
  authors: [
    {
      name: 'Rick Riordan',
      avatar:
        'https://m.media-amazon.com/images/I/61w3pqVMCZL._SX300_CR0%2C0%2C0%2C0_.jpg',

      infor: `Rick Riordan is the #1 New York Times bestselling author of the Percy Jackson and the Olympians series, the Kane Chronicles, and the Heroes of Olympus. He is also the author of the multi-award-winning Tres Navarre mystery series for adults.

      For fifteen years, Rick taught English and history at public and private middle schools in the San Francisco Bay Area and in Texas. In 2002, Saint Mary's Hall honored him with the school's first Master Teacher Award.
      
      While teaching full time, Riordan began writing mystery novels for grownups. His Tres Navarre series went on to win the top three national awards in the mystery genre - the Edgar, the Anthony and the Shamus. Riordan turned to children's fiction when he started The Lightning Thief as a bedtime story for his oldest son.
      
      Today over 35 million copies of his Percy Jackson, Kane Chronicles, and Heroes of Olympus books are in print in the United States, and rights have been sold into more than 35 countries. Rick is also the author of The 39 Clues: The Maze of Bones, another #1 New York Times bestseller. 
      
      Rick Riordan now writes full-time. He lives in Boston with his wife and two sons.`,
      bookSeed: [5, 8],
      books: [],
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
      rating: 3,
      numPage: 200,
      language: 'VN',
      publishDate: '02/02/2022',
      publisher: 'Ct A',
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
      numPage: 100,
      language: 'VN',
      publishDate: '02/03/2022',
      publisher: 'Ct A',
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
      numPage: 120,
      language: 'VN',
      publishDate: '02/03/2022',
      publisher: 'Ct A',
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
      numPage: 130,
      language: 'VN',
      publishDate: '03/07/2023',
      publisher: 'Ct B',
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
      language: 'VN',
      publishDate: '03/06/2022',
      publisher: 'Ct A',
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
      image: 'https://m.media-amazon.com/images/I/81EwXBeJX+L._SL1500_.jpg',
      price: '2000000',
      countInStock: 20,
      numPage: 300,
      language: 'EN',
      publishDate: '02/02/2022',
      publisher: 'Amazon',
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
      language: 'EN',
      publishDate: '02/02/2012',
      publisher: 'Amazon',
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
      description: `Holly Gibney, one of Stephen King’s most compelling and ingeniously resourceful characters, returns in this thrilling novel to solve the gruesome truth behind multiple disappearances in a midwestern town.

      “Sometimes the universe throws you a rope.” —BILL HODGES`,
      image: 'https://m.media-amazon.com/images/I/815oQ6G6HDL._SL1500_.jpg',
      price: '420000',
      countInStock: 20,
      numPage: 210,
      language: 'EN',
      publishDate: '02/06/2011',
      publisher: 'Amazon',
      rating: 4,
      numRev: 10,
      des: 'Good stuff',
      caterories: [
        { name: 'Adventure', order: 8 },
        { name: 'Fantasy', order: 7 },
      ],
    },
    {
      name: 'Lightning Thief, The (Percy Jackson and the Olympians Book 1)',
      type: '',
      slug: 'book-9',
      PublishYear: '2022',
      description: `Holly Gibney, one of Stephen King’s most compelling and ingeniously resourceful characters, returns in this thrilling novel to solve the gruesome truth behind multiple disappearances in a midwestern town.
      “Sometimes the universe throws you a rope.” —BILL HODGES`,
      image: 'https://m.media-amazon.com/images/I/91Dj5dqydTL._SL1500_.jpg',
      price: '340000',
      countInStock: 20,
      numPage: 210,
      language: 'EN',
      publishDate: '02/06/2011',
      publisher: 'Amazon',
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
