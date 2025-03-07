import Hero from "@/components/Hero";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import Image from "next/image";




export default async function Home() {

  const products = await getAllProducts();
  console.log(products)
  return (
    
    
      <Hero />
      
    
  );
}
