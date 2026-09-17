import { CoverButton } from "@/shared/ui/CoverButton";
import { Input } from "@/shared/ui/Input";
import { useUser } from "@/features/auth";

export const EditProfile = () => {
  const user = useUser();

  return (
    <section>
      <h2>Edit profile</h2>
      <div className='profile-row profile-avatar'>
        <img src={ user.avatar } alt='your avatar'/>
        <CoverButton>
          <small>Change profile photo</small>
        </CoverButton>
      </div>
      <Input label='Username'/>
      <Input label='Email' icon={ user.email }/>

    </section>
  );
};
