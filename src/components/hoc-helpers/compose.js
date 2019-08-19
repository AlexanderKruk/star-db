const compose = (...func) => (list) => {
  return func.reduceRight(((prev, cur) => cur(prev)), list)
}

export default compose;