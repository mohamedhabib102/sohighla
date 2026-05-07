"use client"
interface ContainerProps{
    children: React.ReactNode;
}
const CustomContainer : React.FC<ContainerProps>  = ({children}) =>{
    return(
        <div className="container mx-auto lg:px-10 md:px-6 px-3">
            {children}
        </div>
    )
}
export default CustomContainer;