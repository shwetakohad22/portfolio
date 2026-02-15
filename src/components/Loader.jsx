import { motion, useAnimate } from "framer-motion";
import { useEffect, useState } from "react";

const Loader = ({ onComplete }) => {
    const [count, setCount] = useState(0);
    const [scope, animate] = useAnimate();

    useEffect(() => {
        // Counter Animation
        const duration = 2000; // 2 seconds for counter
        const startTime = Date.now();

        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing for the counter (optional, but looks nice)
            const easeOutQuad = (t) => t * (2 - t);
            const currentCount = Math.floor(easeOutQuad(progress) * 100);

            setCount(currentCount);

            if (progress >= 1) {
                clearInterval(interval);
                setTimeout(() => {
                    onComplete();
                }, 500); // Short delay after 100% before exit
            }
        }, 20);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 flex flex-col items-center justify-center bg-[#121212] text-[#e8e3da]"
            style={{ zIndex: 9999 }}
            initial={{ y: 0 }}
            exit={{
                y: "-100%",
                transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
            }}
        >
            {/* CENTTERED NAME */}
            <div className="z-10 flex flex-col items-center">
                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-6xl md:text-9xl font-black tracking-tighter font-playfair uppercase text-center loading-none"
                    style={{ lineHeight: 0.8 }}
                >
                    PORTFOLIO
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-xl md:text-3xl font-light tracking-[0.3em] font-sans mt-12 uppercase text-white/70"
                >
                    Shweta Kohad
                </motion.div>
            </div>

            {/* COUNTER (Bottom Right) */}
            <div className="absolute bottom-12 right-12 md:right-24 font-mono text-4xl md:text-8xl font-light opacity-80">
                {count}%
            </div>

            {/* STATUS TEXT (Bottom Left) */}
            <div className="absolute bottom-12 left-12 md:left-24 font-mono text-xs md:text-sm tracking-widest uppercase opacity-40">
                Loading Experience...
            </div>
        </motion.div>
    );
};

export default Loader;
