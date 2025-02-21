import Image from 'next/image'
import { CartContext, CartProduct } from '../../context/cart'
import { formatCurrency } from '@/helpers/format-currency'
import { Button } from '@/components/ui/button'
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from 'lucide-react'
import { useContext } from 'react'

interface CartItemProps {
  product: CartProduct
}

const CartProductItem = ({ product }: CartItemProps) => {
  const { decreaseProductQuantity, increaseProductQuantity } =
    useContext(CartContext)
  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center gap-3'>
        <div className='relative h-20 w-20 bg-gray-100 rounded-lg'>
          <Image src={product.imageUrl} alt={product.name} fill />
        </div>
        <div className='space-y-1'>
          <p className='text-xs max-w-[90%] truncate text-ellipsis '>
            {product.name}
          </p>
          <p className='text-sm font-semibold'>
            {formatCurrency(product.price)}
          </p>
          <div className='flex items-center gap-1 text-center'>
            <Button
              variant='outline'
              className='h-7 w-7 rounded-lg'
              onClick={() => decreaseProductQuantity(product.id)}
            >
              <ChevronLeftIcon size={16} />
            </Button>
            <p className='w-7 text-xs'>0</p>
            <Button
              variant='destructive'
              className='h-7 w-7 rounded-lg'
              onClick={() => increaseProductQuantity(product.id)}
            >
              <ChevronRightIcon size={16} />
            </Button>
          </div>
        </div>
      </div>
      <Button className='h-8 w-8 rounded-lg' variant='outline'>
        <TrashIcon />
      </Button>
    </div>
  )
}

export default CartProductItem
