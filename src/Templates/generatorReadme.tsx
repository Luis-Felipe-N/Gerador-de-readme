export default interface ITemplateProps {
    repo: {
        name: string,
        description: string,
        languages: string[] // -> https://api.github.com/repos/Luis-Felipe-N/ignite-feed/languages - languages_url
        userName: string,   // -> https://api.github.com/users/Luis-Felipe-N - owner: { url }
        cloneUrl: string
    }
    cover: string,
}

export function createReadme(templateProps: ITemplateProps) {
    const templateMarkdown = `
        # ${templateProps.repo.name}

        ${templateProps.repo.description}

        #### ✔️ 🚀 Concluído  ✔️

        ![${templateProps.repo.name}](${templateProps.cover})


        ## Tecnologias

        Este projeto foi desenvolvido com as seguintes tecnologias:

        ${templateProps.repo.languages.map(language => (
            `- ${language}`
        ))}

        ## Iniciar projeto

        Clone o projeto e entre na pasta:
        `
            
        + 

        ' ```bash        $ git clone '+ templateProps.repo.cloneUrl +'        $ cd '+ templateProps.repo.name +'        ```'
        
        +

        'Follow the steps below:        ```bash        # Instalação de dependências        $ yarn ou npm install        # Iniciando projeto        $ yarn dev ou npm run dev```'

        +

        `
        Se tudo dé certo, acesse http://localhost:3000/ ou http://localhost:5173/

        ---

        Feito com ❤️ por Luis Felipe
    
    `

    return templateMarkdown
}