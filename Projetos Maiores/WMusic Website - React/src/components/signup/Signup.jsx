import React from 'react'
import style from './Signup.module.css'

export default function Signup() {
  return (
    <section className={style.signup}>
        <h3 className={style.title}>Faça seu cadastro agora!</h3>
        <form action="/" className={style.form}>
                <input 
                name="e_mail" 
                type="text"
                placeholder='Adicione seu e-mail' className={style.email}/>
                <button type='submit' className={style.submit}>Cadastrar</button>
        </form>
        </section>
  )
}
