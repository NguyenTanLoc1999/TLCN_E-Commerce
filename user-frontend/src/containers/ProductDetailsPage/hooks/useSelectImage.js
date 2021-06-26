import { useState, useEffect } from 'react'

const useSelectImage = ({ images = [] }) => {
  const [selected, setSelected] = useState(null)

  const handleSelectImage = (selectedImgId) => {
    if (!images.length) return

    const foundImage = images.find((image) => image._id === selectedImgId)
    setSelected(foundImage)
  }

  useEffect(()=> {
    if(images.length) setSelected(images[0])
  }, [images])

  return {
    selected,
    handleSelectImage
  }
}

export default useSelectImage