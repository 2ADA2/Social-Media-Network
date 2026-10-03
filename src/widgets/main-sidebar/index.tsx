import { Sidebar } from "@/entities/sidebar";
import { useQuery } from "@tanstack/react-query";
import { sidebarQueries } from "@/features/sidebar/sidebar.ts";

export const MainSidebar = () => {
  const { data: suggestedPeople, isPending: isPeoplePending } = useQuery(sidebarQueries.suggestedPeople());
  const { data: communities, isPending: isCommunitiesPending } = useQuery(sidebarQueries.community());

  return (
    <>
      { (suggestedPeople && !isPeoplePending) && (
        <Sidebar title='Suggested people' users={ suggestedPeople }/>
      ) }
      { (communities && !isCommunitiesPending) && (
        <Sidebar title='Communities you might like' users={ communities }/>
      ) }
    </>
  );
};
