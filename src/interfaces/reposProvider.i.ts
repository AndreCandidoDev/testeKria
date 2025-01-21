type repoData = Array<{
    id: string
    type: string
    actor: {
      id: number
      login: string
      display_login: string
      gravatar_id: string
      url: string
      avatar_url: string
    }
    repo: {
      id: number
      name: string
      url: string
    }
    payload: {
      repository_id: number
      push_id: number
      size: number
      distinct_size: number
      ref: string
      head: string
      before: string
      commits: Array<{
        sha: string
        author: {
          email: string
          name: string
        }
        message: string
        distinct: boolean
        url: string
      }>
    }
    public: boolean
    created_at: string
}>

export interface ReposContextType {
  data?: repoData;
  where: string;
  setData: React.Dispatch<React.SetStateAction<any[]>>;
  setWhere: React.Dispatch<React.SetStateAction<string>>;
  getReposData: () => Promise<void>;
}