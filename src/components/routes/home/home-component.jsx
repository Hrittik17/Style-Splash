import React from 'react'
// import { Routes,Route} from 'react-router-dom';
import { Outlet } from 'react-router-dom';
// import CategoryItem from './components/category-item/categories-item';
import DirectoryItem from '../../directory/directory-component';
import '../../directory-item/directory-item-styles.scss';

const Home = () => {
  const categories = [
    {
      id: 1,
      title: 'Hats',
      imageUrl: "https://i.ibb.co/cvpntL1/hats.png",
    },
    {
      id: 2,
      title: 'Sneakers',
      imageUrl: "https://i.ibb.co/px2tCc3/jackets.png",
    },
    {
      id: 3,
      title: 'Womens',
      imageUrl: "https://i.ibb.co/0jqHpnp/sneakers.png",
    },
    {
      id: 4,
      title: 'Mans',
      imageUrl: "https://i.ibb.co/GCCdy8t/womens.png",
    },
    {
      id: 5,
      title: 'Jackets',
      imageUrl: "https://i.ibb.co/R70vBrQ/men.png",
    },
  ]
  return (
    <div>
      <DirectoryItem categories={categories} />
      <Outlet />
    </div>
  );
}

export default Home

