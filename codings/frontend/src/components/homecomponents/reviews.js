"use client";

import { useEffect, useRef } from "react";
import { Star } from "lucide-react";

export default function ReviewSlider() {
  const sliderRef = useRef(null);
  const sliderInnerRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    const sliderInner = sliderInnerRef.current;

    if (!slider || !sliderInner) return;

    // Clone the slider content for seamless looping
    const clone = sliderInner.cloneNode(true);
    slider.appendChild(clone);

    let animationId;
    let startTime = null;
    const duration = 60000; // 60 seconds for one complete loop

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = (elapsed % duration) / duration;

      if (slider) {
        const translateX = -progress * sliderInner.clientWidth;
        slider.style.transform = `translateX(${translateX}px)`;
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      date: "2 months ago",
      text: "Coding Sharks transformed my career! Their project-based curriculum helped me land a job as a frontend developer within 3 months of completing the course.",
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      date: "1 month ago",
      text: "The personalized mentorship at Coding Sharks made all the difference. I tried other coding bootcamps before, but none provided the level of support.",
    },
    {
      id: 3,
      name: "Jessica Williams",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4,
      date: "3 months ago",
      text: "As someone with zero coding experience, I was nervous about starting this journey. Coding Sharks made the learning process approachable and fun.",
    },
    {
      id: 4,
      name: "David Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      date: "2 weeks ago",
      text: "The job placement assistance was exceptional. They helped me polish my portfolio, prepare for technical interviews, and connected me with their industry partners.",
    },
    {
      id: 5,
      name: "Emily Patel",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      date: "1 week ago",
      text: "The community aspect of Coding Sharks sets them apart. Even after graduating, I'm still connected with my cohort and instructors.",
    },
    {
      id: 6,
      name: "Alex Thompson",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4,
      date: "4 months ago",
      text: "Their curriculum stays current with industry trends. I learned the latest frameworks and tools that employers are actually looking for.",
    },
    {
      id: 7,
      name: "Olivia Martinez",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      date: "3 weeks ago",
      text: "The flexible schedule allowed me to keep my full-time job while learning to code. The instructors were always available for questions.",
    },
    {
      id: 8,
      name: "Ryan Kim",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      date: "2 months ago",
      text: "I researched many coding bootcamps before choosing Coding Sharks. Their focus on practical skills and portfolio development made them stand out.",
    },
  ];

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-gray-200 text-gray-200"
          }`}
        />
      ));
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-800">
            What Our Alumni Say About Us
          </h2>
          <p className="text-xl text-gray-600">
            Why Students Choose Coding Sharks
          </p>
        </div>

        <div className="overflow-hidden relative w-full">
          {/* This is the outer container that clips the content */}
          <div
            ref={sliderRef}
            className="flex whitespace-nowrap"
            style={{ willChange: "transform" }}
          >
            {/* This is the inner container that gets duplicated */}
            <div ref={sliderInnerRef} className="flex flex-row flex-nowrap">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="inline-block flex-none w-[300px] mx-3 bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-center mb-4">
                    <div className="relative">
                      <img
                        src={review.avatar || "/placeholder.svg"}
                        alt={`${review.name}'s avatar`}
                        width="48"
                        height="48"
                        className="rounded-full mr-3 border-2 border-blue-100"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1 w-4 h-4 flex items-center justify-center">
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M20 6L9 17L4 12"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {review.name}
                      </h4>
                      <div className="flex items-center gap-1 mt-1">
                        {renderStars(review.rating)}
                        <span className="text-xs text-gray-500 ml-2">
                          {review.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {review.text}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <svg
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        className="text-blue-500"
                      >
                        <path
                          fill="currentColor"
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"
                        />
                      </svg>
                      <span className="text-xs font-medium text-blue-500">
                        Verified
                      </span>
                    </div>
                    <div className="flex items-center">
                      <img
                        src="/placeholder.svg?height=20&width=60"
                        alt="Google"
                        className="h-4"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gradient overlays for better visual effect */}
          <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10"></div>
        </div>
      </div>
    </section>
  );
}
