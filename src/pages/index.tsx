import type { NextPage } from 'next'
import Image from 'next/image'
import style from '../styles/Home.module.scss'
import { Header } from '../components/Header'

const Home: NextPage = () => {
  return (
    <main className={style.home}>
        <figure className={style.card}>
          <Image
            src="/capa.svg"
            width={320}
            height={240}
            alt=""
            objectFit='cover'
            objectPosition="center"
          />
          <figcaption>
            <strong>Editor markdown</strong>
            <time>21 de ago</time>
          </figcaption>
        </figure>
    </main>
  )
}

export default Home
