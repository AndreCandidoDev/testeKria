import { PageRepos } from "@/components/PageRepos";
import { ReposContext } from "@/context/reposProvider";
import { useContext, useEffect } from "react";

export default function Home() 
{
  const reposApp = useContext(ReposContext)

  useEffect(() => 
  {
    if(!reposApp.isFavorite)
    {
      reposApp.getReposData()
    }

    const favorites = JSON.parse(localStorage.getItem('favorite'))

    const dataFavorites = Object.keys(favorites).map((item) => ( favorites[item] ))

    reposApp.setData(dataFavorites)

  }, [reposApp.user, reposApp.page, reposApp.typeRepo, reposApp.isFavorite, reposApp.allPublic])

  return (<PageRepos/>)
}
