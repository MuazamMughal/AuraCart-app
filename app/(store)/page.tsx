
import Hero from "@/components/Hero";
import ProductsView from "@/components/ProductsView";
import SaleBanner from "@/components/SaleBanner";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import Image from "next/image";




export default async function Home() {

  const products = await getAllProducts();

  // now fetching all the category 
  const categories = await getAllCategories();
  
  return (
    <div>
      <Hero/>
      <SaleBanner/>

<div className='text-white'>
  <ProductsView products={products} categories={categories} />

  
</div>



    </div>
    
      
      
    
  );
}
