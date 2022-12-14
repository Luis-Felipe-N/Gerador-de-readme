import { ChangeEvent, FormEvent, useEffect, useState } from "react"

import style from './style.module.scss'
import { api } from "../../service/api"
import ITemplateProps, { createReadme } from "../../Templates/generatorReadme"


export default function Index() {
    const [ linkRepo, setLinkRepo ] = useState('')
    const [ errorlinkRepo, setErrorlinkRepo ] = useState('')
    const [ repo, setRepo ] = useState('')


    function handleChangeLinkRepoInput(value: string) {
        setErrorlinkRepo('')
        setLinkRepo(value)
    }

    async function handleGetInfoFromGithub(event: FormEvent) {
        event.preventDefault()
        if (linkRepo.trim() && linkRepo.includes('https://github.com/')) {
            const linkRepoFormated = linkRepo.split('/')
            const nameRepo = linkRepoFormated.pop()
            const nameUser = linkRepoFormated.pop()

            try {
                const response = await api.get(`https://api.github.com/repos/${nameUser}/${nameRepo}`)
                const userName = await api.get(response.data.owner.url)
                const languages = await api.get(response.data.languages_url)

                const templateProps: ITemplateProps = {
                    cover: '',
                    repo: {
                        name: response.data.name,
                        description: response.data.description,
                        userName: userName.data.name,
                        cloneUrl: response.data.cloneUrl,
                        languages: Object.keys(languages.data)
                    }
                }

                console.log(createReadme(templateProps))
            } catch (err) {
                setErrorlinkRepo('Repo não encontrado')
            }
        } else {
            setErrorlinkRepo('Insira um link de repositorio válido')
            return
        }
        
    }

    return (
        <main 
            className={style.generator}
            onSubmit={handleGetInfoFromGithub}
        >

            <form className={style.githubLink}>

                <p>Adicione o link do seu repositório para que seu reame seja gerado</p>
                <div>
                    <input 
                        type="url"
                        placeholder="Link do github"
                        onChange={({target}) => handleChangeLinkRepoInput(target.value)}
                        value={linkRepo}
                        className={errorlinkRepo ? style.inputError : ''}
                        />

                    <button type="submit">Continuar</button>
                </div>
                { errorlinkRepo && (
                    <p className={style.errorMessage}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 6C12.5523 6 13 6.44772 13 7V13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13V7C11 6.44772 11.4477 6 12 6Z" fill="currentColor" /><path d="M12 16C11.4477 16 11 16.4477 11 17C11 17.5523 11.4477 18 12 18C12.5523 18 13 17.5523 13 17C13 16.4477 12.5523 16 12 16Z" fill="currentColor" /><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12Z" fill="currentColor" /></svg>
                        {errorlinkRepo}</p>
                )}
            </form>
        </main>
    )
}