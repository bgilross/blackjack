const index = () => {
  const importAll = (requireContext) => {
    const images = {}
    requireContext.keys().forEach((item) => {
      const key = item.replace('./', '').replace('.svg', '')
      images[key] = requireContext(item)
    })
    return images
  }

  const cards = importAll(require.context('./', false, /\.svg$/))
}
export default cards
