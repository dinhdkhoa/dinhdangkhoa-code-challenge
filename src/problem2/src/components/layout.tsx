import React from 'react'
import CurrencyConverter from './currency-converter'

function MainLayout() {
  return (
    <section className="bg-background text-left">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src="/hero.jpg"
            className="absolute inset-0 h-full w-full object-cover hidden md:block"
          />
          <img
            alt=""
            src="/hero-mobile.jpg"
            className="absolute inset-0 h-full w-full object-cover lg:hidden"
          />
        </section>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-6xl">
            <div className="relative mt-1 block">
              <h1 className="mt-2 text-2xl font-bold text-newBackground sm:text-3xl md:text-4xl">
                Currency Converter
              </h1>

              <p className="mt-4 leading-relaxed text-gray-500 text-lg">
                Convert almost all the cryptocurrenciess into your desired currency easily.
              </p>
            </div>
            <CurrencyConverter />
          </div>
        </main>
      </div>
    </section>
  )
}

export default MainLayout