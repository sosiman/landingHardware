import { motion } from 'framer-motion';

const AnimatedText = ({
  text,
  className = '',
  delay = 50,
  duration = 0.6,
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  tag = 'h1'
}) => {
  const letters = text.split('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: delay / 1000,
        delayChildren: 0.2,
      },
    },
  };

  const letterVariants = {
    hidden: from,
    visible: to,
  };

  const Tag = tag;

  return (
    <Tag className={className}>
      <motion.span
        className="inline-block"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: '-100px' }}
      >
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            variants={letterVariants}
            transition={{
              duration,
              ease: 'easeOut',
            }}
            className="inline-block"
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
};

export default AnimatedText;
