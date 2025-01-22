import { dataRepo } from '@/interfaces/modalRepo.i';
import { Octokit } from 'octokit';
import { ReactNode, createContext, useState } from 'react';

type Props = {
  children: ReactNode;
};

type repoTypes = {
  type: "all" | "owner" | "public" | "private" | "member"
}

interface ReposContextType {
  data: dataRepo[]
  user?: string
  page: number
  hasSearch: boolean
  isLoading: boolean
  isFavorite: boolean
  allPublic: boolean
  typeRepo: "all" | "owner" | "public" | "private" | "member" 
  setData: React.Dispatch<React.SetStateAction<dataRepo[]>>
  setUser: React.Dispatch<React.SetStateAction<string>>
  setHasSearch: React.Dispatch<React.SetStateAction<boolean>>
  setPage: React.Dispatch<React.SetStateAction<number>>
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  setTypeRepo: React.Dispatch<React.SetStateAction<string>>
  setIsFavorite: React.Dispatch<React.SetStateAction<boolean>>
  setAllPublic: React.Dispatch<React.SetStateAction<boolean>>
  getReposData: () => Promise<void>
}

const defaultProvider: ReposContextType = {
  data: [],
  user: null,
  hasSearch: false,
  page: 1,
  isLoading: false,
  typeRepo: 'all',
  isFavorite: false,
  allPublic: true,
  setData: () => {},
  setUser: () => {},
  setHasSearch: () => {},
  getReposData: async () => {},
  setPage: () => {},
  setIsLoading: () => {},
  setTypeRepo: () => {},
  setAllPublic: () => {},
  setIsFavorite: () => {},
};

const ReposContext = createContext<ReposContextType>(defaultProvider);

const ReposProvider = ({ children }: Props) => 
{
  const [data, setData] = useState<any[]>(defaultProvider.data);
  const [user, setUser] = useState<string>(defaultProvider.user);
  const [hasSearch, setHasSearch] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [typeRepo, setTypeRepo] = useState<"all" | "owner" | "public" | "private" | "member" >('all')
  const [isFavorite, setIsFavorite] = useState<boolean>(false)
  const [allPublic, setAllPublic] = useState<boolean>(true)

  const octokit = new Octokit({
    auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN
  })

  const getData = async () =>
  {
    if(allPublic)
    {
      return octokit.rest.repos.listPublic()
    }
    else if(!user && process.env.NEXT_PUBLIC_GITHUB_TOKEN)
    {
      // esse metodo so retorna os repositorios do user autenticado (retorna repositorios privados tbm)
      return await octokit.rest.repos.listForAuthenticatedUser({
        type: typeRepo,
        page: page,
        per_page: 10,
      })
    }

    // retorna os repositorios publicos caso nao haja token do github, ou foi passado usuario p/ busca
    return await octokit.rest.repos.listForUser({
      username: user,
      type: 'all',
      per_page: 10,
      page: page
    });
  }

  const getReposData = async () => 
  {
    setIsLoading(true)
    
    try 
    {
      const { data } = await getData()

      // o metodo nao comporta o atributo per_page, logo a paginação sera feita manualmente
      if(allPublic)
      {
        const newData = []
        for(let i = 0; i < data.length; i += 10)
        {
          newData.push(data.slice(i, i + 10))
        }

        console.log(newData[page - 1])
        setData(newData[page - 1] || [])
      }
      else
      {
        setData(data)
      }

    } 
    catch (error) 
    {
      console.error('Erro ao buscar repositórios:', error);
    } 

    setIsLoading(false)
  };

  const values = {
    data,
    setData,
    user,
    page,
    isLoading,
    hasSearch,
    typeRepo,
    isFavorite,
    allPublic,
    setUser,
    setHasSearch,
    setPage,
    setIsLoading,
    setTypeRepo,
    setIsFavorite,
    getReposData,
    setAllPublic,
  };

  return (<ReposContext.Provider value={values}>{children}</ReposContext.Provider>)
};

export { ReposContext, ReposProvider };