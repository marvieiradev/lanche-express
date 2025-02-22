import Image from 'next/image'
import { notFound } from 'next/navigation'

import { db } from '@/lib/prisma'

import ConsumptionMethodCard from './components/consumption-method-card'

interface RestaurantPageParms {
  params: Promise<{ slug: string }>
}

const RestaurantPage = async ({ params }: RestaurantPageParms) => {
  const { slug } = await params
  //const restaurant = await getRestaurantBySlug(slug);
  const restaurant = await db.restaurant.findUnique({ where: { slug } })
  if (!restaurant) {
    return notFound()
  }

  return (
    <div className='flex h-screen flex-col items-center justify-center px-6 pt-2'>
      <div className='flex flex-col items-center gap-2'>
        <Image
          src={restaurant?.avatarImageUrl}
          alt={restaurant?.name}
          width={82}
          height={82}
        />
        <h2 className='font-semibold'>{restaurant.name}</h2>
      </div>
      <div className='space-y-2 pt-24 text-center'>
        <h3 className='text-2xl font-semibold'>Seja bem-vindo!</h3>
        <p className='opacity-55'>
          Escolha como prefere aproveitar sua refeição. Etsamos prontos para
          oferecer praticidade e sabor em cada detalhe!
        </p>
      </div>
      <div className='grid grid-cols-2 gap-4 pt-14'>
        <ConsumptionMethodCard
          slug={slug}
          option='DINE_IN'
          imageUrl='/dine_in.png'
          imageAlt='Para comer aqui'
          buttonText='Para comer aqui'
        />
        <ConsumptionMethodCard
          slug={slug}
          option='TAKEAWAY'
          imageUrl='/takeaway.png'
          imageAlt='Para levar'
          buttonText='Para levar'
        />
      </div>
    </div>
  )
}

export default RestaurantPage
