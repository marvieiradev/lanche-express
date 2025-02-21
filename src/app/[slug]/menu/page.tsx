import { db } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import RestaurantHeader from './components/header'
import RestaurantCategories from './components/categories'

interface RestaurantMenuPageParms {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ consumptionMethod: string }>
}

const isConsumptionMethodValid = (consumptionMethod: string) => {
  return ['DINE_IN', 'TAKEAWAY'].includes(consumptionMethod.toUpperCase())
}

const RestaurantMenuPage = async ({
  params,
  searchParams,
}: RestaurantMenuPageParms) => {
  const { slug } = await params
  const { consumptionMethod } = await searchParams
  if (!isConsumptionMethodValid(consumptionMethod)) {
    return notFound()
  }
  const restaurant = await db.restaurant.findUnique({
    where: { slug },
    include: { menuCategories: { include: { products: true } } },
  })
  if (!restaurant) {
    return notFound()
  }
  return (
    <div>
      <RestaurantHeader restaurant={restaurant} />
      <RestaurantCategories restaurant={restaurant} />
    </div>
  )
}

export default RestaurantMenuPage
