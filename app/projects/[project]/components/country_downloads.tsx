import { Project } from "@/app/projects/[project]/model";
import { useUser } from "@/app/user/UserContext";

interface CountryDownloadsProps {
  project: string
}

export default function CountryDownloads(props: CountryDownloadsProps) {
  const {user, error} = useUser();

  const text = user === null ? 'You must be Pro to view download stats per country' : 'Coming soon...'

  return (
    <span>{text}</span>
  )
}