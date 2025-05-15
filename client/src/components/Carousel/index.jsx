import { Children, useEffect, useRef, useState } from 'react';
import styles from './Carousel.module.css';

const Carousel = ({ children }) => {

    const [ activeIndex, setActiveIndex ] = useState(0);
    const [ isHovering, setIsHovering ] = useState(false);
    const autoPlayRef = useRef(null);
    const childrenArray = Children.toArray(children);
    const childCount = childrenArray['length'];

    const nextSlide = () => {
        setActiveIndex((prev) => (prev === childCount - 1 ? 0 : prev + 1));
    }

    const prevSlide = () => {
        setActiveIndex((prev) => (prev === 0 ? childCount - 1 : prev - 1));
    }

    const goToSlide = () => {
        setActiveIndex(index);
    }

    useEffect(() => {
        if (!isHovering && childCount > 1) {
            autoPlayRef['current'] = setInterval(nextSlide, 5000);
        }
        return () => {
            if (autoPlayRef['current']) clearInterval(autoPlayRef['current'])
        }
    }, [ isHovering, childCount ]);

    if (childCount === 0) return null;

    if (childCount === 1) return <div className={ styles['carousel'] }>{ children }</div>;

    return (
        <>
            {/* TODO: Implement Carousel for multiple elements, current implementation only supports one element as of this moment. */}
            { children }
        </>
    );
};

export default Carousel;
