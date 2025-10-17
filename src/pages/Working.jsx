import { useState} from "react";
import TestCom from "../components/TestComponent";
import { useTitle } from "../hooks/useTitle";

const Working = ({ title }) => {
    useTitle(title);
    const [item,setItem] = useState()
    
    
  return (
    <>
    <div className="container">
                <h2>Hello {title}!!!</h2>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
                    accusamus praesentium commodi, similique earum quidem quaerat, odio
                    fugiat tempora laudantium doloribus voluptatem sit debitis enim
                    harum expedita pariatur architecto ratione.
                </p>
                </div>
                <div className="container">
                <h2>Hello CES!!!</h2>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
                    accusamus praesentium commodi, similique earum quidem quaerat, odio
                    fugiat tempora laudantium doloribus voluptatem sit debitis enim
                    harum expedita pariatur architecto ratione.
                </p>
                </div>
                <div className="container">
                <h2>Hello CES!!!</h2>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
                    accusamus praesentium commodi, similique earum quidem quaerat, odio
                    fugiat tempora laudantium doloribus voluptatem sit debitis enim
                    harum expedita pariatur architecto ratione.
                </p>
                </div>
                 
                
    </>
  );
};

export default Working;
