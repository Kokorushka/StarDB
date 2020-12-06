const compose = (...funcs) => (comp) => {
  return funcs.reduceRight((acc, f) => f(acc), comp);
};

export default compose;