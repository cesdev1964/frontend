import CarouselItem from "./CoroulItem"

export const TextSlice = ({text}) => {
  
  return(<>
    <div className="corousel-container">
      <div className="coriusel-track">
        <CarouselItem name={text}/>
      </div>
    </div>
  </>)
}