import Image from "next/image";
import Link from "next/link";






const Logo = (
   {
     width,
    height
   }:{
    width?: number,
    height?: number
   }
) => {
    return (
        <Link href={"/"}>
            <Image src="/imgs/logos.svg" alt="logo" width={width || 200} height={height || 200}/>
        </Link>    
    )
}; export default Logo;