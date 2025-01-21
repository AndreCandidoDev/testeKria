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
  typeRepo: "all" | "owner" | "public" | "private" | "member" 
  setData: React.Dispatch<React.SetStateAction<dataRepo[]>>
  setUser: React.Dispatch<React.SetStateAction<string>>
  setHasSearch: React.Dispatch<React.SetStateAction<boolean>>
  setPage: React.Dispatch<React.SetStateAction<number>>
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  setTypeRepo:React.Dispatch<React.SetStateAction<string>>
  getReposData: () => Promise<void>
}

const defaultProvider: ReposContextType = {
  data: [],
  user: null,
  hasSearch: false,
  page: 1,
  isLoading: false,
  typeRepo: 'all',
  setData: () => {},
  setUser: () => {},
  setHasSearch: () => {},
  getReposData: async () => {},
  setPage: () => {},
  setIsLoading: () => {},
  setTypeRepo: () => {},
};

const ReposContext = createContext<ReposContextType>(defaultProvider);

const ReposProvider = ({ children }: Props) => 
{
  const [data, setData] = useState<any[]>(defaultProvider.data);
  const [user, setUser] = useState<string>(defaultProvider.user);
  const [hasSearch, setHasSearch] = useState(false)
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [typeRepo, setTypeRepo] = useState<any>('all')

  const octokit = new Octokit({
    auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN
  })

  const getData = async () =>
  {
    if(!user && process.env.NEXT_PUBLIC_GITHUB_TOKEN)
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

      setData(data)
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
    setUser,
    setHasSearch,
    setPage,
    setIsLoading,
    setTypeRepo,
    getReposData,
  };

  return (<ReposContext.Provider value={values}>{children}</ReposContext.Provider>)
};

export { ReposContext, ReposProvider };