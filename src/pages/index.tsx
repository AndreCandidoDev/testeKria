import { PageRepos } from "@/components/PageRepos";
import { ReposContext } from "@/context/reposProvider";
import { useContext, useEffect } from "react";

export default function Home() 
{
  const reposApp = useContext(ReposContext)

  useEffect(() => 
  {
    reposApp.getReposData()
  }, [reposApp.user, reposApp.page, reposApp.typeRepo])

  return (
    <PageRepos/>
  );
}
