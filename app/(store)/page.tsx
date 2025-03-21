
import Hero from "@/components/Hero";
import ProductsView from "@/components/ProductsView";
import SaleBanner from "@/components/SaleBanner";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";




export default async function Home() {

  const products = await getAllProducts();

  // now fetching all the category 
  const categories = await getAllCategories();
  
  return (
    <div className=" ">
      <Hero/> 
      <div className=" bg-black">
        <SaleBanner/>
      </div>
      

<div className='  p-10 '>
  <ProductsView products={products} categories={categories} />

  
</div>




    </div>
    
      
      
    
  );
}
