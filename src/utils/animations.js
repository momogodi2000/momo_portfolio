// src/utils/animations.js

export const fadeInUp = {
  initial: { 
    opacity: 0, 
    y: 60 
  },
  animate: { 
    opacity: 1, 
    y: 0 
  },
  transition: { 
    duration: 0.6, 
    ease: "easeOut" 
  }
};

export const fadeInDown = {
  initial: { 
    opacity: 0, 
    y: -60 
  },
  animate: { 
    opacity: 1, 
    y: 0 
  },
  transition: { 
    duration: 0.6, 
    ease: "easeOut" 
  }
};

export const fadeInLeft = {
  initial: { 
    opacity: 0, 
    x: -60 
  },
  animate: { 
    opacity: 1, 
    x: 0 
  },
  transition: { 
    duration: 0.6, 
    ease: "easeOut" 
  }
};

export const fadeInRight = {
  initial: { 
    opacity: 0, 
    x: 60 
  },
  animate: { 
    opacity: 1, 
    x: 0 
  },
  transition: { 
    duration: 0.6, 
    ease: "easeOut" 
  }
};

export const scaleIn = {
  initial: { 
    opacity: 0, 
    scale: 0.5 
  },
  animate: { 
    opacity: 1, 
    scale: 1 
  },
  transition: { 
    duration: 0.5,
    ease: "easeOut"
  }
};

export const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const staggerFast = {
  animate: {
    transition: {
      staggerChildren: 0.05
    }
  }
};

export const slideInFromTop = {
  initial: { 
    y: -100, 
    opacity: 0 
  },
  animate: { 
    y: 0, 
    opacity: 1 
  },
  exit: { 
    y: -100, 
    opacity: 0 
  },
  transition: { 
    duration: 0.3,
    ease: "easeOut"
  }
};

export const slideInFromBottom = {
  initial: { 
    y: 100, 
    opacity: 0 
  },
  animate: { 
    y: 0, 
    opacity: 1 
  },
  exit: { 
    y: 100, 
    opacity: 0 
  },
  transition: { 
    duration: 0.3,
    ease: "easeOut"
  }
};

export const rotateIn = {
  initial: { 
    opacity: 0, 
    rotate: -180 
  },
  animate: { 
    opacity: 1, 
    rotate: 0 
  },
  transition: { 
    duration: 0.8,
    ease: "easeOut"
  }
};

export const bounceIn = {
  initial: { 
    opacity: 0, 
    scale: 0.3 
  },
  animate: { 
    opacity: 1, 
    scale: 1 
  },
  transition: { 
    duration: 0.6,
    ease: "backOut",
    times: [0, 0.6, 1]
  }
};

export const hoverScale = {
  hover: { 
    scale: 1.05,
    transition: { 
      duration: 0.2 
    }
  }
};

export const hoverGlow = {
  hover: { 
    boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
    transition: { 
      duration: 0.2 
    }
  }
};

export const progressBar = {
  initial: { 
    width: 0 
  },
  animate: (level) => ({ 
    width: `${level}%` 
  }),
  transition: { 
    duration: 1.5,
    ease: "easeOut",
    delay: 0.5
  }
};

export const countUp = {
  initial: { 
    opacity: 0 
  },
  animate: { 
    opacity: 1 
  },
  transition: { 
    duration: 2,
    ease: "easeOut"
  }
};

export const typewriter = {
  initial: { 
    width: 0 
  },
  animate: { 
    width: "100%" 
  },
  transition: { 
    duration: 2,
    ease: "linear"
  }
};

export const pulse = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const float = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const pageTransition = {
  initial: { 
    opacity: 0,
    y: 20
  },
  animate: { 
    opacity: 1,
    y: 0
  },
  exit: { 
    opacity: 0,
    y: -20
  },
  transition: { 
    duration: 0.4,
    ease: "easeInOut"
  }
};

export const modalBackdrop = {
  initial: { 
    opacity: 0 
  },
  animate: { 
    opacity: 1 
  },
  exit: { 
    opacity: 0 
  },
  transition: { 
    duration: 0.2 
  }
};

export const modalContent = {
  initial: { 
    opacity: 0,
    scale: 0.75,
    y: 20
  },
  animate: { 
    opacity: 1,
    scale: 1,
    y: 0
  },
  exit: { 
    opacity: 0,
    scale: 0.75,
    y: 20
  },
  transition: { 
    duration: 0.2,
    ease: "easeOut"
  }
};