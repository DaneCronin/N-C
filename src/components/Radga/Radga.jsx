import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./Radga.css";

const RadgaHorizontalScroll = () => {
  const sectionRef = useRef(null);
  const slidesContainerRef = useRef(null);
  const slidesRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const slidesContainer = slidesContainerRef.current;
    const slides = slidesRef.current;

    if (!section || !slidesContainer || slides.length === 0) return;

    const totalWidth = slidesContainer.scrollWidth - window.innerWidth;

    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: () => `+=${totalWidth}`,
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true,
      animation: gsap.to(slidesContainer, {
        x: () => -totalWidth,
        ease: "none",
      }),
    });

    slides.forEach((slide, index) => {
      const image = slide.querySelector(".radga-img img");
      if (image) {
        gsap.fromTo(
          image,
          { scale: 1 },
          {
            scale: 1.2,
            ease: "power1.out",
            scrollTrigger: {
              trigger: slide,
              start: "left center",
              end: "left+=200 center",
              scrub: 1,
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }
    });
  }, []);

  return (
    <section ref={sectionRef} className="radga-section">
      <div className="radga-heading">
        <h1>Featured Projects</h1>
      </div>
      <div ref={slidesContainerRef} className="radga-slides">
        {[1, 2, 3, 4, 5].map((num, index) => (
          <div
            ref={(el) => (slidesRef.current[index] = el)}
            key={index}
            className="radga-slide"
          >
            <div className="radga-img-container">
              <div className="radga-img">
                <img src={`./radga/img${num}.jpeg`} alt={`Slide ${num}`} />
              </div>
            </div>
            <div className="radga-middle-texts">
              <span>Text 1</span>
              <span>Text 2</span>
              <span>Text 3</span>
              <span>Text 4</span>
            </div>
            <button className="radga-view-project">View Project</button>
            <div className="radga-title">
              <h1>
                {num === 1 && "Verb Coffee Roasters"}
                {num === 2 && "Yeti Cycles Dust To Dust"}
                {num === 3 && "Abus Security"}
                {num === 4 && "Curved Elements Modern Flow"}
                {num === 5 && "Minimal Design Natural Light"}
              </h1>
              <h2>
                {num === 1 && "Coffee Roasters"}
                {num === 2 && "Cycles Dust"}
                {num === 3 && "Security"}
                {num === 4 && "Modern Flow"}
                {num === 5 && "Natural Light"}
              </h2>
            </div>
            <div className="radga-extra-info">Extra Information Here
              <span>text 2</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RadgaHorizontalScroll;
