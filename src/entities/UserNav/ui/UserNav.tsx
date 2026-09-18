import "./UserNav.css";

export const UserNav = () => {
  // const user = useUser()
  const user = {
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnoYbJQK0m8Se7zRczq-j0L6JAb5074pVZjfoTFd0wNQ&s=10",
    name: "Rami",
    surname: "Malek",
  };

  return (
    <a className="user-nav">
      <img src={ user.avatar } alt={ `${ user.name } avatar` }/>
      <span>{user.name} {user.surname}</span>
    </a>
  );
};
