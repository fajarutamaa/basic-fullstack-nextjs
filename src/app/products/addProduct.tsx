'use client'
import { useState, SyntheticEvent } from 'react'
import type { Brand } from '@prisma/client'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const AddProduct = ({ brands }: { brands: Brand[] }) => {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [brand, setBrand] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const router = useRouter()

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    await axios.post('/api/products', {
      title: title,
      price: Number(price),
      brandId: Number(brand),
    })
    setTitle('')
    setPrice('')
    setBrand('')
    router.refresh()
    setIsOpen(false)
  }

  const handleModal = () => {
    setIsOpen(!isOpen)
  }
  return (
    <div className='py-4'>
      <button className='btn btn-success btn-sm' onClick={handleModal}>
        Add New
      </button>
      <div className={isOpen ? 'modal modal-open' : 'modal'}>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>Add New Product</h3>
          <form onSubmit={handleSubmit}>
            <div className='form-control w-full'>
              <label className='label font-bold'>Product Name</label>
              <input
                type='text'
                className='input input-bordered'
                placeholder='product name'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className='form-control w-full'>
              <label className='label font-bold'>Price</label>
              <input
                type='text'
                className='input input-bordered'
                placeholder='price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className='form-control w-full'>
              <label className='label font-bold'>Brand</label>
              <select
                className='select select-bordered'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              >
                <option value='' disabled>
                  Select a Brand
                </option>
                {brands.map((brand) => (
                  <option value={brand.id} key={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
              <div className='modal-action'>
                <button type='button' className='btn' onClick={handleModal}>
                  Close
                </button>
                <button type='submit' className='btn btn-primary'>
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddProduct
