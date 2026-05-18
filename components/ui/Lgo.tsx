import Image from "next/image";






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
        <div>
            <Image src="/imgs/logos.svg" alt="logo" width={width || 200} height={height || 200}/>
        </div>    
    )
}; export default Logo;