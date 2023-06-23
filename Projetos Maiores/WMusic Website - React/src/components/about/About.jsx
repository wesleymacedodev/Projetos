import React from 'react'
import style from './About.module.css'
import About_elements from '../about_elements/About_elements'
import image_1 from '../../images/about_1.jpg'
import image_2 from '../../images/about_2.jpg'
import image_3 from '../../images/about_3.jpg'

export default function About() {
  return (
    <section className={style.about}>
    <div className={style.header}>
    <h3 className={style.title}>Sobre</h3>
    <p className={style.description}>Saiba um pouco sobre nós!</p>
    </div>
    <div className={style.elements}>
    <About_elements style={style.image} img={image_1} alt="Imagem ilustrativa" 
    title="Bem-vindo"
    description="Seja bem-vindo ao nosso site de músicas, um espaço criado especialmente para os amantes da música de todos os gêneros e estilos! Aqui, buscamos proporcionar uma experiência única, onde você poderá descobrir novos artistas, relembrar clássicos e mergulhar em um universo sonoro repleto de emoção."/>
    <About_elements style={style.image} img={image_2} alt="Imagem ilustrativa" 
    title="Catálogo"
    description="Nosso vasto catálogo abrange desde os grandes clássicos até os últimos lançamentos, passando por uma ampla gama de gêneros musicais. Você encontrará tudo, desde pop, rock, hip-hop e eletrônica, até jazz, música clássica, folk e muito mais. Nossa variedade garantirá que você sempre encontre algo que corresponda ao seu gosto musical."/>
    <About_elements style={style.image} img={image_3} alt="Imagem ilustrativa" 
    title="Exclusivos"
    description="Além disso, nosso site possui recursos exclusivos, como recomendações personalizadas com base no seu gosto musical, letras de músicas para acompanhar suas canções preferidas e uma comunidade engajada, onde você pode compartilhar suas descobertas, opiniões e paixão pela música com outras pessoas."/>
    </div>
    </section>
  )
}
